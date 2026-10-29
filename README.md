# DartSync – kostenlose Ausführung über GitHub Actions

Dieser Ordner enthält ausschließlich Programmcode. Tabelle, Zugangscode und Web-App-Adresse gehören nicht als Dateien in das öffentliche Repository.

Der Workflow nutzt Standard-Runner in einem öffentlichen Repository und legt weder Artefakte noch Caches an. Er verweigert die Ausführung in privaten Repositories. Die Kostenfreiheit dieser Runner ist dokumentiert: https://docs.github.com/en/billing/concepts/product-billing/github-actions

Die bestehenden Google-Tabelle und das vollständige Apps Script DartSync-4.gs bleiben erhalten. In GitHub müssen APPS_SCRIPT_URL und SYNC_TOKEN als Repository-Secrets eingetragen werden. Sie dürfen nicht in den Code geschrieben werden. Ein geplanter Lauf erfolgt ungefähr alle 30 Minuten; GitHub kann ihn verzögern oder auslassen. Zeitpläne werden auf dem Standardbranch ausgeführt. GitHub deaktiviert Zeitpläne öffentlicher Repositories nach 60 Tagen ohne Repository-Aktivität. Dann muss der Workflow wieder aktiviert werden. Es gibt keine Zusage minutengenauer oder dauerhaft unterbrechungsfreier Ausführung.

Das Paket ist noch nicht in deinem GitHub-Konto eingerichtet. Ein erfolgreicher Echtlauf auf GitHub gegen deine bereitgestellte Google-Tabelle ist noch erforderlich. Der bestätigte Datenzugang aus dem bisherigen Browser beweist nicht, dass DartConnect jeden GitHub-Runner akzeptiert.

Ein historischer Erstimport lässt sich einmal über Actions → DartSync automatisch → Run workflow → backfill aktivieren. Regulär werden Turniere von vor zwei Tagen bis sieben Tage im Voraus gelesen. Nur vollständig eingerichtete Jahre und Turniere aus der Google-Tabelle werden berücksichtigt.

Workflow-Dokumentation: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule


## Saisonverlauf und Statistiken

Die Übersicht heißt `Saisonverlauf_JAHR`, zum Beispiel `Saisonverlauf_2026`. Die aktuelle Apps-Script-Version übernimmt vorhandene Saisonübersichten und verwendet den Namen auch bei neuen Jahren.

Sie enthält Gesamtstand, Punkteverlauf, Punkte pro Turnier, Punkteschnitt, Form der letzten fünf gewerteten Turniere, Joker-Mehrwert, Bonuspunkte, 9-Darter-Bonustreffer, Match-Averages, Whitewashes, Siegesserien und Rekorde. Die Außenseiter-Challenge bleibt eine separate Wertung. Noch nicht gewertete Tipps werden beim Punkteschnitt ausgelassen; Teilimporte sind als vorläufig gekennzeichnet.

Die Kennzahlen werden mit Tabellenformeln aus den Jahresdaten berechnet. Die Turnierzeilen bleiben 70 Pixel hoch. Zum Übernehmen des neuen Namens für zukünftige Jahre den vollständigen Inhalt von `DartSync-4.gs` in das vorhandene Apps-Script-Projekt kopieren, speichern und die bestehende Web-App-Bereitstellung auf eine neue Version aktualisieren. Die bestehende URL und Script-Eigenschaften bleiben dabei erhalten.

## Jederzeit manuell aktualisieren

1. Im Repository auf **Actions** gehen.
2. Links **DartSync automatisch** wählen.
3. **Run workflow** öffnen, Branch **main** belassen und erneut **Run workflow** klicken.

Die Standardoptionen aktualisieren aktuelle und in den kommenden sieben Tagen stattfindende Turniere. Der zusätzliche manuelle Abruf ist unabhängig vom automatischen Zeitplan. Für ein älteres Turnier im Feld **events** zum Beispiel `2026:28` eintragen. **backfill** liest bei Bedarf alle eingerichteten historischen Turniere ein. Mehrere Abrufe werden nacheinander ausgeführt.
