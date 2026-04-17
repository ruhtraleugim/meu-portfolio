# 🧾 CheckList API
 > **Progetto progettato per dimostrare conoscenze avanzate nell'architettura e nello sviluppo back-end con Spring Boot.**  
> Sebbene la proposta (un sistema di liste di controllo) sia semplice, l'implementazione è stata fatta con ** buone pratiche, sicurezza e struttura di livello professionale**, per esemplificare la padronanza dei principali strumenti del moderno ecosistema Java. ---
 ## 🚀 Tecnologie utilizzate - **Java 21**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA**
- ** Persistenza di Giacarta **
- **Lombok**
- **BCrypt** (per la crittografia delle password)
- **H2 / PostgreSQL** (database configurabile)
- **Maven**
- **Docker**
 ---
 ## 🐳 Docker
 Questo progetto ha una configurazione per l'esecuzione in un container Docker, facilitando l'implementazione e la standardizzazione dell'ambiente. ### Come eseguire Docker
 1. Assicurarsi di avere [Docker](https://www.docker.com/get-started) installato e in esecuzione. 2. Alla radice del progetto, eseguire:
 ```bash
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
3. L'app sarà disponibile all'indirizzo: http://localhost:8080
 È inoltre possibile configurare una banca PostgreSQL tramite Docker e collegare i contenitori regolando le variabili di ambiente. src/main/java/com/DesafioTec/CheckList
 │ ├── impostazioni generali (sicurezza, fagioli, ecc.)
 │   └── SecurityConfig.java
 │
 ├── controller/ controller REST (livello API)
 │   ├── checklist/ChecklistController.java
 │   └── UserController.java
 │
 ├── dto/Data Transfer Objects (DTO)
 │
 ├── modello/ entità JPA (mappatura bancaria)
 │   ├── list/ CheckListModel e ItemModel
 │   └── user/ UserModel (implementa UserDetails)
 │ ├── repository/ repository JPA (accesso bancario)
 │
 └── livello servizio/regole aziendali
 ├── checkList/CheckListService.java
 └── user/UserService.java
 ## 🔐 Autenticazione e autorizzazione
 L'applicazione utilizza Spring Security con iniezione utente autenticata tramite @AuthenticationPrincipal. Ogni endpoint sensibile convalida che l'utente che effettua la richiesta sia effettivamente il proprietario della risorsa prima di consentire aggiornamenti o eliminazioni. Le password vengono crittografate con BCrypt al momento della registrazione. Esempio:
```Java
 if (!existing.getUser().getUserId().equals(user.getUserId())) {
 return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
}
 ```
 ## 📚 Endpoint chiave
### 👤 Utenti | Metodo | Endpoint             | Descrizione               | Accesso           |
|--------|----------------------|-------------------------|------------------|
| POST   | /api/users/register | Crea un nuovo utente  | Pubblico      |
| GET    | /api/users   | Elenca tutti gli utenti | ADMIN    |   
| GET    | /api/users/{id}     | Ricerca utente per ID   | Personale o AMMINISTRATORE    |
| PUT    | /api/users/{id}      | Aggiorna i dati utente | Propri o AMMINISTRATORE |
| ELIMINA | /api/users/{id}      | Rimuovi utente          | Proprietario o AMMINISTRATORE |
 # ## 📝 Liste di controllo | Metodo | Endpoint             | Descrizione               | Accesso           |
|--------|----------------------|-------------------------|------------------|
|GET	 | /api/checklist/all   | Elenca tutte le checklist    | ADMIN    |
|GET	|/api/checklist/myLists| Liste	di controllo degli utenti registrati	|Propri|
|GET	|/api/checklist/myLists/{id}|	Cerca lista di controllo per ID|Self|
|POST|	/api/checklist/myLists|	Crea una nuova checklist	|Own |
|PATCH|	/api/checklist/myLists/{id}|	Aggiornamenti lista di controllo esistente|	Propri|
|ELIMINA	|/api/checklist/myLists/{id}|	Rimuovi checklist|	Propri|
 ## 🧠 Logica aziendale
 - Ogni utente (UserModel) può avere più checklist (CheckListModel)
 - Ogni lista di controllo contiene un elenco di elementi (ItemModel). ### Le relazioni seguono:
 - UserModel 1:N CheckListModel
 - CheckListModel 1:N ItemModel
 L'utilizzo di CascadeType.ALL e orphanRemoval = true garantisce che gli elementi vengano rimossi insieme alla checklist principale. ## 🧰 Come eseguire il progetto localmente
#### Prerequisiti
 - Java 21+
 - Maven 3+
 - Docker (opzionale per container)
 ### Passi
```
# Clona il repository
git clone https://github.com/seu-usuario/checklist-api.git
cd checklist-api
 # Installa dipendenze
mvn clean install
 # Eseguire il progetto
mvn spring-boot:run
 ```
#### o da docker
```
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
 ## 📚 Considerazioni finali Questo progetto è stato sviluppato con particolare attenzione alla dimostrazione di padronanza tecnica, buone pratiche e strutturazione del codice. Anche se è un'applicazione semplice, è stata appositamente costruita con un'architettura completa e scalabile, mostrando conoscenze in Spring Boot, JPA, sicurezza, DTO e integrazione Docker.