import {readFileSync} from 'node:fs';
export function loadPreparedPlan(path,now=Date.now()){
 if(!path)return null;
 try{const data=JSON.parse(readFileSync(path,'utf8')),age=now-Date.parse(data.createdAt);return data.version===1&&Number.isFinite(age)&&age>=0&&age<=600000&&data.plan&&typeof data.plan==='object'?data.plan:null;}catch{return null;}
}
