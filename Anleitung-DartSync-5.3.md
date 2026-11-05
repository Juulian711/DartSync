# DartSync 5.3: Punktbeste Pferde-Kombination

Die neue Spalte **AT** zeigt die rückblickend punktbeste Kombination aus normalem und deutschem Pferd. Für Turniere 17–33 ist sie bereits berechnet. Die Jahresvorlage enthält die neue Spalte ebenfalls. Alle bisherigen Eingaben und Saisonpunkte bleiben erhalten; die Turnierzeilen bleiben 70 Pixel hoch.

## Was berechnet wird

Alle Kombinationen des verifizierten Teilnehmerfeldes werden verglichen. Die Auswertung zählt:

- Rundenpunkte für normales und deutsches Pferd gemäß Punktetabelle;
- +10 für den besten Deutschen, +30 für den Doppel-Treffer;
- Whitewashes (+10 / −10 je Auswahlrolle, wie in den bestehenden Formeln);
- +50 bei mindestens einem 9-Darter-Pferd in der Kombination;
- +5 Average-Bonus, wenn der höchste Match-Average der Kombination den der tatsächlich ausgewählten Gegner-Pferde übertrifft; bei Gleichstand gibt es keinen Average-Bonus;
- **+1 je 180er und +10 je tatsächlichem 170er-Finish**.

**Ohne Joker**, wie vereinbart. Der Wurfbonus wird für diese theoretische Berechnung immer berücksichtigt, unabhängig vom Haken in AP3. Er verändert die reale Saisonwertung 2026 nicht.

Die beiden Rollen dürfen wie in eurem bisherigen Sheet mit demselben Spieler belegt werden. Die Runden-/Whitewash-Punkte zählen dann je Rolle; der 180er-/170er-Wurfbonus zählt einmal für diesen Spieler. Der 9-Darter-Bonus beträgt wie in euren bestehenden Formeln höchstens 50 pro Person und Turnier, auch wenn beide gewählten Pferde einen 9-Darter erzielen.

Der Average-Vergleich kann für Julian und Nico unterschiedliche Höchstwerte oder Kombinationen ergeben. In AT stehen dann beide Ergebnisse. Die **Zellnotiz** enthält die vollständige Punkteaufteilung, den gegnerischen Average und gleichwertige Alternativen. Bei vielen Gleichständen werden die Anzahl und höchstens zehn Beispiele angezeigt. Eine Auswahl des anderen darf wie in den bisherigen Dropdowns ebenfalls regulär gewählt werden; die Gegner-Sperre gehört zur hier ausgeschlossenen Jokerregel.

Eine noch laufende Veranstaltung ist als **vorläufig** gekennzeichnet. Für den aktuellen Matchstand müssen die Tageswerte vollständig geprüft sein. Fehlende Wurfzahlen werden nicht als null behandelt.

## Automatische Fortführung einmal freischalten

Für die neue Berechnung muss die Google-Web-App den ergänzten Import und die Berechnung kennen:

1. **DartSync-5.3.gs** öffnen und den vollständigen Inhalt kopieren. In der bestehenden Google-Tabelle **Erweiterungen → Apps Script** öffnen, den bisherigen Code komplett ersetzen und speichern.
2. **Bereitstellen → Bereitstellungen verwalten → Stift → Version: Neue Version → Bereitstellen**. Die bestehende Bereitstellung bearbeiten, damit Adresse und GitHub-Secrets passen.
3. Die Tabelle neu laden. Bei Bedarf unter **DartSync → Punktbeste Pferde berechnen** die Anzeige aktualisieren.

Danach wird AT bei den bestehenden automatischen Importen aktualisiert. Neue Jahre erhalten die Spalte beim Anlegen. Vor der neuen Bereitstellung sind die bereits eingetragenen historischen Ergebnisse sichtbar; die automatische Fortführung der neuen Auswertung ist noch nicht aktiviert. Die bisherigen Teilnehmer-, Ergebnis- und 9-Darter-Importe funktionieren weiter.

Es sind keine neuen Secrets, Trigger oder zusätzlichen Konten erforderlich. Der vorhandene GitHub-Zeitplan und die Live-Sitzungen gelten weiter; Starts können durch GitHub verzögert werden.

## Quellen und Kontrolle

Für die 180er werden vollständige DartConnect-Tageszahlen verwendet. Alle Spieler-, Match- und Legzahlen werden mit den importierten Begegnungen verglichen. Bei Spielern mit einem 170er als höchstem Checkout werden zusätzlich sämtliche relevanten Einzelberichte auf tatsächliche 170er-Finishes geprüft. Bereits vollständig geprüfte Einzelberichte werden wiederverwendet. Die 9-Darter kommen aus der Leistungsübersicht oder aus vollständig geprüften Einzelberichten.

Eine Signatur bindet die Tageswerte an Jahr, Turnier und den aktuellen Matchstand. Veraltete oder unvollständige Daten ersetzen keine gültige Berechnung. Die verifizierten Tageswerte liegen im ausgeblendeten Tab **Tageswerte_JAHR**; dieser Tab wird für die Berechnung benötigt.
