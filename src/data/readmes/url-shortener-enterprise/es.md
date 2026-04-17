# acortador de URL 
 Es mi opinión sobre el **por qué** y las **decisiones que he tomado** para que el acortador funcione a una escala muy alta, 24/7, durante 10 años, con URL extremadamente cortas. ---
 ## 🎯 Propósito del sistema
Cree un acortador de URL que funcione sin interrupciones, capaz de manejar **100 millones de nuevas URL por día**, y que mantenga todo guardado durante **10 años**, sin perder rendimiento, sin generar colisiones y manteniendo las URL cortas. ---
 ## 🧠 Decisiones clave
 ### 1. **Juego de caracteres: Base62 (0–9, a–z, A–Z)**
Decidí usar Base62 porque es el conjunto más compacto posible que sigue siendo universalmente compatible y no causa problemas en ningún navegador. Esto también maximiza el espacio de combinación. ### 2. **Tamaño del shortcode: 7 caracteres**
No elegí 7 por nada. Con 100 MILLONES de URL nuevas por día durante 10 años, tendremos **365 mil millones de códigos**. - 62^6 no lo soporta. - 62^7 puede prescindir de él, así que esa fue la elección natural. Decisión: Longitud variable a partir de 5 caracteres subiendo hasta 7; ya que les impide “patear las urls”. ### 3. **Base de datos: Cassandra / ScyllaDB**
Elegí a Cassandra porque:
- escala horizontal prácticamente infinita;
- escritura barata y distribuida (y tendremos MUCHA escritura);
- lectura rápida cuando se combina con caché;
- tolerancia A fallos absurdos. Postgres fragmentado sería posible, pero mucho más caro y frágil para el tráfico esperado. ### 4. ** Caché de lectura pesada: Redis + CDN**
Como la relación es **1 registro para 10 lecturas**, es obvio que:
- No podemos ir al banco por cada get. - La CDN debe responder a la mayoría de las redirecciones. - Redis entra como caché caliente para los fallos. ### 5. **Almacenamiento durante 10 años**
Los datos brutos totales alcanzan fácilmente por encima de **100 TB**. Por lo tanto, la decisión fue:
- los datos recientes están en el banco principal;
- los datos antiguos se almacenan en frío, pero sin perder la capacidad de restaurarlos cuando sea necesario. ### 6. **API simple y directa**
Punto final principal: `POST /api/v1/shortten`. No hay problema. Recibe una URL, valida y devuelve el shortcode. ### 7. **Validación: máximo 100 bytes**
Decidí imponer este límite porque:
- evita la carga útil gigante;
- mantiene el sistema predecible;
- ayuda con el almacenamiento y la indexación. ### 8. **Póliza TTL: 10 años fijos**
El sistema acepta TTL más pequeños pero nunca más grandes. Esto garantiza la coherencia y le permite controlar el ciclo de vida de los datos. ### 9. **Generación de código: Contador distribuido + Base62**
Nada aleatorio. El aleatorio es fácil, pero genera colisiones y requiere bloqueo o comprobación. Me decidí por algo determinista:
- contador global shardeado;
- conversión a Base62;
- prefijo implícito por trabajador, si es necesario. Resultado: generación estable, sin colisiones y con un rendimiento absurdo. ### 10. **Observabilidad obligatoria**
He decidido que el sistema solo es aceptable si tiene:
- registros estructurados;
- métricas de latencia y tasa de error;
- Alertas de tráfico anómalas;
- rastreo distribuido. Sin él, no se puede operar algo que funcione las 24 horas del día, los 7 días de la semana. ## 🔐 Decisiones de seguridad
 ### 🔒 Cómo se implementará cada protección
 #### **1. Límite de tarifa distribuida (protección contra inundaciones)**
Decisión: usar **Token Bucket distribuido en Redis**. - Cada IP recibe un “bucket” con X peticiones por segundo. - Con cada acortamiento, el sistema intenta consumir 1 token. - Si el cubo está vacío → `429 Too Many Requests`. - Redis garantiza las operaciones atómicas y trabaja en clústeres. **Protege contra:** bots, automatización agresiva y generación masiva de URLs. ---
 #### **2. Filtra las URL maliciosas (antiphishing y antimalware)**
Tubería de validación multicapa:
1. Expresión regular básica para validar el formato. 2. Bloqueo de esquemas peligrosos: `javascript:`, `data:`, `file:`. 3. Verificación de dominios sospechosos (blocklist). 4. Integración con APIs de seguridad (Google Safe Browsing / Cloudflare Security). 5. Normalización de la URL (eliminar unicode invisible, espacios, caracteres sospechosos). **Protege contra:** malware, phishing, estafas y explotación a través de enlaces. El único problema sigue siendo el usuario ".
 #### **3. Bloqueo automático de patrones sospechosos (detección de abusos)**
Sistema heurístico + reglas automáticas:
- explosión repentina de solicitudes por parte de IP;
- Se crean URLs muy similares a granel (indicador de automatización);
- parámetros ofuscados o patrones de spam;
- repetición de URL para dominios con mala reputación. Acciones automáticas:
- bloqueo temporal de IP;
- aumento del límite de tarifa para el delincuente (prohibición progresiva);
- marcar el dominio como sospechoso;
- requisito de captcha;
- alerta enviada para observabilidad. **Protege contra:** spam, abuso automatizado, ataques, explotación de acortadores. ---
- límite de velocidad: no puede disparar millones de mantecas por minuto;
- filtrar contra URL maliciosas;
- bloqueo automático de patrones sospechosos. Un sistema robusto requiere protección contra el abuso ".
 ## 🌐 Decisión de enrutamiento: CDN al frente siempre
GET /{code} nunca debe golpear el backend directamente. Decisión: cada resolución pasa por CDN (Cloudflare, AWS CloudFront o similar). ---
 ## 🛠 ¿Por qué Java + Spring? - fiable;
- estable bajo carga extrema;
- fácil de escalar;
- ecosistema maduro para la observabilidad y la seguridad. Con el tráfico esperado, Node/Express o Python/Django sufrirían mucho más. --- ## 🚀 Resumen de la visión final
Este acortador no es un "pequeño proyecto". Está diseñado para durar **10 años**, con **cientos de miles de millones** de registros, ejecutándose **sin fallos** y respondiendo en **milisegundos**. Todo aquí se decidió con un enfoque en:
- escala;
- disponibilidad;
- bajo coste por operación;
- simplicidad operativa;
- robustez.