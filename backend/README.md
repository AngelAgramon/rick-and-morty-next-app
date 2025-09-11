# Rick and Morty Backend API

Backend API desarrollado con NestJS para la aplicación Rick and Morty.

## 🚀 Características

- **Autenticación JWT**: Login/logout con tokens seguros
- **API de Personajes**: Proxy a la API oficial de Rick and Morty
- **CORS habilitado**: Para comunicación con el frontend
- **Validación de datos**: Con class-validator
- **Guards de seguridad**: Protección de rutas

## 📋 Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil del usuario
- `POST /auth/validate` - Validar token

### Personajes
- `GET /characters` - Obtener todos los personajes
- `GET /characters?page=1` - Obtener personajes por página
- `GET /characters/search?name=Rick` - Buscar personajes por nombre
- `GET /characters/:id` - Obtener personaje por ID

## 🔐 Credenciales de Prueba

- **Usuario**: `user` / **Contraseña**: `password`
- **Usuario**: `admin` / **Contraseña**: `admin123`

## 🛠️ Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Ejecutar en modo producción
npm run build
npm run start:prod
```

## 🌐 Configuración

- **Puerto**: 3001 (configurable con variable de entorno PORT)
- **CORS**: Habilitado para localhost:3000 y localhost:5173
- **JWT Secret**: 'rick-and-morty-secret-key' (cambiar en producción)

## 📁 Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── guards/          # Guards de seguridad
│   ├── strategies/      # Estrategias de Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── characters/          # Módulo de personajes
│   ├── characters.controller.ts
│   ├── characters.service.ts
│   └── characters.module.ts
├── app.module.ts        # Módulo principal
└── main.ts             # Punto de entrada
```