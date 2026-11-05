# DartSync 5.4: kompakte Spielwiese

Die überarbeitete Ansicht ist bereits in eurer Tabelle und in der Jahresvorlage eingerichtet.

- Zwei schmale Abstandsspalten trennen die Gesamtwertung von der Spielwiese.
- **AW / AY:** Julian / Nico, je Pferd eine kurze Zeile mit 180ern und 170er-Finishes.
- **AX / AZ:** Testpunkte. Bei ausgeschaltetem Test steht 2026 dort „—“.
- **BA / BB / BC:** punktbeste Kombination aus Pferd, deutschem Pferd und erreichbaren Punkten. „J“ und „N“ kennzeichnen unterschiedliche Ergebnisse für Julian und Nico.
- Die ausführlichen Rundendetails und Punkteaufteilungen stehen in den Zellnotizen.
- Der Haken sitzt jetzt in **AW3**. Er verändert 2026 keine Saisonpunkte. Für spätere Jahre gilt weiterhin die bereits vereinbarte optionale Bonusregel; abgeschlossene Turniere bleiben fest.
- Die Turnierzeilen bleiben **70 Pixel** hoch.

Die bisherigen Felder AP:AT sind ausgeblendet und werden weiterhin für die Berechnung benötigt. Bitte nicht löschen. Die neue Anzeige ist mit diesen Feldern verknüpft und aktualisiert sich auch bei den bisherigen Importen. Für automatisch aktuelle Detailnotizen und das Anlegen künftiger Jahre ist das ergänzte Script 5.4 vorgesehen.

## Script einmal aktualisieren

1. Den vollständigen Inhalt von **DartSync-5.4.gs** kopieren. In der bestehenden Tabelle **Erweiterungen → Apps Script** öffnen, den bisherigen Code komplett ersetzen und speichern.
2. **Bereitstellen → Bereitstellungen verwalten → Stift → Version: Neue Version → Bereitstellen.** Die bestehende Bereitstellung bearbeiten, damit die Adresse erhalten bleibt.
3. Tabelle neu laden.

Keine neuen Konten, Secrets oder Trigger erforderlich. Alle Funktionen von 5.3 sind enthalten. Es wurden keine Punkte-Regeln oder Synchronisierungszeiten geändert.
