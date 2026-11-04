# DartSync 5.2: 180er und 170er-Finishes

Der Testbereich ist bereits in eurer bestehenden Google-Tabelle ab **AP** eingetragen. Die bisherige Wertung der Saison 2026 bleibt unverändert. Für die automatische Fortführung der neuen Wurfstatistik braucht die Google-Web-App einmalig den neuen Code. Der GitHub-Teil wird separat aktualisiert.

## Einmal aktualisieren

1. Die vollständige Datei **DartSync-5.2.gs** öffnen und alles kopieren. In eurer Tabelle **Erweiterungen → Apps Script** öffnen, den bisherigen Code vollständig ersetzen und speichern. Nicht unten an den alten Code anhängen.
2. **Bereitstellen → Bereitstellungen verwalten → Stift → Version: Neue Version → Bereitstellen** wählen. Die bestehende Bereitstellung bearbeiten, damit die Web-App-Adresse und die vorhandenen GitHub-Secrets weiter passen.
3. Die Google-Tabelle neu laden. Unter **DartSync → 180er-/170er-Testbereich aktualisieren** lässt sich der Bereich bei Bedarf auch manuell aufbauen. Die bisherigen Trigger können weiterlaufen.

Anschließend reicht der nächste automatische GitHub-Lauf. Für sofortiges Nachladen: GitHub → Actions → DartSync automatisch → **Run workflow**, Branch **main**, erneut **Run workflow**. Einen neuen Lauf starten; das Wiederholen eines alten Laufs kann alten Programmcode verwenden.

## So bedient ihr den Bereich

| Stelle | Bedeutung |
|---|---|
| AP3 | Haken zum Ein-/Ausschalten des Bonusbereichs für dieses Jahr |
| AP | Julians Pferde: Details zu jeder Runde |
| AQ | Julians Bonuspunkte je Turnier |
| AR | Nicos Pferde: Details zu jeder Runde |
| AS | Nicos Bonuspunkte je Turnier |

Die Regel lautet **+1 Punkt je 180er und +10 Punkte je tatsächlichem 170er-Finish**. Ein normaler 170er-Score zählt nicht als Checkout. Beide ursprünglich gewählten Pferde werden berücksichtigt; ein doppelt gewähltes Pferd wird nur einmal gezählt. Joker-Ersatzspieler liefern keine zusätzlichen Wurfbonuspunkte.

Die Texte enthalten für jedes Pferd und jede Runde die Anzahl und die daraus entstehenden Punkte. Der vollständige Text steht zusätzlich in der Zellnotiz. So bleiben eure Turnierzeilen **70 Pixel hoch**, auch wenn ein Pferd bis ins Finale kommt. Die vorhandenen Spaltenbreiten bis AO bleiben erhalten.

**2026 ist ausschließlich ein Test:** Der Haken schaltet die Testpunkte in AQ/AS ein oder aus; diese Punkte fließen unter keinen Umständen in eure Saisonwertung ein. Für Turniere 17–33 wurden die verfügbaren Spielberichte bereits eingelesen. Turnier 34 erhält Werte, sobald Spiele und vollständige Berichte vorliegen.

**Neue Jahre ab 2027:** Der Haken ist zunächst aus. Aktiviert ihr ihn, kommen die Wurfbonuspunkte der noch offenen Turniere zur regulären Bonuswertung hinzu. Bereits abgeschlossene Turniere bleiben einschließlich ihrer Bonuspunkte fest. Eine nachträgliche Änderung braucht das bewusste Wiederöffnen des Turniers.

Die ergänzte Bonusregel steht auch im Tab **Regeln**. Die Quelldaten liegen im ausgeblendeten Tab `Wurfbonus_JAHR`. Diesen Tab nicht löschen.

## Was automatisch geprüft wird

Der Dienst liest die öffentlich zugänglichen DartConnect-Spielberichte mit den einzelnen Legs. Nur vollständig geprüfte Berichte werden übernommen: Jahr, Turnier, Runde, beide Spieler, Legzahl und Endstand müssen zum importierten Match passen. Eine 170 zählt nur, wenn das Leg damit tatsächlich gewonnen wurde. Walkovers bringen keine Wurfbonuspunkte.

Fehlende oder unvollständige Berichte werden als **vorläufig** ausgewiesen. Sobald einige Berichte vorliegen, kann die angezeigte Summe bereits einen Teilbetrag enthalten. Ein leeres Punktefeld bedeutet, dass noch keine bestätigten Daten für diese Auswahl vorliegen; es ist keine bestätigte Null. Bei ausgeschaltetem Haken stehen die Test-/Bonuspunkte auf null.

Bereits geprüfte, unveränderte Spielberichte werden wiederverwendet. Ein erneuter Lauf addiert dieselben Würfe nicht ein zweites Mal. Änderungen an Runde, Paarung, Ergebnis oder Average machen den bisherigen Bericht für dieses Match ungültig, bis er erneut abgeglichen wurde. Eure ausgewählten Pferde werden nur im authentifizierten Abrufplan übertragen und nicht in öffentliche GitHub-Protokolle oder Artefakte geschrieben.

## Wie oft werden 9-Darter geprüft?

An Turniertagen wird bei jedem erfolgreichen Ergebnisabruf auch die DartConnect-Leistungsseite geprüft, sofern sie bereits veröffentlicht ist. Zwischen **13 und 20 Uhr deutscher Zeit sind Abrufe alle fünf Minuten vorgesehen**, außerhalb dieses Zeitraums alle 30 Minuten. GitHub kann die Ausführung verzögern.

Die automatische Teilnehmer-/Ergebnisabfrage läuft nur ab zwei Kalendertagen vor dem Turnier bis zum Ende des Turniertags. Vor Turnierbeginn gibt es noch keine Ergebnis- oder 9-Darter-Auswertung. Ab dem Folgetag finden keine automatischen Nachkontrollen statt. Noch nicht veröffentlichte oder nicht lesbare Leistungsseiten werden als ungeprüft behandelt.

Bis die neue Web-App-Version bereitgestellt ist, funktionieren die bisherigen Importe weiter; der GitHub-Lauf weist lediglich darauf hin, dass automatische 180er-/170er-Updates noch Apps Script 5.2 benötigen.
