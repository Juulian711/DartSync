# DartSync – kostenlose Ausführung über GitHub Actions

Dieser Ordner enthält ausschließlich Programmcode. Tabelle, Zugangscode und Web-App-Adresse gehören nicht als Dateien in das öffentliche Repository.

Der Workflow nutzt Standard-Runner in einem öffentlichen Repository und legt weder Artefakte noch Caches an. Er verweigert die Ausführung in privaten Repositories. Die Kostenfreiheit dieser Runner ist dokumentiert: https://docs.github.com/en/billing/concepts/product-billing/github-actions

Die bestehenden Google-Tabelle und das vollständige Apps Script DartSync-4.gs bleiben erhalten. In GitHub müssen APPS_SCRIPT_URL und SYNC_TOKEN als Repository-Secrets eingetragen werden. Sie dürfen nicht in den Code geschrieben werden. Ein geplanter Lauf erfolgt ungefähr alle 30 Minuten; GitHub kann ihn verzögern oder auslassen. Zeitpläne werden auf dem Standardbranch ausgeführt. GitHub deaktiviert Zeitpläne öffentlicher Repositories nach 60 Tagen ohne Repository-Aktivität. Dann muss der Workflow wieder aktiviert werden. Es gibt keine Zusage minutengenauer oder dauerhaft unterbrechungsfreier Ausführung.

Das Paket ist noch nicht in deinem GitHub-Konto eingerichtet. Ein erfolgreicher Echtlauf auf GitHub gegen deine bereitgestellte Google-Tabelle ist noch erforderlich. Der bestätigte Datenzugang aus dem bisherigen Browser beweist nicht, dass DartConnect jeden GitHub-Runner akzeptiert.

Ein historischer Erstimport lässt sich einmal über Actions → DartSync automatisch → Run workflow → backfill aktivieren. Regulär werden Turniere von vor zwei Tagen bis sieben Tage im Voraus gelesen. Nur vollständig eingerichtete Jahre und Turniere aus der Google-Tabelle werden berücksichtigt.

Workflow-Dokumentation: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
