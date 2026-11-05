import {createHash} from 'node:crypto';
import {bonusNorm,bonusName,bonusSignature} from './bonus-core.mjs';
import {collectThrowBonus} from './bonus-collector.mjs';
const reportCaches=new Map();
export function dailySignature(year,eventNo,matches){return createHash('sha256').update(JSON.stringify([Number(year),Number(eventNo),matches.map(m=>bonusSignature(eventNo,m)).sort()])).digest('hex');}
export function leaderboardTotalsDom(){
 const table=document.querySelector('tr[id^="player-row_"]')?.closest('table'),head=table?.querySelector('thead')?.innerText||'';
 return {mode:head.includes('S 501 Ton Counts')?'counts':head.includes('S 501 High Turns')?'checkout':'unknown',rows:[...document.querySelectorAll('tr[id^="player-row_"]')].map(r=>({name:r.querySelector('td.a3 span[data-player_id]')?.innerText.trim(),value:r.querySelector('td.b5')?.innerText.trim(),matches:r.querySelector('td.c1')?.innerText.trim(),legs:r.querySelector('td.c2')?.innerText.trim()}))};
}
export function expectedPlayerStats(matches,roster=[]){
 const map=new Map();for(const p of roster)if(p.name&&!/withdrawn|declined|unconfirmed/i.test(p.status||''))map.set(bonusNorm(p.name),{name:bonusName(p.name),matches:0,legs:0,wins:0});
 for(const m of matches)for(const side of ['left','right']){const name=bonusName(m[side]),key=bonusNorm(name),p=map.get(key)||{name,matches:0,legs:0,wins:0};if(!m.walkover){p.matches++;p.legs+=m.leftScore+m.rightScore;p.wins+=Number(m[side+'Score']);}map.set(key,p);}
 return map;
}
function count(value,zeroAllowed){if(value===undefined||value===null)throw Error('Statistikspalte fehlt.');if(/^\d+$/.test(value||''))return Number(value);if(zeroAllowed&&(!value||/^[-–—]$/.test(value)))return 0;throw Error('Statistikzahl fehlt oder ist nicht lesbar.');}
export function verifyAggregateRows(matches,roster,counts,checkouts){
 const expected=expectedPlayerStats(matches,roster),cs=new Map(),hs=new Map();
 for(const r of counts){const k=bonusNorm(r.name);if(!k||cs.has(k))throw Error('Doppelte Spielernamen in der Wurfstatistik.');cs.set(k,r);}
 for(const r of checkouts){const k=bonusNorm(r.name);if(!k||hs.has(k))throw Error('Doppelte Spielernamen in der Checkout-Statistik.');hs.set(k,r);}
 for(const [key,r]of cs)if(!expected.has(key)&&count(r.matches,true)>0)throw Error('Rangliste enthält noch nicht importierte Spielerpartien.');
 const rows=[];for(const [key,p]of expected){const a=cs.get(key),b=hs.get(key);if(!a||!b){if(p.matches>0)throw Error('Gespielter Teilnehmer fehlt in der Wurfstatistik.');rows.push({...p,n180:0,highCheckout:0});continue;}for(const r of [a,b])if(count(r.matches,p.matches===0)!==p.matches||count(r.legs,p.matches===0)!==p.legs)throw Error('Rangliste und importierte Spiele haben unterschiedliche Match-/Legzahlen.');const n180=count(a.value,true),highCheckout=count(b.value,true);if(n180>p.legs*10||highCheckout>170||p.wins>0&&highCheckout===0||p.wins===0&&highCheckout>0)throw Error('Unplausible Wurfstatistik.');rows.push({...p,n180,highCheckout});}
 return rows;
}
export function dailyStatsFromReports(year,eventNo,matches,roster,nineNames,reports,sourceUrl){
 const expected=expectedPlayerStats(matches,roster),cache=new Map(reports.map(r=>[r.signature,r])),nine=new Set(nineNames.map(bonusNorm));if([...nine].some(k=>!expected.has(k)))return null;
 const values=new Map([...expected].map(([k,p])=>[k,{name:p.name,n180:0,n170:0,nineDarter:nine.has(k),matches:p.matches,legs:p.legs}]));
 for(const m of matches){if(m.walkover)continue;const report=cache.get(bonusSignature(eventNo,m));if(!report)return null;for(const p of report.players){const out=values.get(bonusNorm(p.name));if(!out||!Number.isSafeInteger(p.n180)||!Number.isSafeInteger(p.n170))return null;out.n180+=p.n180;out.n170+=p.n170;}}
 return {complete:true,year,eventNo,signature:dailySignature(year,eventNo,matches),players:[...values.values()],sourceUrl};
}
export async function collectDailyStats(context,{year,eventNo,leaderboardUrl,matches,roster,nineNames,seedReports=[]}){
 if(!Array.isArray(nineNames))return {complete:false,reason:'9-Darter noch nicht vollständig geprüft.'};
 if(!/^https:\/\/leaderboard\.dartconnect\.com\/leaderboard(?:#|$)/.test(leaderboardUrl||''))return {complete:false,reason:'Rangliste noch nicht verfügbar.'};
 const fromReports=dailyStatsFromReports(year,eventNo,matches,roster,nineNames,seedReports,leaderboardUrl);if(fromReports)return fromReports;
 const page=await context.newPage();let counts,checkouts;
 try{
  await page.goto(leaderboardUrl,{waitUntil:'domcontentloaded',timeout:45000});await page.locator('span.lblink[data-player_id]').first().waitFor({timeout:25000});const exit=page.getByRole('button',{name:'Exit',exact:true});try{await exit.waitFor({timeout:3000});await exit.click();}catch{}
  for(let i=0;i<8;i++){const d=await page.evaluate(leaderboardTotalsDom);if(d.mode==='counts')counts=d.rows;if(d.mode==='checkout')checkouts=d.rows;if(counts&&checkouts)break;await page.locator('button.right_toggle_btn[data-section="2"]').click();}
  if(!counts||!checkouts)throw Error('180er-/Checkout-Ansichten sind nicht verfügbar.');
 }finally{await page.close();}
 const aggregate=verifyAggregateRows(matches,roster,counts,checkouts),candidates=aggregate.filter(p=>p.highCheckout===170).map(p=>p.name),key=year+':'+eventNo,cache=reportCaches.get(key)||new Map(),valid=new Set(matches.map(m=>bonusSignature(eventNo,m)));
 for(const [sig]of cache)if(!valid.has(sig))cache.delete(sig);for(const r of seedReports)if(valid.has(r.signature))cache.set(r.signature,r);
 if(candidates.length){const result=await collectThrowBonus(context,{year,eventNo,leaderboardUrl,matches,players:candidates,cache:[...cache.values()].map(r=>({signature:r.signature,sourceUrl:r.sourceUrl})),maxMillis:120000});for(const r of result.reports)cache.set(r.signature,r);reportCaches.set(key,cache);if(result.pending)return {complete:false,reason:'170er-Einzelberichte noch unvollständig.',pending:result.pending};}
 const nine=new Set(nineNames.map(bonusNorm)),names=new Set(aggregate.map(p=>bonusNorm(p.name))),stats=[];if([...nine].some(n=>!names.has(n)))throw Error('9-Darter-Spieler fehlt im Teilnehmerfeld.');for(const p of aggregate){let n170=0;if(p.highCheckout===170){for(const m of matches.filter(m=>!m.walkover&&[m.left,m.right].some(n=>bonusNorm(n)===bonusNorm(p.name)))){const r=cache.get(bonusSignature(eventNo,m)),item=r?.players.find(a=>bonusNorm(a.name)===bonusNorm(p.name));if(!item)return {complete:false,reason:'170er-Einzelbericht fehlt.'};n170+=item.n170;}if(!n170)return {complete:false,reason:'170er-Rangliste und Einzelberichte noch nicht konsistent.'};}stats.push({name:p.name,n180:p.n180,n170,nineDarter:nine.has(bonusNorm(p.name)),matches:p.matches,legs:p.legs});}
 return {complete:true,year,eventNo,signature:dailySignature(year,eventNo,matches),players:stats,sourceUrl:leaderboardUrl};
}
