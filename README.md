# 📌 Backend - SocialLynks : todos tus enlaces en un solo lugar

**#Demo** : https://socialynks.vercel.app/

Este es el backend de la aplicación de gestion de enlaces de redes sociales.
Está construido con **Node.js, Express y MongoDB** y utilizando **TypeScript** para un código más seguro y mantenible.

## 🚀 Dependencias Utilizadas


* `Node.js` - Entorno de ejecución para JavaScript en el servidor.
* `Express.js` - Framework para construir la API de manera eficiente.
* `MongoDB` - Base de datos NoSQL para almacenar la información.
* `Mongoose` - ODM para interactuar con MongoDB usando modelos de datos.
* `TypeScript` - Tipado estático para mejorar la seguridad y calidad del código.
* `JSON Web Token (JWT)` - Autenticación segura con tokens.
* `bcrypt` - Para el hashing seguro de contraseñas.
* `cloudinary` - Para la gestión de imágenes y archivos en la nube.
* `cors` - Middleware para habilitar CORS.
* `dotenv` - Carga variables de entorno desde un archivo `.env`.
* `express-validator` - Para la validación de datos de entrada.
* `formidable` - Para el manejo de formularios con subida de archivos.
* `slug` y `slugify` - Para generar slugs (URLs amigables).
* `uuid` - Para generar identificadores únicos.

## Variables de Entorno
```
Aquí hay un ejemplo de las variables que debes configurar:
MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<tu_base_de_datos>
FRONTEND_URL=http://localhost:5173
JWT_SECRET=secretword
CLOUDINARY_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```
## 📂 Estructura del Proyecto

```
backend/
├── dist/       # JS compilado
├── node_modules/ # Dependencias
├── src/        # Código TypeScript
│   ├── config/   # Configuración
│   ├── handlers/ # Controladores
│   ├── middleware/ # Middleware
│   ├── models/   # Modelos
│   └── utils/    # Utilidades
├── router.ts   # Rutas
├── server.ts   # Servidor
├── .env        # Variables
├── package*.json # Dependencias, scripts
└── tsconfig.json # Configuración TS
```

## 🛠 Instalación y Configuración

1. Clona el repositorio:
   ```sh
    git clone https://github.com/wilyramos/socialynks_express_backend.git
    cd backend
    npm install
    npm run dev

## ✅ Scripts Disponibles

- `npm run dev` → Ejecuta el servidor en modo desarrollo con Nodemon
- `npm run build` → Compila el proyecto TypeScript a JavaScript
- `npm start` → Ejecuta la versión compilada en producción

Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.

---

📌 **¡Contribuye!** Si tienes mejoras o encuentras errores, abre un issue o haz un pull request. 😊
