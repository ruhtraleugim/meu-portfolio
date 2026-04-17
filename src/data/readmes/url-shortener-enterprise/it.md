# URL shortener 
 È la mia opinione sul * * perché * * e sulle * *decisioni che ho preso** affinché l'accorciatore funzioni su scala molto elevata, 24 ore su 24, 7 giorni su 7, per 10 anni, con URL estremamente brevi. ---
 ## 🎯 Scopo del sistema
Crea un accorciatore di URL che funzioni senza interruzioni, in grado di gestire **100 milioni di nuovi URL al giorno** e che mantenga tutto salvato per **10 anni**, senza perdere prestazioni, senza generare collisioni e mantenendo gli URL brevi. ---
 ## 🧠 Decisioni chiave
 ### 1. **Set di caratteri: Base62 (0–9, a–z, A–Z)**
Ho deciso di utilizzare Base62 perché è il set più compatto possibile che è comunque universalmente compatibile e non causa problemi in nessun browser. Questo massimizza anche lo spazio della combinazione. ### 2. **Dimensione shortcode: 7 caratteri**
Non ne ho scelti 7 per niente. Con 100 MILIONI di nuovi URL al giorno per 10 anni, avremo **365 miliardi di codici**. - 62^6 non lo sopporta. - 62^7 può portarlo a riserva — quindi questa è stata la scelta naturale. Decisione: lunghezza variabile a partire da 5 caratteri fino a 7; in quanto impedisce loro di "calciare gli URL". ### 3. **Database: Cassandra / ScyllaDB**
Ho scelto Cassandra perché:
- scala orizzontale praticamente infinita;
- scrittura economica e distribuita (e avremo MOLTA scrittura);
- lettura veloce in combinazione con la cache;
- assurda tolleranza ai guasti. Postgres frammentato sarebbe possibile, ma molto più costoso e fragile per il traffico previsto. ### 4. ** Cache read-heavy: Redis + CDN**
Poiché il rapporto è **1 registrazione per 10 letture**, è ovvio che:
- Non possiamo andare in banca per ogni colpo. - La CDN dovrebbe rispondere alla maggior parte dei reindirizzamenti. - Redis entra come hot cache per i miss. ### 5. **Conservazione per 10 anni**
I dati grezzi totali superano facilmente i **100 TB**. Pertanto, la decisione è stata:
- i dati recenti sono nella banca principale;
- i vecchi dati vengono archiviati in celle frigorifere, ma senza perdere la possibilità di ripristinarli quando necessario. ### 6. **API semplice e diretta**
Endpoint principale: `POST /api/v1/shorten`. Nessun problema. Riceve solo un URL, convalida e restituisce lo shortcode. ### 7. **Validazione: massimo 100 byte**
Ho deciso di imporre questo limite perché:
- evita carichi giganti;
- mantiene il sistema prevedibile;
- aiuta con la memorizzazione e l'indicizzazione. ### 8. **Politica TTL: 10 anni fissi**
Il sistema accetta TTL più piccoli ma mai più grandi. Ciò garantisce coerenza e consente di controllare il ciclo di vita dei dati. ### 9. **Generazione Codice: Contatore Distribuito + Base62**
Niente di casuale. Casuale è facile, ma genera collisioni e richiede blocco o controllo. Ho deciso qualcosa di deterministico:
- banco globale shardeado;
- conversione in Base62;
- prefisso implicito per lavoratore, se necessario. Risultato: generazione stabile, senza collisioni e con throughput assurdo. ### 10. **Osservabilità obbligatoria**
Ho deciso che il sistema è accettabile solo se ha:
- log strutturati;
- metriche di latenza e tasso di errore;
- segnalazioni di traffico anomalo;
- tracciamento distribuito. Senza di esso, non è possibile gestire qualcosa che funziona 24 ore su 24, 7 giorni su 7. ## 🔐 Decisioni sulla sicurezza
 ### 🔒 Come verrà implementata ogni protezione
 #### **1. Limite di velocità distribuito (protezione dalle inondazioni)**
Decisione: utilizzare **Token Bucket distribuito in Redis**. - Ogni IP riceve un “bucket” con X richieste al secondo. - Ad ogni accorciamento, il sistema tenta di consumare 1 token. - Se il bucket è vuoto → `429 Too Many Requests`. - Redis garantisce operazioni atomiche e lavora in cluster. **Protegge da:** bot, automazione aggressiva e generazione di massa di URL. ---
 #### **2. Filtra gli URL dannosi (anti-phishing e anti-malware)**
Pipeline di validazione multistrato:
1. Regegatura di base per convalidare il formato. 2. Blocco di schemi pericolosi: `javascript:`, `data:`, `file:`. 3. Verifica dei domini sospetti (blocklist). 4. Integrazione con le API di sicurezza (Google Safe Browsing / Cloudflare Security). 5. Normalizzazione dell'URL (rimozione di unicode invisibili, spazi, caratteri sospetti). **Protegge da:** malware, phishing, truffe e sfruttamento tramite link. L'unico problema è ancora l'utente. "
 #### **3. Blocco automatico dei pattern sospetti (rilevazione abusi)**
Sistema euristico + regole automatiche:
- improvvisa esplosione di richieste da parte di IP;
- URL molto simili creati in blocco (indicatore di automazione);
- parametri offuscati o schemi di spam;
- ripetizione di URL per domini con una cattiva reputazione. Azioni automatiche:
- blocco temporaneo IP;
- aumento del limite tariffario per l'autore del reato (divieto progressivo);
- marcare il dominio come sospetto;
- requisito captcha;
- avviso inviato per l'osservabilità. **Protegge da:** spam, abusi automatizzati, attacchi, sfruttamento di accorciatori. ---
- limite di velocità: non è possibile sparare milioni di accorciamenti al minuto;
- filtrare gli URL dannosi;
- blocco automatico di schemi sospetti. Un sistema robusto richiede protezione dagli abusi ".
 ## 🌐 Decisione di routing: CDN sempre davanti
GET /{code} non dovrebbe mai colpire direttamente il back-end. Decisione: ogni risoluzione passa attraverso CDN (Cloudflare, AWS CloudFront o simili). ---
 ## 🛠 Perché Java + Spring? - affidabile;
- stabile sotto carico estremo;
- facile da scalare;
- ecosistema maturo per l'osservabilità e la sicurezza. Con il traffico atteso, Node/Express o Python/Django soffrirebbero molto di più. --- ## 🚀 Riepilogo finale della visione
Questo accorciatore non è un "piccolo progetto". È progettato per durare **10 anni**, con **centinaia di miliardi** di record, funziona **senza crash** e risponde in **millisecondi**. Tutto qui è stato deciso con un focus su:
- bilancia;
- disponibilità;
- basso costo per operazione;
- semplicità operativa;
- robustezza.