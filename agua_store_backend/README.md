# Agua Store Backend

## Descripción
Backend API para una tienda de agua, desarrollada con Node.js, Express y MongoDB.

## Requisitos Previos
- Node.js (versión 14 o superior)
- MongoDB Atlas (cuenta gratuita)
- npm o yarn

## Configuración de MongoDB Atlas

1. **Crear una cuenta en MongoDB Atlas:**
   - Visita [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Haz clic en "Try Free"
   - Completa el formulario de registro
   - Verifica tu correo electrónico

2. **Crear un nuevo cluster:**
   - Inicia sesión en MongoDB Atlas
   - Haz clic en "Build a Database"
   - Selecciona el plan gratuito (Shared)
   - Elige un proveedor de nube y región (preferiblemente la más cercana a tu ubicación)
   - Haz clic en "Create Cluster"

3. **Configurar acceso a la base de datos:**
   - En el menú de la izquierda, ve a "Security" > "Database Access"
   - Haz clic en "Add New Database User"
   - Crea un usuario y contraseña (guárdalos en un lugar seguro)
   - Selecciona los privilegios de usuario (Read and Write)

4. **Configurar acceso de red:**
   - Ve a "Security" > "Network Access"
   - Haz clic en "Add IP Address"
   - Para desarrollo, puedes usar "Allow Access from Anywhere" (0.0.0.0/0)
   - Para producción, asegúrate de agregar solo las IPs específicas

5. **Obtener la cadena de conexión:**
   - Ve a "Databases" > "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión (URI)
   - Reemplaza <password> con la contraseña del usuario que creaste

## Instalación del Proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd agua_store_backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
     ```
     PORT=3000
     MONGODB_URI=tu_uri_de_mongodb_atlas
     ```
   - Reemplaza `tu_uri_de_mongodb_atlas` con la URI que obtuviste de MongoDB Atlas

## Ejecutar el Proyecto

1. **Modo desarrollo (con hot-reload):**
   ```bash
   npm run dev
   ```

2. **Modo producción:**
   ```bash
   npm start
   ```

## Estructura del Proyecto
```
├── src/
│   ├── index.js          # Punto de entrada de la aplicación
│   ├── models/           # Modelos de MongoDB
│   │   └── product.model.js
│   └── routes/           # Rutas de la API
│       └── product.routes.js
├── .env                  # Variables de entorno
└── package.json         # Dependencias y scripts
```

## API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

### Ejemplo de Producto (JSON)
```json
{
  "name": "Garrafa 20L",
  "description": "Garrafa de agua purificada de 20 litros",
  "price": 25.00,
  "stock": 100,
  "category": "garrafa"
}
```

## Pruebas de la API

Puedes probar los endpoints usando herramientas como:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensión de VS Code)

### Ejemplo de prueba con cURL
```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Crear un nuevo producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Garrafa 20L","description":"Garrafa de agua purificada","price":25.00,"stock":100,"category":"garrafa"}'
```

## Solución de Problemas Comunes

1. **Error de conexión a MongoDB:**
   - Verifica que la URI de MongoDB sea correcta
   - Asegúrate de que tu IP esté en la lista blanca de MongoDB Atlas
   - Comprueba que el usuario y contraseña sean correctos

2. **El servidor no inicia:**
   - Verifica que el puerto 3000 no esté en uso
   - Comprueba que todas las dependencias estén instaladas
   - Asegúrate de que el archivo .env esté configurado correctamente

## Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.