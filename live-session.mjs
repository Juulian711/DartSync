import {berlinClock,FAST_CRON,BASE_CRON,isTodaysOpenEvent} from './schedule-policy.mjs';

export const LIVE_INTERVAL_MS=5*60000;
// Leave room for setup and a slow final request below GitHub's six-hour job limit.
export const LIVE_MAX_MS=5*60*60000;
export function livePlanEligible(plan,now=new Date()){
 const clock=berlinClock(now);
 return !plan?.paused&&clock.hour>=13&&clock.hour<20&&Array.isArray(plan?.events)&&plan.events.some(e=>isTodaysOpenEvent(e,clock.date));
}
export function nextLiveTick(startedAt,now,eligible){
 if(!eligible||now<startedAt||now-startedAt>=LIVE_MAX_MS)return null;
 const clock=berlinClock(new Date(now));
 if(clock.hour<13||clock.hour>=20)return null;
 const at=startedAt+Math.max(1,Math.ceil((now-startedAt)/LIVE_INTERVAL_MS))*LIVE_INTERVAL_MS;
 const next=berlinClock(new Date(at));
 return at-startedAt<LIVE_MAX_MS&&next.date===clock.date&&next.hour>=13&&next.hour<20?at:null;
}
export async function runWorkerLoop({cycle,status,env,log,isStopping=()=>false,sleep=ms=>new Promise(r=>setTimeout(r,ms)),now=()=>Date.now(),interval=10*60000}){
 const startedAt=now();let halfHour=Math.floor(startedAt/1800000);
 while(!isStopping()){
  await cycle();
  if(env.RUN_ONCE!=='true'){await sleep(interval);continue;}
  const at=env.LIVE_SESSION==='true'?nextLiveTick(startedAt,now(),status.liveEligible):null;
  if(at===null)return status.error?1:0;
  log({state:'Live-Sitzung: nächster Abruf ohne neuen GitHub-Start',nextPollAt:new Date(at).toISOString(),intervalMinutes:5});
  await sleep(Math.max(0,at-now()));
  // Selections, pause state, report cache and event closure are read afresh each time.
  env.SYNC_PLAN_FILE='';env.SYNC_EVENT_NAME='schedule';
  const slot=Math.floor(now()/1800000);
  env.SYNC_SCHEDULE=slot===halfHour?FAST_CRON:BASE_CRON;halfHour=slot;
 }
 return status.error?1:0;
}
