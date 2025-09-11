# Estructura MVC - Rick and Morty App

## 📁 Nueva Estructura del Frontend

### 🏗️ Arquitectura MVC Implementada

```
src/app/
├── models/           # Modelos de datos
│   ├── User.ts       # Modelo de usuario y autenticación
│   ├── Character.ts  # Modelo de personajes
│   ├── UI.ts         # Modelo de interfaz de usuario
│   └── index.ts      # Exportaciones de modelos
│
├── views/            # Vistas (Componentes de presentación)
│   ├── LoginView.tsx     # Vista de login
│   ├── CharactersView.tsx # Vista de personajes
│   ├── CharacterCard.tsx  # Tarjeta de personaje
│   ├── CharacterGrid.tsx  # Grid de personajes
│   ├── FavoritesSidebar.tsx # Sidebar de favoritos
│   ├── Layout.tsx         # Layout principal
│   ├── NotificationSystem.tsx # Sistema de notificaciones
│   └── index.ts           # Exportaciones de vistas
│
├── controllers/      # Controladores (Lógica de negocio)
│   ├── AuthController.ts      # Controlador de autenticación
│   ├── CharacterController.ts # Controlador de personajes
│   ├── UIController.ts       # Controlador de UI
│   ├── AppController.ts      # Controlador principal
│   └── index.ts              # Exportaciones de controladores
│
├── services/         # Servicios para consumir el backend
│   ├── AuthService.ts        # Servicio de autenticación
│   ├── CharacterService.ts   # Servicio de personajes
│   └── index.ts              # Exportaciones de servicios
│
└── context/          # Contexto de la aplicación
    └── MVCContext.tsx        # Contexto MVC principal
```

## 🔄 Patrón MVC Implementado

### 📊 Models (Modelos)
- **User.ts**: Define interfaces para usuario, autenticación y credenciales
- **Character.ts**: Define interfaces para personajes, filtros y estado
- **UI.ts**: Define interfaces para notificaciones, tema y estado de UI

### 🎨 Views (Vistas)
- **LoginView**: Componente de presentación para el login
- **CharactersView**: Componente de presentación para la lista de personajes
- **CharacterCard**: Componente para mostrar un personaje individual
- **CharacterGrid**: Componente para mostrar la grilla de personajes
- **FavoritesSidebar**: Componente para mostrar favoritos
- **Layout**: Layout principal de la aplicación
- **NotificationSystem**: Sistema de notificaciones

### 🎮 Controllers (Controladores)
- **AuthController**: Maneja la lógica de autenticación
- **CharacterController**: Maneja la lógica de personajes y favoritos
- **UIController**: Maneja la lógica de interfaz de usuario
- **AppController**: Controlador principal que coordina todos los demás

### 🔌 Services (Servicios)
- **AuthService**: Consume el backend de NestJS para autenticación
- **CharacterService**: Consume el backend de NestJS para personajes

## 🚀 Conexión con Backend NestJS

### Endpoints del Backend
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/validate` - Validar token
- `POST /auth/refresh` - Renovar token
- `GET /characters` - Obtener personajes
- `GET /characters/:id` - Obtener personaje por ID
- `GET /characters/search` - Buscar personajes
- `GET /characters/status/:status` - Filtrar por estado
- `GET /characters/species/:species` - Filtrar por especie
- `GET /characters/filter` - Filtrar con múltiples parámetros

### Configuración de Servicios
- Base URL: `http://localhost:3001`
- Interceptores para manejo de tokens JWT
- Manejo automático de errores 401 (redirección a login)
- Headers de autorización automáticos

## 🎯 Beneficios de la Nueva Estructura

### ✅ Separación de Responsabilidades
- **Models**: Solo definen la estructura de datos
- **Views**: Solo se encargan de la presentación
- **Controllers**: Solo manejan la lógica de negocio
- **Services**: Solo se encargan de la comunicación con el backend

### ✅ Mantenibilidad
- Código más organizado y fácil de mantener
- Fácil localización de funcionalidades específicas
- Estructura escalable para futuras funcionalidades

### ✅ Testabilidad
- Cada capa puede ser probada independientemente
- Controllers pueden ser mockeados fácilmente
- Services pueden ser probados con datos simulados

### ✅ Reutilización
- Controllers pueden ser reutilizados en diferentes vistas
- Services pueden ser reutilizados en diferentes controladores
- Models pueden ser reutilizados en toda la aplicación

## 🔧 Uso del Patrón MVC

### En las Vistas
```tsx
import { useMVC } from '../context/MVCContext';

const MyView = () => {
  const { auth, character, ui } = useMVC();
  
  // Usar los controladores para manejar la lógica
  const handleLogin = async (credentials) => {
    await auth.login(credentials);
  };
  
  return (
    // JSX de la vista
  );
};
```

### En los Controladores
```tsx
export class MyController {
  private service: MyService;
  private state: MyState;

  constructor() {
    this.service = new MyService();
    this.state = { /* estado inicial */ };
  }

  async performAction() {
    // Lógica de negocio
    const result = await this.service.fetchData();
    this.setState({ data: result });
  }
}
```

### En los Servicios
```tsx
export class MyService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3001',
    });
  }

  async fetchData() {
    const response = await this.apiClient.get('/endpoint');
    return response.data;
  }
}
```

## 🎉 Resultado Final

La aplicación ahora sigue un patrón MVC limpio y está lista para consumir el backend de NestJS. La separación de responsabilidades hace que el código sea más mantenible, testeable y escalable.
