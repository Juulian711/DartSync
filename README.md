# DartSync – kostenlose Ausführung über GitHub Actions

Dieser Ordner enthält ausschließlich Programmcode. Tabelle, Zugangscode und Web-App-Adresse gehören nicht als Dateien in das öffentliche Repository.

Der Workflow nutzt Standard-Runner in einem öffentlichen Repository und legt weder Artefakte noch Caches an. Er verweigert die Ausführung in privaten Repositories. Die Kostenfreiheit dieser Runner ist dokumentiert: https://docs.github.com/en/billing/concepts/product-billing/github-actions

Die bestehenden Google-Tabelle und das vollständige Apps Script DartSync-4.gs bleiben erhalten. In GitHub müssen APPS_SCRIPT_URL und SYNC_TOKEN als Repository-Secrets eingetragen werden. Sie dürfen nicht in den Code geschrieben werden. Ein geplanter Lauf erfolgt ungefähr alle 30 Minuten; GitHub kann ihn verzögern oder auslassen. Zeitpläne werden auf dem Standardbranch ausgeführt. GitHub deaktiviert Zeitpläne öffentlicher Repositories nach 60 Tagen ohne Repository-Aktivität. Dann muss der Workflow wieder aktiviert werden. Es gibt keine Zusage minutengenauer oder dauerhaft unterbrechungsfreier Ausführung.

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

Der vollständige Apps-Script-Code liegt weiterhin unter `DartSync-4.gs`; der Dateiname bleibt zur Kompatibilität erhalten, der Inhalt ist Version 5. Den alten Code vollständig ersetzen, speichern und einmal `installDartSync5` ausführen. Anschließend die bestehende Web-App unter Bereitstellen → Bereitstellungen verwalten → Stift → Neue Version aktualisieren. Die bestehende URL und die Zugangscodes bleiben erhalten. Erst danach sind die neuen Abschluss- und Joker-Funktionen aktiv.

Vollständige Turniere mit ausdrücklich geprüfter 9-Darter-Statistik werden nach 48 Stunden archiviert und für weitere Importe gesperrt. Die Punkte bleiben als Endstand erhalten. Bereits geprüfte historische Turniere werden bei der Einrichtung anhand des Turnierdatums geschlossen. Unvollständige ältere Turniere bleiben offen und werden höchstens alle sechs Stunden nachgeprüft. Der Abrufplan enthält keine abgeschlossenen Turniere; manuelle Abrufe und Backfills umgehen diese Sperre nicht. Offizielle spätere Korrekturen sind über DartSync → Abgeschlossenes Turnier wieder öffnen möglich. Ausgeblendete Archive sind Bestandteil der Sicherung und dürfen nicht gelöscht werden.

2026 behält seine bisherigen Ja/Nein-Spalten und erhält ein Limit von drei Jokern pro Person. Neu angelegte Jahre ab 2027 haben standardmäßig fünf Joker pro Person, beim Anlegen einstellbar. Die Auswahl erfolgt über eine eigene Joker-Seitenleiste, mit Restanzeige und deutlichem Hinweis bei ausgeschöpftem Kontingent. Aktivierte zukünftige Joker reservieren bereits einen Platz. Die bisherigen Übernahmeregeln bleiben bestehen.

Der Saisonverlauf enthält nun zusätzlich Durchschnitts-Match-Averages und Legbilanzen für alle ursprünglich gewählten Pferde, normale Siegerpferde und deutsche Pferde sowie Matchbilanz, Leggewinnquote und getippte Turniersieger. Jede Spielerpartie zählt gleich. Fehlende Averages und Walkovers werden beim Average ausgelassen; Walkovers zählen auch nicht zur Legbilanz. Joker-Ersatzspieler werden in diesen Statistiken der ursprünglichen Tipps nicht mitgerechnet. Ein Direktduell der beiden eigenen Pferde zählt beide Spielerleistungen.
