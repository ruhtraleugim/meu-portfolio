# 🧾 CheckList API
 > **Project designed to demonstrate advanced knowledge in back-end architecture and development with Spring Boot.**  
> Although the proposal (a system of checklists) is simple, the implementation was done with ** best practices, security and professional level structure **, to exemplify the mastery of the main tools of the modern Java ecosystem. ---
 ## 🚀 Technologies Used - **Java 21**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA**
- **Jakarta Persistence**
- **Lombok**
- **BCrypt** (for password encryption)
- **H2 / PostgreSQL** (configurable database)
- **Maven**
- **Docker**
 ---
 ## 🐳 Docker
 This project has a configuration for execution in a Docker container, facilitating the implementation and standardization of the environment. ### How to run Docker
 1. Make sure you have [Docker](https://www.docker.com/get-started) installed and running. 2. At the root of the project, run:
 ```bash
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
3. The app will be available at: http://localhost:8080
 You can also configure a PostgreSQL bank via Docker and link the containers by adjusting the environment variables. src/main/java/com/DesafioTec/CheckList
 │ general ├── settings (security, beans, etc.)
 │   └── SecurityConfig.java
 │
 ├── controller/rest Controllers (API layer)
 │   ├── checklist/ChecklistController.java
 │   └── UserController.java
 │
 ├── dto/Data Transfer Objects (DTOs)
 │
 ├── model/JPA Entities (bank mapping)
 │   ├── list/ CheckListModel and ItemModel
 │   └── user/ UserModel (implements UserDetails)
 │ ├── repository/JPA Repositories (bank access)
 │
 └── service/Business rules layer
 ├── checkList/CheckListService.java
 └── user/UserService.java
 ## 🔐 Authentication and Authorization
 The application uses Spring Security with authenticated user injection via @AuthenticationPrincipal. Each sensitive endpoint validates that the user making the request is actually the resource owner before allowing updates or deletions. Passwords are encrypted with BCrypt at the time of registration. Example:
```Java
 if (!existing.getUser().getUserId().equals(user.getUserId())) {
 return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
}
 ```
 ## Key 📚 Endpoints
### 👤 Users | Method | Endpoint             | Description               | Access           |
|--------|----------------------|-------------------------|------------------|
| POST   | /api/users/register | Creates a new user  | Public      |
| GET    | /api/users   | Lists all users | ADMIN    |   
| GET    | /api/users/{id}     | User search by ID   | Self or ADMIN    |
| PUT    | /api/users/{id}      | Updates user data | Own or ADMIN |
| DELETE | /api/users/{id}      | Remove user          | Own or ADMIN |
 ### 📝 Checklists | Method | Endpoint             | Description               | Access           |
|--------|----------------------|-------------------------|------------------|
|GET	 | /api/checklist/all   | Lists all checklists    | ADMIN    |
|GET	|/api/checklist/myLists |	Logged-in user checklists	|Own|
|GET	|/api/checklist/myLists/{id}|	Search checklist by ID|Self|
|POST|	/api/checklist/myLists|	Create a new checklist	|Own |
|PATCH|	/api/checklist/myLists/{id}|	Updates existing checklist |	Own|
|DELETE	|/api/checklist/myLists/{id}|	Remove checklist|	Own|
 ## Business 🧠 Logic
 - Each user (UserModel) can have multiple checklists (CheckListModel)
 - Each checklist contains a list of items (ItemModel). ### Relationships follow:
 - UserModel 1:N CheckListModel
 - CheckListModel 1:N ItemModel
 Using CascadeType.ALL and orphanRemoval = true ensures that items are removed along with your main checklist. ## 🧰 How to Run the Project Locally
#### Prerequisites
 - Java 21+
 - Maven 3+
 - Docker (optional for container)
 ### Steps
```
# Clone the repository
git clone https://github.com/seu-usuario/checklist-api.git
cd checklist-api
 # Install dependencies
mvn clean install
 # Run the project
mvn spring-boot:run
 ```
#### or by docker
```
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
 ## 📚 Final Considerations This project was developed with a focus on demonstrating technical mastery, good practices and code structuring. Even though it is a simple application, it was purposely built with a complete and scalable architecture, showing knowledge in Spring Boot, JPA, security, DTOs and Docker integration.