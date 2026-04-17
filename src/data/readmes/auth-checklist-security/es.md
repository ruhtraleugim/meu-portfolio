# 🧾 CheckList API
 > **Proyecto diseñado para demostrar conocimientos avanzados en arquitectura y desarrollo de back-end con Spring Boot.**  
> Aunque la propuesta (un sistema de listas de verificación) es simple, la implementación se realizó con ** mejores prácticas, seguridad y estructura de nivel profesional**, para ejemplificar el dominio de las principales herramientas del ecosistema Java moderno. ---
 ## 🚀 Tecnologías utilizadas - **Java 21**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA**
- ** Persistencia de Yakarta **
- **Lombok**
- **BCrypt** (para el cifrado de contraseñas)
- **H2 / PostgreSQL** (base de datos configurable)
- **Maven**
- **Docker**
 ---
 ## 🐳 Docker
 Este proyecto cuenta con una configuración para su ejecución en un contenedor Docker, facilitando la implementación y estandarización del entorno. ### Cómo ejecutar Docker
 1. Asegúrese de tener [Docker](https://www.docker.com/get-started) instalado y en funcionamiento. 2. En la raíz del proyecto, ejecute:
 ```bash
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
3. La aplicación estará disponible en: http://localhost:8080
 También puede configurar un banco PostgreSQL a través de Docker y vincular los contenedores ajustando las variables de entorno. src/main/java/com/DesafioTec/CheckList
 │ ├── ajustes generales (seguridad, frijoles, etc.)
 │   └── SecurityConfig.java
 │
 ├── controlador/REST Controladores (capa API)
 │   ├── checklist/ChecklistController.java
 │   └── UserController.java
 │
 ├── dto/ Objetos de transferencia de datos (DTO)
 │
 entidades ├── modelo/JPA (mapeo bancario)
 │   ├── list/ CheckListModel y ItemModel
 │   └── user/ UserModel (implementa UserDetails)
 │ ├── repositorio/ Repositorios JPA (acceso bancario)
 │
 capa de reglas de └── servicio/negocio
 ├── checkList/CheckListService.java
 └── user/UserService.java
 ## 🔐 Autenticación y autorización
 La aplicación utiliza Spring Security con inyección de usuario autenticada a través de @AuthenticationPrincipal. Cada punto de conexión sensible valida que el usuario que realiza la solicitud es en realidad el propietario del recurso antes de permitir actualizaciones o eliminaciones. Las contraseñas están cifradas con BCrypt en el momento del registro. Ejemplo:
```Java
 if (!existing.getUser().getUserId().equals(user.getUserId())) {
 return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
}
 ```
 ## 📚 Criterios de valoración clave
### 👤 Usuarios | Método | Punto final             | Descripción               | Acceso           |
|--------|----------------------|-------------------------|------------------|
| POST   | /api/users/register | Crea un nuevo usuario  | Público      |
| GET    | /api/users   | Enumera todos los usuarios | ADMIN    |   
| GET    | /api/users/{id}     | Búsqueda de usuarios por ID   | Auto o ADMINISTRADOR    |
| PUT    | /api/users/{id}      | Actualiza los datos del usuario | Propio o ADMINISTRADOR |
| ELIMINAR | /api/users/{id}      | Eliminar usuario          | Propio o ADMINISTRADOR |
 # ## 📝 Listas de verificación | Método | Punto final             | Descripción               | Acceso           |
|--------|----------------------|-------------------------|------------------|
|GET	 | /api/checklist/all   | Enumera todas las listas de verificación    | ADMIN    |
|GET	|/api/checklist/myLists| Listas	de verificación de usuarios conectados	|Propio|
|GET	|/api/checklist/myLists/{id}|	Buscar lista de verificación por ID|Self|
|POST|	/api/checklist/myLists |	Crear una nueva lista de verificación	|Propio |
|PATCH|	/api/checklist/myLists/{id}|	Actualizaciones lista de verificación existente|	Propio|
|DELETE	|/api/checklist/myLists/{id}|	Remove checklist|	Own|
 ## 🧠 Lógica de negocios
 - Cada usuario (UserModel) puede tener varias listas de verificación (CheckListModel)
 - Cada lista de verificación contiene una lista de elementos (ItemModel). ### Las relaciones siguen:
 - UserModel 1:N CheckListModel
 - CheckListModel 1:N ItemModel
 El uso de CascadeType.ALL y orphanRemoval = true garantiza que los elementos se eliminen junto con su lista de verificación principal. ## 🧰 Cómo ejecutar el proyecto localmente
## ## Requisitos previos
 - Java 21+
 - Maven 3+
 - Docker (opcional para contenedor)
 ### Pasos
```
# Clonar el repositorio
git clone https://github.com/seu-usuario/checklist-api.git
cd checklist-api
 # Instalar dependencias
instalación limpia de mvn
 # Ejecutar el proyecto
mvn spring-boot:run
 ```
#### o por docker
```
docker build -t checklist-api . docker run -p 8080:8080 checklist-api
```
 ## 📚 Consideraciones finales Este proyecto se desarrolló con un enfoque en demostrar el dominio técnico, las buenas prácticas y la estructuración del código. Aunque es una aplicación simple, fue construida a propósito con una arquitectura completa y escalable, mostrando conocimiento en Spring Boot, JPA, seguridad, DTOs e integración de Docker.