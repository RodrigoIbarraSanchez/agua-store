# 🌊 Agua Store Application

Bienvenido a Agua Store, una aplicación completa para la gestión de pedidos de agua. Este proyecto está compuesto por un backend en Node.js y un frontend móvil desarrollado con React Native.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración del Backend](#configuración-del-backend)
- [Configuración del Frontend](#configuración-del-frontend)
- [Ejecución del Proyecto](#ejecución-del-proyecto)

## 🛠 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- npm o yarn
- MongoDB
- Expo CLI (para la aplicación móvil)

## ⚙️ Configuración del Backend

1. Navega al directorio del backend:
   ```bash
   cd agua_store_backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env.copy` a `.env`:
     ```bash
     cp .env.copy .env
     ```
   - Edita el archivo `.env` con tus configuraciones:
     ```
     PORT=3000
     MONGODB_URI=tu_url_de_mongodb
     ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000`

## 📱 Configuración del Frontend

1. Navega al directorio de la aplicación:
   ```bash
   cd agua_store_app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```

4. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o utiliza un emulador.

## 🚀 Ejecución del Proyecto

### Backend
- El servidor se ejecuta en el puerto 3000 por defecto
- Asegúrate de que MongoDB esté en ejecución
- Los endpoints de la API estarán disponibles en `http://localhost:3000/api`

### Frontend
- La aplicación se puede ejecutar en modo desarrollo usando Expo
- Puedes usar un dispositivo físico o un emulador
- La aplicación se conectará automáticamente al backend

## 📝 Notas Adicionales

- Asegúrate de que el backend esté en ejecución antes de iniciar la aplicación móvil
- Para desarrollo local, verifica que tu dispositivo móvil esté en la misma red que el servidor
- Revisa la consola para mensajes de error o información adicional

## 🤝 Contribución

Si deseas contribuir al proyecto:

1. Haz un Fork del repositorio
2. Crea una nueva rama para tus cambios
3. Envía un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.