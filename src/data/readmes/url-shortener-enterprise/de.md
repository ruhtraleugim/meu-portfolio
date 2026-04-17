# URL-Shortener 
 Es ist meine Sicht auf die **warum** und **Entscheidungen, die ich getroffen habe**, dass der Shortener in einem sehr hohen Maßstab arbeitet, 24/7, seit 10 Jahren, mit extrem kurzen URLs. ---
 ## 🎯 Zweck des Systems
Erstellen Sie einen URL-Shortener, der ohne Unterbrechung arbeitet, in der Lage ist, **100 Millionen neue URLs pro Tag** zu verarbeiten, und der alles für * * 10 Jahre * * speichert, ohne an Leistung zu verlieren, ohne Kollisionen zu erzeugen und URLs kurz zu halten. ---
 ## 🧠 Schlüsselentscheidungen
 ### 1. **Zeichensatz-Set: Base62 (0–9, a–z, A–Z)**
Ich habe mich für Base62 entschieden, weil es das kompakteste Set ist, das immer noch universell kompatibel ist und in keinem Browser ein Problem verursacht. Dadurch wird auch der Kombinationsraum maximiert. ### 2. ** Shortcode-Größe: 7 Zeichen**
Ich habe nicht umsonst 7 ausgewählt. Mit 100 MILLIONEN neuen URLs pro Tag für 10 Jahre haben wir **365 Milliarden Codes**. - 62^6 halten es nicht aus. - 62^7 kann es ersparen — das war also die natürliche Wahl. Entscheidung: Variable Länge ab 5 Zeichen bis 7; da dies verhindert, dass sie "die URLs treten". ### 3. **Datenbank: Cassandra / ScyllaDB**
Ich habe mich für Cassandra entschieden, weil:
- praktisch unendliche horizontale Skala;
- billiges und verteiltes Schreiben (und wir werden VIEL schreiben);
- schnelles Lesen in Kombination mit Cache;
- absurde Fehlertoleranz. Postgres Sharded wäre möglich, aber viel teurer und anfälliger für den zu erwartenden Traffic. ### 4. **Leseschwerer Cache: Redis + CDN**
Da das Verhältnis **1 Aufnahme für 10 Messwerte** ist, ist es offensichtlich, dass:
- Wir können nicht für jeden get zur Bank gehen. - Das CDN sollte auf die meisten Weiterleitungen reagieren. - Redis tritt als heißer Cache für die Misses ein. ### 5. **Lagerung für 10 Jahre**
Die Gesamtrohdaten erreichen leicht über **100 TB**. Die Entscheidung lautete daher:
- aktuelle Daten sind in der Hauptbank;
- alte Daten gehen in den Kältespeicher — aber ohne die Fähigkeit zur Wiederherstellung bei Bedarf zu verlieren. ### 6. ** Einfache und unkomplizierte API **
Hauptendpunkt: `POST /api/v1/shorten`. Kein Problem. Es erhält nur eine URL, validiert und gibt den Shortcode zurück. ## # 7. **Validierung: maximal 100 Bytes**
Ich habe mich entschieden, dieses Limit aufzuerlegen, weil:
- vermeidet riesige Nutzlast;
- hält das System vorhersehbar;
- hilft bei der Speicherung und Indizierung. ### 8. ** TTL-Richtlinie: 10 feste Jahre **
Das System akzeptiert kleinere, aber nie größere TTL. Dies sorgt für Konsistenz und ermöglicht es Ihnen, den Datenlebenszyklus zu kontrollieren. ### 9. **Codegenerierung: Verteilter Zähler + Base62**
Nichts Zufälliges. Zufällig ist einfach, aber es erzeugt Kollisionen und erfordert eine Verriegelung oder Überprüfung. Ich habe mich für etwas Deterministisches entschieden:
- Shardeado Global Counter;
- Umbau auf Base62;
- ggf. implizites Präfix pro Werker. Ergebnis: stabile Erzeugung, ohne Kollision und mit absurdem Durchsatz. ## # 10. ** Obligatorische Beobachtbarkeit **
Ich habe entschieden, dass das System nur akzeptabel ist, wenn es:
- strukturierte Protokolle;
- Latenz- und Fehlerratenmetriken;
- anomale Verkehrswarnungen;
- verteilte Rückverfolgung. Ohne sie können Sie nichts betreiben, was rund um die Uhr funktioniert. ## 🔐 Sicherheitsentscheidungen
 ### 🔒 Wie jeder Schutz implementiert wird
 ### # **1. Verteiltes Ratenlimit (Hochwasserschutz)**
Entscheidung: Verwende **Token-Bucket, der in Redis** verteilt ist. - Jede IP erhält einen „Bucket“ mit X Requests pro Sekunde. - Bei jeder Verkürzung versucht das System, 1 Token zu verbrauchen. - Wenn der Eimer leer ist → `429 Zu viele Anfragen`. - Redis garantiert den atomaren Betrieb und arbeitet in Clustern. **Schützt vor:** Bots, aggressiver Automatisierung und Massengenerierung von URLs. ---
 #### **2. Filtern Sie nach bösartigen URLs (Anti-Phishing und Anti-Malware)**
Mehrschichtige Validierungspipeline:
1. Grundlegende Regex zur Validierung des Formats. 2. Blockieren gefährlicher Schemata: `javascript:`, `data:`, `file:`. 3. Überprüfung verdächtiger Domains (Sperrliste). 4. Integration mit Sicherheits-APIs (Google Safe Browsing / Cloudflare Security). 5. Normalisierung der URL (unsichtbaren Unicode, Leerzeichen, verdächtige Zeichen entfernen). **Schützt über Links vor:** Malware, Phishing, Betrug und Ausbeutung. Das einzige Problem ist immer noch der Benutzer. "
 #### **3. Automatische Sperrung verdächtiger Muster (Missbrauchserkennung)**
Heuristisches System + automatische Regeln:
- plötzliche Explosion von Anfragen durch IP;
- Sehr ähnliche URLs werden in großen Mengen erstellt (Automatisierungsindikator);
- verschleierte Parameter oder Spam-Muster;
- Wiederholen von URLs für Domains mit schlechtem Ruf. Automatische Aktionen:
- vorübergehende IP-Blockierung;
- Erhöhung des Ratenlimits für den Täter (progressives Verbot);
- die Domain als verdächtig zu markieren;
- Captcha-Anforderung;
- Alarm zur Beobachtung gesendet. **Schützt vor:** Spam, automatisiertem Missbrauch, Angriffen, kürzerer Ausnutzung. ---
- Ratenlimit: Sie können nicht Millionen von Verkürzungen pro Minute abfeuern;
- Filterung nach schädlichen URLs;
- automatisches Blockieren von verdächtigen Mustern. Robustes System braucht Schutz vor Missbrauch. “
 ## 🌐 Routing-Entscheidung: CDN immer vorne
GET /{code} sollte niemals direkt auf das Backend zugreifen. Entscheidung: jede Lösung läuft über CDN (Cloudflare, AWS CloudFront o.ä.). ---
 ## 🛠 Warum Java + Spring? - zuverlässig;
- stabil unter extremer Belastung;
- leicht zu besteigen;
- ein ausgereiftes Ökosystem für Beobachtbarkeit und Sicherheit. Mit dem erwarteten Datenverkehr würde Node/Express oder Python/Django viel mehr leiden. --- ## 🚀 Zusammenfassung der endgültigen Vision
Dieser Shortener ist kein „kleines Projekt“. Es wurde entwickelt, um **10 Jahre** zu halten, mit **Hunderten von Milliarden** von Datensätzen, die **ohne Absturz** laufen und in **Millisekunden** reagieren. Hier wurde alles mit den Schwerpunkten entschieden:
- Skala;
- Verfügbarkeit;
- niedrige Kosten pro Betrieb;
- Bedienungsfreundlichkeit;
- Robustheit.