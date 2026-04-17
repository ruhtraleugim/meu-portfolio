# 🧾 CheckList API
 > **Projekt zur Demonstration fortgeschrittener Kenntnisse in Back-End-Architektur und -Entwicklung mit Spring Boot.**  
> Obwohl der Vorschlag (ein System von Checklisten) einfach ist, wurde die Implementierung mit **Best Practices, Sicherheit und professioneller Struktur ** durchgeführt, um die Beherrschung der wichtigsten Tools des modernen Java-Ökosystems zu veranschaulichen. ---
 ## Verwendete 🚀 Technologien - **Java 21**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA**
- **Jakarta Persistenz**
- **Lombok**
- **BCrypt** (für Passwortverschlüsselung)
- **H2 / PostgreSQL** (konfigurierbare Datenbank)
- **Maven**
- **Docker**
 ---
 ## 🐳 Docker
 Dieses Projekt verfügt über eine Konfiguration zur Ausführung in einem Docker-Container, was die Implementierung und Standardisierung der Umgebung erleichtert. ### So führen Sie Docker aus
 1. Stellen Sie sicher, dass Sie [Docker](https://www.docker.com/get-started) installiert und ausgeführt haben. 2. Führen Sie am Anfang des Projekts Folgendes aus:
 ```bash
docker build -t checkliste-api. docker run -p 8080:8080 checkliste-api
```
3. Die App ist verfügbar unter: http://localhost:8080
 Sie können auch eine PostgreSQL-Bank über Docker konfigurieren und die Container durch Anpassen der Umgebungsvariablen verknüpfen. src/main/java/com/DesafioTec/CheckList
 │ allgemeine ├── Einstellungen (Sicherheit, Bohnen usw.)
 │   └── SecurityConfig.java
 │
 ├── controller/ REST-Controller (API-Layer)
 │   ├── checklist/ChecklistController.java
 │   └── UserController.java
 │
 ├── dto/Datenübertragungsobjekte (DTOs)
 │
 ├── modell/ JPA-Einheiten (Bankzuordnung)
 │   ├── list/ CheckListModel und ItemModel
 │   └── user/ UserModel (implementiert UserDetails)
 │ ├── repository/JPA Repositories (Bankzugriff)
 │
 └── service-/ Geschäftsregel-Ebene
 ├── checkList/CheckListService.java
 └── user/UserService.java
 ## 🔐 Authentifizierung und Autorisierung
 Die Anwendung verwendet Spring Security mit authentifizierter Benutzerinjektion über @AuthenticationPrincipal. Jeder sensible Endpunkt überprüft, ob der Benutzer, der die Anfrage stellt, tatsächlich der Ressourcenbesitzer ist, bevor er Updates oder Löschungen zulässt. Passwörter werden zum Zeitpunkt der Registrierung mit BCrypt verschlüsselt. Beispiel:
```Java
 if (!existing.getUser().getUserId().equals(user.getUserId())) {
 return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
}
 ```
 ## Wichtige 📚 Endpunkte
### 👤 Benutzer | Methode | Endpunkt             | Beschreibung               | Zugriff           |
|--------|----------------------|-------------------------|------------------|
| POST   | /api/users/register | Erstellt einen neuen Benutzer  | Öffentlich      |
| GET    | /api/users   | Listet alle Benutzer auf | ADMIN    |   
| GET    | /api/users/{id}     | Benutzersuche nach ID   | Self oder ADMIN    |
| PUT    | /api/users/{id}      | Aktualisiert Benutzerdaten | Own oder ADMIN |
| LÖSCHEN | /api/users/{id}      | Benutzer entfernen | Own oder ADMIN |
 ### 📝 Checklisten | Methode | Endpunkt             | Beschreibung               | Zugriff           |
|--------|----------------------|-------------------------|------------------|
|GET	 | /api/checklist/all   | Listet alle Checklisten auf | ADMIN    |
|GET	|/api/checklist/myLists|	Checklisten für angemeldete Benutzer	|Own|
|GET	|/api/checklist/myLists/{id}|	Checkliste nach ID suchen |Selbst|
|POST|	/api/checklist/myLists |	Neue Checkliste erstellen	|Own |
|PATCH|	/api/checklist/myLists/{id}|	Aktualisierungen vorhandene Checkliste |	Eigen|
|LÖSCHEN	|/api/checklist/myLists/{id}|	Checkliste entfernen |	Eigen|
 ## 🧠 Geschäftslogik
 - Jeder Benutzer (UserModel) kann mehrere Checklisten haben (CheckListModel)
 - Jede Checkliste enthält eine Liste von Elementen (ItemModel). ### Es folgen Beziehungen:
 - UserModel 1:N CheckListModel
 - CheckListModel 1:N ItemModel
 Die Verwendung von CascadeType.ALL und orphanRemoval = true stellt sicher, dass Elemente zusammen mit Ihrer Haupt-Checkliste entfernt werden. ## 🧰 So führen Sie das Projekt lokal aus
#### Voraussetzungen
 - Java 21+
 - Maven 3+
 - Docker (optional für Container)
 ### Schritte
```
# Repository klonen
git clone https://github.com/seu-usuario/checklist-api.git
cd checkliste-api
 # Abhängigkeiten installieren
mvn clean install
 # Führen Sie das Projekt aus
mvn spring-boot:run
 ```
#### oder per Docker
```
docker build -t checkliste-api. docker run -p 8080:8080 checkliste-api
```
 ## 📚 Abschließende Überlegungen Dieses Projekt wurde mit dem Schwerpunkt auf der Demonstration von technischer Beherrschung, bewährten Verfahren und Code-Strukturierung entwickelt. Obwohl es sich um eine einfache Anwendung handelt, wurde sie absichtlich mit einer vollständigen und skalierbaren Architektur erstellt, die Kenntnisse in Spring Boot, JPA, Sicherheit, DTOs und Docker-Integration zeigt.