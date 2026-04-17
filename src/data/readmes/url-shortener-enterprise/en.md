# URL shortener 
 It is my view of the **why** and **decisions I have made** for the shortener to work at a very high scale, 24/7, for 10 years, with extremely short URLs. ---
 ## 🎯 Purpose of the system
Create a URL shortener that operates without interruption, capable of handling **100 million new URLs per day**, and that keeps everything saved for **10 years**, without losing performance, without generating collisions and keeping URLs short. ---
 ## 🧠 Key decisions
 ### 1. **Charset set: Base62 (0–9, a–z, A–Z)**
I decided to use Base62 because it is the most compact possible set that is still universally compatible and does not cause a problem in any browser. This also maximizes the combination space. ### 2. ** Shortcode size: 7 characters**
I didn't pick 7 for nothing. With 100M new URLs per day for 10 years, we'll have **365 billion codes**. - 62^6 can't stand it. - 62^7 can take it to spare — so that was the natural choice. Decision: Variable length starting at 5 characters going up to 7; as it prevents them from "kicking the urls". ### 3. **Database: Cassandra / ScyllaDB**
I chose Cassandra because:
- practically infinite horizontal scale;
- cheap and distributed writing (and we will have A LOT OF writing);
- fast reading when combined with cache;
- absurd fault tolerance. Postgres sharded would be possible, but much more expensive and fragile for the expected traffic. ### 4. ** Read-heavy cache: Redis + CDN**
As the ratio is **1 recording for 10 readings**, it is obvious that:
- We can't go to the bank for every get. - The CDN should respond to most redirects. - Redis enters as hot cache for the misses. ### 5. **Storage for 10 years**
Total raw data easily reaches above **100 TB**. Therefore, the decision was:
- recent data are in the main bank;
- old data goes into cold storage — but without losing the ability to restore when needed. ### 6. ** Simple and straightforward API **
Main endpoint: `POST /api/v1/shorten`. No problem. It just receives a URL, validates and returns the shortcode. ### 7. **Validation: maximum 100 bytes**
I decided to impose this limit because:
- avoids giant payload;
- keeps the system predictable;
- helps with storage and indexing. ### 8. ** TTL Policy: 10 fixed years **
The system accepts smaller but never larger TTL. This ensures consistency and allows you to control the data lifecycle. ### 9. ** Code Generation: Distributed Counter + Base62**
Nothing random. Random is easy, but it generates collisions and requires lock or check. I decided on something deterministic:
- shardeado global counter;
- conversion to Base62;
- implicit prefix per worker, if necessary. Result: stable generation, without collision and with absurd throughput. ### 10. ** Mandatory observability **
I have decided that the system is only acceptable if it has:
- structured logs;
- latency and error rate metrics;
- anomalous traffic alerts;
- distributed tracing. Without it, you can't operate something that works 24/7. ## Safety 🔐 decisions
 ### 🔒 How each protection will be implemented
 #### **1. Distributed rate limit (flood protection)**
Decision: use **Token Bucket distributed in Redis**. - Each IP receives a "bucket" with X requests per second. - With each shortening, the system tries to consume 1 token. - If the bucket is empty → `429 Too Many Requests`. - Redis guarantees atomic operations and works in clusters. **Protects against:** bots, aggressive automation, and mass generation of URLs. ---
 #### **2. Filter against malicious URLs (anti-phishing and anti-malware)**
Multi-layer validation pipeline:
1. Basic regex to validate format. 2. Blocking dangerous schemes: `javascript:`, `data:`, `file:`. 3. Verification of suspicious domains (blocklist). 4. Integration with security APIs (Google Safe Browsing / Cloudflare Security). 5. Normalization of the URL (remove invisible unicode, spaces, suspicious characters). **Protects against:** malware, phishing, scams, and exploitation via links. The only problem is still the user. ”
 #### **3. Automatic blocking of suspicious patterns (abuse detection)**
Heuristic system + automatic rules:
- sudden explosion of requests by IP;
- Very similar URLs being created in bulk (automation indicator);
- obfuscated parameters or spam patterns;
- repeating URLs for domains with a bad reputation. Automatic actions:
- temporary IP blocking;
- increase of rate limit for the offender (progressive ban);
- marking the domain as suspicious;
- captcha requirement;
- alert sent for observability. **Protects against:** spam, automated abuse, attacks, shortener exploitation. ---
- rate limit: you can't fire millions of shortenings per minute;
- filter against malicious URLs;
- automatic blocking of suspicious patterns. Robust system requires protection from abuse. ”
 ## Routing 🌐 Decision: CDN in front always
GET /{code} should never hit the backend directly. Decision: every resolution goes through CDN (Cloudflare, AWS CloudFront or similar). ---
 ## 🛠 Why Java + Spring? - reliable;
- stable under extreme load;
- easy to climb;
- mature ecosystem for observability and security. With the expected traffic, Node/Express or Python/Django would suffer much more. --- ## Final Vision 🚀 Summary
This shortener is not a "little project". It is designed to last **10 years**, with **hundreds of billions** of records, running **without crashing** and responding in **milliseconds**. Everything here was decided with a focus on:
- scale;
- availability;
- low cost per operation;
- operational simplicity;
- robustness.