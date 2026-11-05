// Presentation only. Existing scoring and imports remain in AP:AT.
export function playgroundFormulas(year, row) {
  const raw="'Wurfbonus_"+year+"'!", t='$AT'+row;
  const horse=(col)=>{
    const p='$'+col+row, key='$A'+row+'&"|"&'+p;
    const count='COUNTIFS('+raw+'$K$2:$K,'+key+','+raw+'$L$2:$L,TRUE)';
    const sum=c=>'SUMIFS('+raw+'$'+c+'$2:$'+c+','+raw+'$K$2:$K,'+key+','+raw+'$L$2:$L,TRUE)';
    return 'IF('+p+'="","Pferd wählen",'+p+'&" · "&IF('+count+'=0,"noch offen",'+sum('E')+'&" ×180 · "&'+sum('F')+'&" ×170"))';
  };
  const summary=(p,d,source)=>'=IF($A'+row+'="","",'+horse(p)+'&IF($'+d+row+'=$'+p+row+',"",CHAR(10)&'+horse(d)+')&IF(REGEXMATCH($'+source+row+',"VORLÄUFIG"),CHAR(10)&"Vorläufig · Berichte fehlen",""))';
  const name=(kind,part)=>'=IF($A'+row+'="","",IFERROR(REGEXEXTRACT('+t+',"'+kind+': ([^\\n]+)"),IFERROR("J: "&REGEXEXTRACT('+t+',"Julian: '+part+'")&CHAR(10)&"N: "&REGEXEXTRACT('+t+',"Nico: '+part+'"),"Wird geprüft …")))';
  const score='=IF($A'+row+'="","",IFERROR(IF(REGEXMATCH('+t+',"Julian"),"J "&REGEXEXTRACT('+t+',"Julian[^\\n]*?([0-9]+)")&CHAR(10)&"N "&REGEXEXTRACT('+t+',"Nico[^\\n]*?([0-9]+)"),REGEXEXTRACT('+t+',"([0-9]+) Punkte")&" Pkt."),"—")&IF(REGEXMATCH('+t+',"Vorläufig"),CHAR(10)&"vorläufig",""))';
  const points=col=>'=IF($A'+row+'="","",'+(Number(year)===2026?'IF($AW$3,'+col+row+',"—")':col+row)+')';
  return [summary('C','D','AP'),points('AQ'),summary('F','G','AR'),points('AS'),name('Pferd','(.*?) \\+'),name('Deutsch','.*? \\+ (.*?) ='),score];
}
