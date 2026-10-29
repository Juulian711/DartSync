import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {entriesDom,matchesDom,performanceDom,eventMetaDom} from './readers.mjs';
const browser=await chromium.launch({headless:true,chromiumSandbox:true});
try{const context=await browser.newContext({viewport:{width:1360,height:1000},locale:'en-GB'}),page=await context.newPage();
const base='https://tv.dartconnect.com/event/pdcpc26e28';
await page.goto(base+'/entries',{waitUntil:'domcontentloaded'});await page.locator('tbody[id^="entries-group-"] td').first().waitFor({timeout:45000});const players=await page.evaluate(entriesDom);assert(players.length>=128,'Teilnehmerliste unvollständig');assert(players.some(p=>p.name==='Gabriel Clemens'&&p.isGerman),'Deutsche Zuordnung fehlt');
await page.goto(base+'/matches',{waitUntil:'domcontentloaded'});await page.locator('[data-testid="left-competitor-column"]').first().waitFor({timeout:45000});const matches=await page.evaluate(matchesDom);assert.equal(matches.length,127,'Nicht alle Begegnungen erkannt');assert(matches.some(m=>m.walkover),'Walkover nicht erkannt');const final=matches.find(m=>m.round===7);assert(final,'Finale fehlt');
await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('a[href*="/performance/"]').first().waitFor({timeout:45000});const meta=await page.evaluate(eventMetaDom);assert(meta.performance);await page.goto(meta.performance,{waitUntil:'domcontentloaded'});await page.getByRole('heading',{name:'Fewest 501 Darts',exact:true}).waitFor({timeout:45000});const nine=await page.evaluate(performanceDom);assert(nine.available,'9-Darter-Statistik nicht lesbar');
console.log(JSON.stringify({test:'DartConnect-Zugriff von GitHub',participants:players.length,matches:matches.length,walkovers:matches.filter(m=>m.walkover).length,nineDarterPlayers:nine.names.length,result:'PASS'}));
}finally{await browser.close();}
