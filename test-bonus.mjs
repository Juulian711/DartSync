import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {playerTurnsDom} from './bonus-readers.mjs';
import {bonusNorm,bonusSignature,matchForReport} from './bonus-core.mjs';
import {collectThrowBonus,reportPlayersToVisit} from './bonus-collector.mjs';
import {verifiedNines} from './nine-reports.mjs';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
// Small authored fixture: eleven legs, one real 170 checkout. No private sheet data.
const names=['Marvin van Velzen','Mike De Decker'];
function fixture({missing=false,losingCheckout=false,badCount=false,darts=false,wrongStart=false,missingDarts=false}={}){
 let html='<p>2026 Players Championship 32</p><p>Last 128</p><p>Date: 29-Oct-2026</p><table><tr><th>Leg</th><th>Player</th><th>WA</th><th>CO</th><th>180</th>'+(darts?'<th>Game</th><th>DT</th><th>SS</th><th>PTS</th>':'')+'</tr>';
 for(let leg=1;leg<=11;leg++)for(let p=0;p<2;p++){
  if(missing&&leg===11&&p===1)continue;
  const win=p===(leg<=6?0:1),co=win?(leg===7?170:40):(losingCheckout&&leg===1?170:''),count=p===0&&leg<=3||p===1&&leg<=2?1:'';
  html+='<tr><td>'+(p===0?'1.'+leg:'')+'</td><td>'+names[p]+'</td><td>'+(win?'W':'')+'</td><td>'+co+'</td><td>'+(badCount&&leg===1&&p===0?'1.5':count)+'</td>'+(darts?'<td>501 SIDO</td><td>'+(missingDarts?'':leg===1||!win?9:18)+'</td><td>'+(wrongStart?301:501)+'</td><td>'+(win?501:400)+'</td>':'')+'</tr>';
 }return html+'</table>';
}
const browser=await chromium.launch({channel:'chrome',headless:true,chromiumSandbox:true});
let report,nineReport;try{const page=await browser.newPage();await page.setContent(fixture());report=await page.evaluate(playerTurnsDom);assert.equal(report.nineAvailable,false);assert.equal(report.legs,11);assert.deepEqual(report.players.map(p=>[p.won,p.n180,p.n170]),[[6,3,0],[5,2,1]]);for(const opts of [{missing:true},{losingCheckout:true},{badCount:true}]){await page.setContent(fixture(opts));await assert.rejects(()=>page.evaluate(playerTurnsDom));}await page.setContent(fixture({darts:true}));nineReport=await page.evaluate(playerTurnsDom);assert(nineReport.nineAvailable);assert.deepEqual(nineReport.players.map(p=>p.n9),[1,0]);assert.deepEqual(nineReport.players[0].nineLegs,['1.1']);for(const opts of [{darts:true,wrongStart:true},{darts:true,missingDarts:true}]){await page.setContent(fixture(opts));assert.equal((await page.evaluate(playerTurnsDom)).nineAvailable,false);}}finally{await browser.close();}
const match={round:1,left:names[0],right:names[1],leftScore:6,rightScore:5,leftAvg:95,rightAvg:96,walkover:false},signature=bonusSignature(32,match);
assert.equal(matchForReport(report,[match],2026,32),match);
for(const r of [{...report,year:2027},{...report,round:2},{...report,legs:10},{...report,players:[report.players[0],report.players[0]]}])assert.throws(()=>matchForReport(r,[match],2026,32));
assert.equal(bonusNorm('De Decker, Mike'),bonusNorm('Mike De Decker'));
const nines=verifiedNines([match],[{...nineReport,signature}],32,2026);assert(nines.complete);assert.deepEqual(nines.names,[names[0]]);assert.equal(verifiedNines([match],[],32,2026).complete,false);assert.equal(verifiedNines([match],[{...nineReport,signature,year:2027}],32,2026).checked,0);assert.equal(verifiedNines([{...match,leftScore:7}],[{...nineReport,signature}],32,2026).checked,0);
assert.deepEqual(reportPlayersToVisit([{left:'A',right:'B'},{left:'A',right:'C'},{left:'C',right:'D'}],new Set(['a','b','c','d'])),['A','C']);
let pages=0;const cached=await collectThrowBonus({newPage(){pages++;throw Error('Cache must not open a page');}},{year:2026,eventNo:32,players:[names[1]],matches:[match],cache:[{signature}]});assert.equal(cached.pending,0);assert.equal(pages,0);
const bounded=await collectThrowBonus({newPage(){throw Error('No time budget left');}},{year:2026,eventNo:32,players:[names[1]],matches:[match],maxMillis:0});assert.equal(bounded.pending,1);assert.equal(bounded.reports.length,0);
const gs=fs.existsSync(new URL('./DartSync-4.gs',import.meta.url))?new URL('./DartSync-4.gs',import.meta.url):new URL('../../outputs/DartSync-5.2.gs',import.meta.url),ctx={Date,Number};vm.createContext(ctx);vm.runInContext(fs.readFileSync(gs,'utf8'),ctx);
for(let r=10;r<=27;r++)assert.equal(JSON.stringify(ctx.formulas_(2026,r,{jokerUi:false})),JSON.stringify(ctx.formulas51_(2026,r,{jokerUi:false})));
const future=ctx.formulas_(2027,11,{jokerUi:true});for(let i=0;i<29;i++)if(i!==24&&i!==27)assert.equal(future[i],ctx.formulas51_(2027,11,{jokerUi:true})[i]);assert(future[24].endsWith('+N(AQ11)'));assert(future[27].endsWith('+N(AS11)'));
assert.equal(ctx.throwSignature_(32,match),signature);
const mr=['key',32,1,match.left,match.right,6,5,95,96,false],raw=report.players.map(p=>['key',32,1,p.name,p.n180,p.n170,'url',new Date(),signature,11,'32|'+p.name,true]);
const summary=ctx.throwSummary_(32,[names[1],names[1]],[mr],raw);assert.equal(summary.points,12);assert.equal(summary.expected,1);assert.equal(summary.checked,1);assert(summary.text.includes('2 × 180er und 1 × 170er-Finish = 12'));
assert.equal(ctx.throwSummary_(32,[names[1]],[mr],[]).complete,false);assert.equal(ctx.throwSummary_(32,[names[1]],[mr],raw.map(r=>{const a=r.slice();a[11]=false;return a;})).points,0);
const wo=mr.slice();wo[9]=true;assert.equal(ctx.throwSummary_(32,[names[1]],[wo],raw).points,0);
assert(ctx.throwPointsFormula_(2026,10,'C','D').includes('IF(D10=C10,0,'));
let storage=[],writes=0,released=0,closed=false;
ctx.LockService={getScriptLock:()=>({waitLock(){},releaseLock(){released++;}})};ctx.eventContext_=()=>({sheet:{},row:25});ctx.eventState_=()=>({closedAt:closed?'closed':null});ctx.sheet_=name=>({name});ctx.throwSheet_=()=>({name:'raw'});ctx.rows_=(s)=>s.name==='raw'?storage:[mr];ctx.writeRows_=(s,h,rs)=>{storage=rs;writes++;};ctx.updateThrowPanel_=()=>{};ctx.refreshSeason51_=()=>{};ctx.SpreadsheetApp={flush(){}};
const full={...report,sourceUrl:'https://recap.dartconnect.com/players/6ae3484b88a1b4d326191ee8',signature};
ctx.syncThrowBonus_({year:2026,eventNo:32,reports:[full]});ctx.syncThrowBonus_({year:2026,eventNo:32,reports:[full]});assert.equal(storage.length,2);assert.equal(storage.find(r=>r[3]===names[1])[5],1);
const before=JSON.stringify(storage),prior=writes;for(const broken of [{...full,signature:'wrong'},{...full,sourceUrl:'https://example.com/players/123'},{...full,players:full.players.map(p=>({...p,n180:-1}))},{...full,players:full.players.map(p=>({...p,n170:99}))}])assert.throws(()=>ctx.syncThrowBonus_({year:2026,eventNo:32,reports:[broken]}));assert.equal(JSON.stringify(storage),before);assert.equal(writes,prior);
closed=true;assert(ctx.syncThrowBonus_({year:2027,eventNo:32,reports:[]}).skipped);assert.equal(ctx.syncThrowBonus_({year:2026,eventNo:32,reports:[full]}).testOnly,true);assert(released>=8);
// Future archives include the bonus cells; historical 41-column archives still restore.
const archiveCtx={Date,Number};vm.createContext(archiveCtx);vm.runInContext(fs.readFileSync(gs,'utf8'),archiveCtx);
let values=Array(45).fill(''),formulas=Array(45).fill(''),archived,protectedWidth;
values[0]=1;values[42]=12;values[44]=7;
const dataRange=width=>({getValues:()=>[values.slice(0,width)],getFormulas:()=>[formulas.slice(0,width)],setValues:rs=>{rs[0].forEach((v,i)=>values[i]=v);formulas.fill('');}}),sheet={getRange:(r,c,h,w)=>c===1?dataRange(w):{setValues(){},setValue(){},setNote(){}},getProtections:()=>[],setRowHeightsForced(){}};
const archive={appendRow:r=>{archived=r;},getLastRow:()=>2,getRange:()=>({getValue:()=>archived[2]})};
Object.assign(archiveCtx,{sealDue_:()=>true,throwBonusReady_:()=>false,updateThrowPanel_(){},complete_:()=>true,validateTournament_(){},lockTipsOnFirstMatch_(){},guardEventCore_(){},rebuild_:()=>({winner:'A',finalist:'B',bestGerman:'C'}),writeFormulas_(){},assertYearFormulas_(){},archiveSheet_:()=>archive,putEventState_(){},protectClosedRow_:(s,r,y)=>{protectedWidth=y>2026?45:41;},ss_:()=>({getSheetByName:()=>archive,getSpreadsheetTimeZone:()=> 'Europe/Berlin'}),SpreadsheetApp:{flush(){}},Utilities:{formatDate:()=> 'test'}});
const ac={matches:new Map([[1,[]]]),players:new Map([[1,[]]])},as={};assert.equal(archiveCtx.closeEvent_(2027,1,{sheet,row:11},as,ac,Date.now()),false);assert.equal(archived,undefined);
archiveCtx.throwBonusReady_=()=>true;assert(archiveCtx.closeEvent_(2027,1,{sheet,row:11},as,ac,Date.now()));assert.equal(JSON.parse(archived[2]).length,45);assert.equal(protectedWidth,45);values[42]=999;assert(archiveCtx.restoreClosedRow_(2027,1,sheet,11,as));assert.equal(values[42],12);
archived[2]=JSON.stringify(Array(41).fill(''));values[0]=999;values[42]=88;assert(archiveCtx.restoreClosedRow_(2027,1,sheet,11,as));assert.equal(values[0],'');assert.equal(values[42],88);
console.log('Passed bonus checks: real 170 checkout, verified winning nine-dart 501 legs, missing dart/start data rejected, complete leg tables, official score matching, cache reuse, bounded report scans, unchanged 2026 scores, optional future scores, idempotent imports and frozen future events.');
