# DartSync – kostenlose Ausführung über GitHub Actions

Dieser Ordner enthält ausschließlich Programmcode. Tabelle, Zugangscode und Web-App-Adresse gehören nicht als Dateien in das öffentliche Repository.

Der Workflow nutzt Standard-Runner in einem öffentlichen Repository und legt weder Artefakte noch Caches an. Er verweigert die Ausführung in privaten Repositories. Die Kostenfreiheit dieser Runner ist dokumentiert: https://docs.github.com/en/billing/concepts/product-billing/github-actions

Die bestehenden Google-Tabelle und das vollständige Apps Script DartSync-4.gs bleiben erhalten. In GitHub müssen APPS_SCRIPT_URL und SYNC_TOKEN als Repository-Secrets eingetragen werden. Sie dürfen nicht in den Code geschrieben werden. Reguläre Läufe sind alle 30 Minuten vorgesehen, an Turniertagen zwischen 13 und 20 Uhr deutscher Zeit alle fünf Minuten; GitHub kann ihn verzögern oder auslassen. Zeitpläne werden auf dem Standardbranch ausgeführt. GitHub deaktiviert Zeitpläne öffentlicher Repositories nach 60 Tagen ohne Repository-Aktivität. Dann muss der Workflow wieder aktiviert werden. Es gibt keine Zusage minutengenauer oder dauerhaft unterbrechungsfreier Ausführung.

Nach dem Einrichten müssen die GitHub-Secrets zur bestehenden Web-App passen. Fehlgeschlagene Abrufe sind unter Actions sichtbar; vorhandene Tabellendaten bleiben bei einem Importfehler erhalten.

Ein historischer Erstimport lässt sich einmal über Actions → DartSync automatisch → Run workflow → backfill aktivieren. Regulär werden offene Turniere von vor zwei Tagen bis sieben Tage im Voraus gelesen. Zusätzlich können ältere unvollständige Turniere in größeren Abständen geprüft werden. Nur vollständig eingerichtete Jahre und Turniere aus der Google-Tabelle werden berücksichtigt.

Workflow-Dokumentation: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule


## Saisonverlauf und Statistiken

Die Übersicht heißt `Saisonverlauf_JAHR`, zum Beispiel `Saisonverlauf_2026`. Die aktuelle Apps-Script-Version übernimmt vorhandene Saisonübersichten und verwendet den Namen auch bei neuen Jahren.

Sie enthält Gesamtstand, Punkteverlauf, Punkte pro Turnier, Punkteschnitt, Form der letzten fünf gewerteten Turniere, Joker-Mehrwert, Bonuspunkte, 9-Darter-Bonustreffer, Match-Averages, Whitewashes, Siegesserien und Rekorde. Die Außenseiter-Challenge bleibt eine separate Wertung. Noch nicht gewertete Tipps werden beim Punkteschnitt ausgelassen; Teilimporte sind als vorläufig gekennzeichnet.

Die Kennzahlen werden mit Tabellenformeln aus den Jahresdaten berechnet. Die Turnierzeilen bleiben 70 Pixel hoch. Zum Übernehmen des neuen Namens für zukünftige Jahre den vollständigen Inhalt von `DartSync-4.gs` in das vorhandene Apps-Script-Projekt kopieren, speichern und die bestehende Web-App-Bereitstellung auf eine neue Version aktualisieren. Die bestehende URL und Script-Eigenschaften bleiben dabei erhalten.

## Jederzeit manuell aktualisieren

1. Im Repository auf **Actions** gehen.
2. Links **DartSync automatisch** wählen.
3. **Run workflow** öffnen, Branch **main** belassen und erneut **Run workflow** klicken.

Die Standardoptionen aktualisieren aktuelle und in den kommenden sieben Tagen stattfindende Turniere. Der zusätzliche manuelle Abruf ist unabhängig vom automatischen Zeitplan. Für ein älteres Turnier im Feld **events** zum Beispiel `2026:28` eintragen. **backfill** liest bei Bedarf alle noch offenen historischen Turniere ein. Abgeschlossene Turniere müssen zuerst im DartSync-Menü der Tabelle ausdrücklich wieder geöffnet werden. Mehrere Abrufe werden nacheinander ausgeführt.


## DartSync 5: einmaliges Script-Update

Der vollständige Apps-Script-Code liegt weiterhin unter `DartSync-4.gs`; der Dateiname bleibt zur Kompatibilität erhalten, der Inhalt ist Version 5.1. Den alten Code vollständig ersetzen, speichern und einmal `installDartSync5` ausführen. Anschließend die bestehende Web-App unter Bereitstellen → Bereitstellungen verwalten → Stift → Neue Version aktualisieren. Die bestehende URL und die Zugangscodes bleiben erhalten. Erst danach sind die neuen Abschluss- und Joker-Funktionen aktiv.

Vollständige Turniere mit ausdrücklich geprüfter 9-Darter-Statistik werden nach 48 Stunden archiviert und für weitere Importe gesperrt. Die Punkte bleiben als Endstand erhalten. Bereits geprüfte historische Turniere werden bei der Einrichtung anhand des Turnierdatums geschlossen. Unvollständige ältere Turniere bleiben offen und werden höchstens alle sechs Stunden nachgeprüft. Der Abrufplan enthält keine abgeschlossenen Turniere; manuelle Abrufe und Backfills umgehen diese Sperre nicht. Offizielle spätere Korrekturen sind über DartSync → Abgeschlossenes Turnier wieder öffnen möglich. Ausgeblendete Archive sind Bestandteil der Sicherung und dürfen nicht gelöscht werden.

2026 behält seine bisherigen Ja/Nein-Spalten und erhält ein Limit von drei Jokern pro Person. Neu angelegte Jahre ab 2027 haben standardmäßig fünf Joker pro Person, beim Anlegen einstellbar. Die Auswahl erfolgt über eine eigene Joker-Seitenleiste, mit Restanzeige und deutlichem Hinweis bei ausgeschöpftem Kontingent. Aktivierte zukünftige Joker reservieren bereits einen Platz. Die bisherigen Übernahmeregeln bleiben bestehen.

Der Saisonverlauf enthält nun zusätzlich Durchschnitts-Match-Averages und Legbilanzen für alle ursprünglich gewählten Pferde, normale Siegerpferde und deutsche Pferde sowie Matchbilanz, Leggewinnquote und getippte Turniersieger. Jede Spielerpartie zählt gleich. Fehlende Averages und Walkovers werden beim Average ausgelassen; Walkovers zählen auch nicht zur Legbilanz. Joker-Ersatzspieler werden in diesen Statistiken der ursprünglichen Tipps nicht mitgerechnet. Ein Direktduell der beiden eigenen Pferde zählt beide Spielerleistungen.

## Teilnehmerabgleich mit Version 5.1

Bei einer vollständig geladenen Teilnehmerliste werden fehlende, noch nicht angetretene Spieler als zurückgezogen geführt und aus den Dropdowns entfernt. Ausdrückliche Absagen werden ebenfalls berücksichtigt. Ein Matchimport erhält diese Statuswerte; bereits gespielte Matches bleiben erhalten. Teilimporte und Listen mit fehlenden Zeilen oder doppelten Namen ersetzen die vorhandene Starterliste nicht.

Für bestehende Installationen: Den vollständigen Code aus `DartSync-4.gs` in Apps Script ersetzen und speichern. Dann die bestehende Web-App unter Bereitstellen → Bereitstellungen verwalten → Stift → Neue Version aktualisieren. Die vorhandenen Trigger bleiben verwendbar. Details stehen in `Anleitung-DartSync-5.1.md`.

Der Worker prüft die eingelesene Spielerzahl gegen die sichtbaren DartConnect-Gruppenzahlen. Die Protokolle enthalten nun aktive und zurückgezogene Teilnehmer sowie die Bestätigung des vollständigen Abgleichs. Eine alte Web-App erzeugt einen Hinweis auf das erforderliche Script-Update, während verfügbare Spielresultate weiter importiert werden.

## Fünf-Minuten-Abrufe an Turniertagen

Zwischen 13:00 und 20:00 Uhr in Europe/Berlin ergänzen zusätzliche Termine den bisherigen Halb-Stunden-Takt zu einem Fünf-Minuten-Takt. Sommer- und Winterzeit werden automatisch berücksichtigt. Die Termine liegen auf Minuten 02, 07, 12, 17 usw.; 17 und 47 bleiben die regulären Läufe. Außerhalb des Zeitfensters und an Tagen ohne offenes Turnier bleibt der tatsächliche DartConnect-Abruf beim regulären Takt.

Vor der Browserinstallation wird der Abrufplan der Google-Tabelle gelesen. Zusätzliche Läufe werden ohne Browser übersprungen, wenn heute kein offenes Turnier eingetragen ist, die Cloud pausiert ist oder der Lauf erst nach Ende des Zeitfensters startet. Zusätzliche Läufe prüfen ausschließlich die heutigen Turniere. Die regulären Läufe erfassen weiterhin auch veröffentlichte Teilnehmer bevorstehender Turniere und notwendige Nachkontrollen. Der gelesene Plan wird nur vorübergehend auf dem Runner gespeichert und nicht veröffentlicht. Ein veralteter Plan wird erneut angefordert.

Die Änderung benötigt kein Apps-Script-Update. Manuelle Läufe funktionieren weiterhin jederzeit. GitHub kann Zeitplan-Ereignisse verzögern oder verwerfen; der Fünf-Minuten-Takt ist deshalb ein geplanter Takt und keine Echtzeitgarantie. Die Standard-Runner des öffentlichen Repositorys bleiben kostenlos.
