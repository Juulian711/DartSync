# Teilnehmer- und Absagenkorrektur: DartSync 5.1

Die bestehenden Jahre und die Einrichtung bleiben erhalten. Für die dauerhafte Korrektur muss der Code in der Google-Tabelle und die bereitgestellte Web-App auf demselben Stand sein.

1. **DartSync-5.1.gs** öffnen und den gesamten Inhalt kopieren.
2. In eurer Tabelle **Erweiterungen → Apps Script** öffnen. Den bisherigen Code vollständig ersetzen und **speichern**.
3. **Bereitstellen → Bereitstellungen verwalten → Stift → Version: Neue Version → Bereitstellen** wählen. Die bestehende Bereitstellung verwenden, damit die gespeicherte Adresse und die GitHub-Secrets weiter passen.

Die vorhandenen Trigger können weiterverwendet werden. Nach dem Veröffentlichen übernimmt der nächste automatische GitHub-Lauf den neuen Abgleich. Für einen sofortigen Test: GitHub → DartSync → Actions → DartSync automatisch → Run workflow → main → Run workflow. Ein neuer Lauf verwendet den aktuellen Code; die Wiederholung eines alten Laufs kann dessen alte Programmversion verwenden.

## Was korrigiert wurde

- Bisher wurden neue Teilnehmer ergänzt, aber aus der Liste verschwundene Spieler blieben gespeichert.
- Bei einer nachweislich vollständig geladenen Liste werden verschwundene, noch nicht angetretene Spieler jetzt als zurückgezogen geführt und aus den Dropdowns ausgeschlossen.
- Der folgende Matchimport erhält diesen Status. Bereits gespielte Begegnungen und ihre Ergebnisse bleiben erhalten.
- Die Erkennung berücksichtigt auch ausdrücklich abgesagte oder unbestätigte Einträge.
- Ein beschädigter oder unvollständiger Seitenabruf ersetzt die bestehende Liste nicht. Die eingelesene Zahl muss zu den sichtbaren Gruppenzahlen von DartConnect passen; doppelte Spielernamen führen ebenfalls zum Abbruch.
- Wieder aufgenommene Spieler können nach einer neuen Bestätigung erneut ausgewählt werden.
- Der Zeitstempel der Teilnehmer wird bei jedem erfolgreichen Abgleich aktualisiert. Im GitHub-Protokoll stehen die Teilnehmerzahlen und die Bestätigung des vollständigen Abgleichs. Bei einer noch alten Web-App erscheint ein Hinweis auf das notwendige Script-Update.

## Automatik

Die Handy-App startet denselben GitHub-Abruf, der auch automatisch läuft. Der hinterlegte Zeitplan sieht einen Abruf alle 30 Minuten vor. GitHub kann geplante Läufe verzögern oder auslassen; ein minutengenauer Abruf ist damit nicht garantiert. Ein grüner Lauf allein beweist außerdem nicht, dass DartConnect bereits neue Daten veröffentlicht hat. Die neuen Zählwerte im Protokoll zeigen genauer, was übernommen wurde.
