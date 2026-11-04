# DartSync – kostenlose Ausführung über GitHub Actions

Dieser Ordner enthält ausschließlich Programmcode. Tabelle, Zugangscode und Web-App-Adresse gehören nicht als Dateien in das öffentliche Repository.

Der Workflow nutzt Standard-Runner in einem öffentlichen Repository und legt weder Artefakte noch Caches an. Er verweigert die Ausführung in privaten Repositories. Die Kostenfreiheit dieser Runner ist dokumentiert: https://docs.github.com/en/billing/concepts/product-billing/github-actions

Die bestehenden Google-Tabelle und das vollständige Apps Script DartSync-4.gs bleiben erhalten. In GitHub müssen APPS_SCRIPT_URL und SYNC_TOKEN als Repository-Secrets eingetragen werden. Sie dürfen nicht in den Code geschrieben werden. Reguläre Läufe sind alle 30 Minuten vorgesehen, an Turniertagen zwischen 13 und 20 Uhr deutscher Zeit alle fünf Minuten; GitHub kann ihn verzögern oder auslassen. Zeitpläne werden auf dem Standardbranch ausgeführt. GitHub deaktiviert Zeitpläne öffentlicher Repositories nach 60 Tagen ohne Repository-Aktivität. Dann muss der Workflow wieder aktiviert werden. Es gibt keine Zusage minutengenauer oder dauerhaft unterbrechungsfreier Ausführung.

Nach dem Einrichten müssen die GitHub-Secrets zur bestehenden Web-App passen. Fehlgeschlagene Abrufe sind unter Actions sichtbar; vorhandene Tabellendaten bleiben bei einem Importfehler erhalten.

Ein historischer Erstimport lässt sich einmal über Actions → DartSync automatisch → Run workflow → backfill aktivieren. Automatische Teilnehmer- und Ergebnisabrufe laufen nur ab zwei Kalendertagen vor dem Turnier bis zum Ende des Turniertags in Europe/Berlin. Ab dem Folgetag gibt es keine automatischen Nachkontrollen. Nur vollständig eingerichtete Jahre und Turniere aus der Google-Tabelle werden berücksichtigt.

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

Vollständige Turniere mit ausdrücklich geprüfter 9-Darter-Statistik werden nach 48 Stunden archiviert und für weitere Importe gesperrt. Die Punkte bleiben als Endstand erhalten. Bereits geprüfte historische Turniere werden bei der Einrichtung anhand des Turnierdatums geschlossen. Unvollständige ältere Turniere bleiben offen und werden außerhalb des Abrufzeitraums nur noch auf manuelle Anforderung nachgeprüft. Der Abrufplan enthält keine abgeschlossenen Turniere; manuelle Abrufe und Backfills umgehen diese Sperre nicht. Offizielle spätere Korrekturen sind über DartSync → Abgeschlossenes Turnier wieder öffnen möglich. Ausgeblendete Archive sind Bestandteil der Sicherung und dürfen nicht gelöscht werden.

2026 behält seine bisherigen Ja/Nein-Spalten und erhält ein Limit von drei Jokern pro Person. Neu angelegte Jahre ab 2027 haben standardmäßig fünf Joker pro Person, beim Anlegen einstellbar. Die Auswahl erfolgt über eine eigene Joker-Seitenleiste, mit Restanzeige und deutlichem Hinweis bei ausgeschöpftem Kontingent. Aktivierte zukünftige Joker reservieren bereits einen Platz. Die bisherigen Übernahmeregeln bleiben bestehen.

Der Saisonverlauf enthält nun zusätzlich Durchschnitts-Match-Averages und Legbilanzen für alle ursprünglich gewählten Pferde, normale Siegerpferde und deutsche Pferde sowie Matchbilanz, Leggewinnquote und getippte Turniersieger. Jede Spielerpartie zählt gleich. Fehlende Averages und Walkovers werden beim Average ausgelassen; Walkovers zählen auch nicht zur Legbilanz. Joker-Ersatzspieler werden in diesen Statistiken der ursprünglichen Tipps nicht mitgerechnet. Ein Direktduell der beiden eigenen Pferde zählt beide Spielerleistungen.

## Teilnehmerabgleich mit Version 5.1

Bei einer vollständig geladenen Teilnehmerliste werden fehlende, noch nicht angetretene Spieler als zurückgezogen geführt und aus den Dropdowns entfernt. Ausdrückliche Absagen werden ebenfalls berücksichtigt. Ein Matchimport erhält diese Statuswerte; bereits gespielte Matches bleiben erhalten. Teilimporte und Listen mit fehlenden Zeilen oder doppelten Namen ersetzen die vorhandene Starterliste nicht.

Für bestehende Installationen: Den vollständigen Code aus `DartSync-4.gs` in Apps Script ersetzen und speichern. Dann die bestehende Web-App unter Bereitstellen → Bereitstellungen verwalten → Stift → Neue Version aktualisieren. Die vorhandenen Trigger bleiben verwendbar. Details stehen in `Anleitung-DartSync-5.1.md`.

Der Worker prüft die eingelesene Spielerzahl gegen die sichtbaren DartConnect-Gruppenzahlen. Die Protokolle enthalten nun aktive und zurückgezogene Teilnehmer sowie die Bestätigung des vollständigen Abgleichs. Eine alte Web-App erzeugt einen Hinweis auf das erforderliche Script-Update, während verfügbare Spielresultate weiter importiert werden.

## Fünf-Minuten-Abrufe an Turniertagen

Zwischen 13:00 und 20:00 Uhr in Europe/Berlin ergänzen zusätzliche Termine den bisherigen Halb-Stunden-Takt zu einem Fünf-Minuten-Takt. Sommer- und Winterzeit werden automatisch berücksichtigt. Die Termine liegen auf Minuten 02, 07, 12, 17 usw.; 17 und 47 bleiben die regulären Läufe. Reguläre Teilnehmer- und Ergebnisabrufe erfolgen alle 30 Minuten, ausschließlich ab zwei Kalendertagen vor dem Turnier bis zum Ende des Turniertags.

Vor der Browserinstallation wird der Abrufplan der Google-Tabelle gelesen. Zusätzliche Läufe werden ohne Browser übersprungen, wenn heute kein offenes Turnier eingetragen ist, die Cloud pausiert ist oder der Lauf erst nach Ende des Zeitfensters startet. Zusätzliche Läufe prüfen ausschließlich die heutigen Turniere. Die regulären Läufe erfassen veröffentlichte Teilnehmer bevorstehender Turniere nur innerhalb dieses dreitägigen Zeitraums. Automatische Nachkontrollen an späteren Tagen entfallen. Der gelesene Plan wird nur vorübergehend auf dem Runner gespeichert und nicht veröffentlicht. Ein veralteter Plan wird erneut angefordert.

Die Änderung benötigt kein Apps-Script-Update. Manuelle Läufe funktionieren weiterhin jederzeit. GitHub kann Zeitplan-Ereignisse verzögern oder verwerfen; der Fünf-Minuten-Takt ist deshalb ein geplanter Takt und keine Echtzeitgarantie. Die Standard-Runner des öffentlichen Repositorys bleiben kostenlos.

## Abrufe nur von zwei Tagen vor dem Turnier bis zum Turniertagsende

Für ein Turnier am Mittwoch beginnt der automatische Teilnehmer-/Ergebnisabgleich am Montag um 00:00 Uhr und endet am Mittwoch um 23:59 Uhr, jeweils deutscher Ortszeit. Innerhalb dieses Zeitraums bleibt es beim Halb-Stunden-Takt; am eigentlichen Turniertag von 13 bis 20 Uhr ergänzen die Live-Termine den Fünf-Minuten-Takt. Am Folgetag werden auch unvollständige Turniere automatisch nicht mehr bei DartConnect abgefragt. Die bestehende 48-Stunden-Archivierung in Google bleibt erhalten und verwendet den zuletzt geprüften Stand; unvollständige oder ungeprüfte Endstände werden weiterhin nicht erzwungen eingefroren.

GitHub führt außerhalb der aktiven Zeiträume nur die kurze Prüfung des Google-Abrufplans aus und überspringt Browserinstallation und DartConnect-Import. Falls bei einem neuen Jahresblatt noch Turnierdaten fehlen, ist einmal täglich um 06:37 Uhr ein reiner Kalenderabgleich vorgesehen: Nur veröffentlichte Termine werden ergänzt, keine Teilnehmer oder Spiele geladen. Sobald alle Termine bekannt sind, entfällt auch dieser Browserabruf. Bei ohnehin laufenden Abrufen werden geänderte veröffentlichte Termine ebenfalls übernommen.

Manuelle Läufe bleiben für gezielte Nachkontrollen möglich und sind von der automatischen Tagesgrenze ausgenommen. Die Sperre bereits archivierter Turniere bleibt bestehen; dafür muss zuerst ausdrücklich die Wiederöffnen-Funktion im Google-Script verwendet werden. Ein Apps-Script-Update ist für die neue Abrufbegrenzung nicht erforderlich.



## 180er und 170er-Finishes (5.2)

Das vollständige Apps Script steht weiterhin in `DartSync-4.gs`; der Dateiname bleibt für bestehende Verweise erhalten. Installation und Bedienung: [Anleitung-DartSync-5.2.md](Anleitung-DartSync-5.2.md).

Ab AP zeigt jedes Jahresblatt die Rundendetails der ursprünglich gewählten Pferde und daneben +1 je 180er / +10 je echtem 170er-Finish. Ein Haken in AP3 schaltet die Regel. **2026 bleibt ausschließlich Test; die Saisonpunkte werden nicht verändert.** Neue Jahre starten ohne aktiven Bonus. Bei Aktivierung zählt der Bonus für noch offene Turniere mit; abgeschlossene Turniere bleiben fest.

Die Quelle sind öffentlich zugängliche Spielberichte mit einzelnen Legs. Der Dienst prüft Spieler, Runde, Ergebnis und Legzahl, verwendet unveränderte Berichte wieder und markiert fehlende Berichte als vorläufig. Nur die benötigten Berichte für die ursprünglichen Tipps werden geladen. Der authentifizierte Abrufplan enthält diese Auswahlen, wird nur temporär auf dem Runner gespeichert, nicht als Artefakt veröffentlicht und durch `.gitignore` ausgeschlossen. Öffentliche Protokolle enthalten für diesen Zusatz nur Zählwerte, keine Tipps. Der bestehende Zeitplan gilt unverändert.

Die neue Web-App muss einmal auf 5.2 aktualisiert werden. Bis dahin laufen bestehende Importe weiter; der neue Worker überspringt nur den Wurfbonus.


## Laufende Live-Sitzungen statt ausschließlich Cron-Einzelstarts (5.2.1)

GitHub hat im geprüften Verlauf automatische Starts mit mehrstündigen Abständen ausgelöst; der konfigurierte Fünf-Minuten-Cron allein liefert deshalb keinen verlässlichen Live-Takt. Ein gestarteter Synchronisierungsjob bleibt an einem offenen Turniertag zwischen 13 und 20 Uhr Europe/Berlin jetzt bis zu fünf Stunden aktiv und ruft selbst im Abstand von fünf Minuten ab. Dauert ein Abruf länger, werden verpasste Takte ausgelassen; es gibt keine parallelen Nachholabrufe. Alle ungefähr 30 Minuten werden auch anstehende Turniere innerhalb des bisherigen Zweitagesfensters berücksichtigt.

Nach jedem Durchlauf wird der authentifizierte Abrufplan neu gelesen. Pausierte oder abgeschlossene Turniere werden weiter respektiert. Nach 20 Uhr und an Tagen ohne heutiges offenes Turnier gibt es keine Live-Schleife. Ein Job beendet die Live-Sitzung spätestens nach fünf Stunden; ein bereits wartender oder später von GitHub gestarteter Job kann übernehmen. Nur ein Synchronisierungsjob läuft gleichzeitig, Quelltests können unabhängig davon ausgeführt werden.

Die ursprünglichen Cron-Zeitpläne dienen weiterhin dem automatischen Start und der Übergabe. **Auch der erste Start und ein späterer Jobwechsel können durch GitHub verzögert werden; eine garantierte lückenlose Fünf-Minuten-Aktualisierung ist damit nicht zugesagt.** Ein manueller Run startet dieselbe Live-Sitzung, solange das Turnierfenster offen ist. Es braucht dafür keine Apps-Script-Änderung und keine neuen Secrets. Die 180er-/170er-Erweiterung setzt weiterhin Apps Script 5.2 voraus.


## 9-Darter aus Einzelberichten (5.2.2)

Fehlt die veröffentlichte Leistungsübersicht, werden die bereits beendeten Begegnungen jetzt anhand der öffentlichen Einzelberichte geprüft: gewonnenes 501-SIDO-Leg, Start 501, erzielte Punkte 501, genau neun Darts. Ein First-9-Average ist kein 9-Darter. Die Berichte werden pro Live-Sitzung wiederverwendet; neue und geänderte Spiele werden erneut geprüft. Maximal zwei Berichte werden parallel geladen, je Durchlauf gilt ein Zeitbudget von drei Minuten. Ein großer Erstimport kann mehrere Durchläufe benötigen. Nur nach vollständigem Abgleich der im Durchlauf importierten, gespielten Begegnungen werden die Namen über die bestehende nineDarters-Schnittstelle übertragen. Fehlende Berichte führen nicht zu bestätigten Nullwerten. Die bisherige Web-App bleibt kompatibel; neue Secrets sind nicht erforderlich.

Der Quelltest nutzt wie der produktive Import das vorinstallierte Chrome mit aktiviertem Sandbox-Schutz. Dadurch funktioniert er auch unter den AppArmor-Vorgaben des Ubuntu-Runners.
