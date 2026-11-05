import {collectThrowBonus} from './bonus-collector.mjs';
import {bonusSignature,bonusNorm} from './bonus-core.mjs';
const sessions=new Map();
export function cachedNineReports(year,eventNo){return [...(sessions.get(year+':'+eventNo)?.values()||[])];}
export function verifiedNines(matches,reports,eventNo,year){
 const wanted=matches.filter(m=>!m.walkover),valid=new Map(reports.filter(r=>r.nineAvailable===true&&r.eventNo===eventNo&&(year===undefined||r.year===year)).map(r=>[r.signature,r])),positive=new Map();let checked=0;
 for(const m of wanted){const r=valid.get(bonusSignature(eventNo,m));if(!r)continue;checked++;for(const p of r.players)if(p.n9>0)positive.set(bonusNorm(p.name),{name:p.name,sourceUrl:r.sourceUrl,round:r.round,legs:p.nineLegs});}
 return {complete:checked===wanted.length,checked,expected:wanted.length,names:[...positive.values()].map(p=>p.name),evidence:[...positive.values()]};
}
export async function collectNineReports(context,{year,eventNo,leaderboardUrl,matches}){
 const key=year+':'+eventNo,cache=sessions.get(key)||new Map(),signatures=new Set(matches.filter(m=>!m.walkover).map(m=>bonusSignature(eventNo,m)));
 for(const [sig,r]of cache)if(!signatures.has(sig)||r.nineAvailable!==true)cache.delete(sig);
 const b=await collectThrowBonus(context,{year,eventNo,leaderboardUrl,matches,players:[...new Set(matches.flatMap(m=>[m.left,m.right]))],cache:[...cache.values()].map(r=>({signature:r.signature,sourceUrl:r.sourceUrl})),maxMillis:180000});
 for(const r of b.reports)if(r.nineAvailable===true)cache.set(r.signature,r);
 sessions.set(key,cache);return {...verifiedNines(matches,[...cache.values()],eventNo,year),failures:b.failures||0,newReports:b.reports.length};
}
