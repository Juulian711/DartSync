export const FAST_CRON='2,7,12,22,27,32,37,42,52,57 13-19 * * *';
export const BASE_CRON='17,47 * * * *';
export const CALENDAR_CRON='37 6 * * *';
export function berlinClock(now=new Date()){
 const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
 return {date:p.year+'-'+p.month+'-'+p.day,hour:Number(p.hour),minute:Number(p.minute)};
}
export function validEventDate(date){if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;const n=Date.parse(date+'T00:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===date;}
export function inImportWindow(eventDate,today){if(!validEventDate(eventDate)||!validEventDate(today))return false;const days=(Date.parse(eventDate+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/86400000;return days>=0&&days<=2;}
export function isTodaysOpenEvent(event,date){return !event.closed&&!event.finalized&&event.eventDate===date;}
export function decideSync(plan,{eventName='',cron='',now=new Date()}={}){
 if(plan?.paused)return {run:false,liveOnly:false,reason:'Cloud-Abruf in Tabelle pausiert'};
 if(!Array.isArray(plan?.events))throw Error('Ungültiger Cloud-Plan.');
 if(plan.configuredYears===0)throw Error('Kein eingerichtetes Jahresblatt.');
 const fast=eventName==='schedule'&&cron===FAST_CRON,calendar=eventName==='schedule'&&cron===CALENDAR_CRON,manual=eventName==='workflow_dispatch',clock=berlinClock(now),open=plan.events.filter(e=>!e.closed&&!e.finalized),today=open.filter(e=>isTodaysOpenEvent(e,clock.date)),window=open.filter(e=>inImportWindow(e.eventDate,clock.date)),undated=open.filter(e=>!validEventDate(e.eventDate));
 const info={liveOnly:fast,calendarOnly:calendar,scope:fast?'live':calendar?'calendar':manual?'manual':'window',date:clock.date,todaysEvents:today.length,windowEvents:window.length,undatedEvents:undated.length};
 if(!open.length)return {...info,run:false,reason:'Keine offenen Turniere; kein DartConnect-Abruf nötig'};
 if(calendar)return {...info,run:undated.length>0,reason:undated.length?'Fehlende Turnierdaten im Kalender ergänzen':'Alle Turnierdaten bekannt; Kalenderabruf übersprungen'};
 if(fast&&(clock.hour<13||clock.hour>=20))return {...info,run:false,reason:'Zusätzlicher Abruf außerhalb 13–20 Uhr übersprungen'};
 if(fast&&!today.length)return {...info,run:false,reason:'Heute kein offenes Turnier; zusätzlicher Abruf übersprungen'};
 if(!fast&&!manual&&!window.length)return {...info,run:false,reason:'Außerhalb der Turnierfenster (zwei Tage vorher bis Turniertagsende); Abruf übersprungen'};
 return {...info,run:true,reason:fast?'Turniertag: Abruf im Fünf-Minuten-Takt':manual?'Manuell gestarteter Abruf':'Regulärer Abruf im Turnierfenster'};
}
