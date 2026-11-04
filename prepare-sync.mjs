import {writeFileSync,appendFileSync} from 'node:fs';
import {decideSync} from './schedule-policy.mjs';
const url=process.env.APPS_SCRIPT_URL||'',token=process.env.SYNC_TOKEN||'';
if(!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(url)||token.length<24)throw Error('APPS_SCRIPT_URL und SYNC_TOKEN konfigurieren.');
let plan;
for(let attempt=0;attempt<3;attempt++){
 try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({operation:'plan',token}),signal:AbortSignal.timeout(90000),redirect:'follow'});if(!r.ok)throw Error('Google HTTP '+r.status);const data=await r.json();if(!data.ok)throw Error(data.error||'Abrufplan konnte nicht gelesen werden.');plan=data.result;break;}catch(error){if(attempt===2)throw error;await new Promise(r=>setTimeout(r,2000*(attempt+1)));}
}
const decision=decideSync(plan,{eventName:process.env.SYNC_EVENT_NAME,cron:process.env.SYNC_SCHEDULE});
if(decision.run)writeFileSync(process.env.SYNC_PLAN_FILE||'.dartsync-plan.json',JSON.stringify({version:1,createdAt:new Date().toISOString(),plan}));
if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'run='+String(decision.run)+'\n');
console.log(JSON.stringify({state:decision.reason,run:decision.run,liveOnly:decision.liveOnly,date:decision.date||null,todaysEvents:decision.todaysEvents??0}));
