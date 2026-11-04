export const FAST_CRON='2,7,12,22,27,32,37,42,52,57 13-19 * * *';
export const BASE_CRON='17,47 * * * *';
export function berlinClock(now=new Date()){
 const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
 return {date:p.year+'-'+p.month+'-'+p.day,hour:Number(p.hour),minute:Number(p.minute)};
}
export function isTodaysOpenEvent(event,date){return !event.closed&&!event.finalized&&event.eventDate===date;}
export function decideSync(plan,{eventName='',cron='',now=new Date()}={}){
 if(plan?.paused)return {run:false,liveOnly:false,reason:'Cloud-Abruf in Tabelle pausiert'};
 if(!Array.isArray(plan?.events))throw Error('Ungültiger Cloud-Plan.');
 if(plan.configuredYears===0)throw Error('Kein eingerichtetes Jahresblatt.');
 const fast=eventName==='schedule'&&cron===FAST_CRON,clock=berlinClock(now),today=plan.events.filter(e=>isTodaysOpenEvent(e,clock.date));
 if(!plan.events.some(e=>!e.closed&&!e.finalized))return {run:false,liveOnly:fast,reason:'Keine offenen Turniere; kein DartConnect-Abruf nötig'};
 if(fast&&(clock.hour<13||clock.hour>=20))return {run:false,liveOnly:true,reason:'Zusätzlicher Abruf außerhalb 13–20 Uhr übersprungen'};
 if(fast&&!today.length)return {run:false,liveOnly:true,reason:'Heute kein offenes Turnier; zusätzlicher Abruf übersprungen'};
 return {run:true,liveOnly:fast,date:clock.date,todaysEvents:today.length,reason:fast?'Turniertag: Abruf im Fünf-Minuten-Takt':'Regulärer oder manuell gestarteter Abruf'};
}
