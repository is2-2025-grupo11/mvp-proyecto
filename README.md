# COMUARENAL - MVP

## Descripcion del Proyecto

Landing page y catalogo de productos para **COMUARENAL** (Cooperativa Multiactiva de Arenal), una cooperativa dedicada a la elaboracion y comercializacion de productos derivados de frutas como ajies, encurtidos, mermeladas y salsas artesanales.

Este MVP incluye:
- Pagina informativa con seccion hero, problema que resuelve, caracteristicas y audiencia objetivo
- Catalogo de productos dinamico conectado a MongoDB
- Filtrado de productos por categoria
- Diseno responsivo con paleta de colores corporativos (verde y blanco)

---

## Integrantes del Grupo

| Nombre | GitHub |
|--------|--------|
| Camilo Andrés Ovalle Quiroz | [Camilo0658] |
| Willinton José Peña Sierra | [willinton18] |
| Reynel Hernández Sapuana | [REYNEL07] |


---

## Tecnologias Usadas (Stack)

### Frontend
- **Next.js 15** - Framework de React para aplicaciones web
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estatico para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI accesibles y personalizables

### Backend
- **Next.js API Routes** - Endpoints API integrados en Next.js
- **Mongoose** - ODM para MongoDB

### Base de Datos
- **MongoDB** - Base de datos NoSQL

### Herramientas de Desarrollo
- **pnpm** - Gestor de paquetes
- **ESLint** - Linter para JavaScript/TypeScript
- **v0 by Vercel** - Asistente de IA para desarrollo

---

## Instrucciones para Correr el Proyecto Localmente

### Prerequisitos

1. **Node.js** (version 18 o superior)
2. **pnpm** (gestor de paquetes)
3. **MongoDB** (instalado y corriendo localmente)

### Pasos de Instalacion

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/is2-2025-grupo11/mvp-proyecto
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env.local` en la raiz del proyecto:
   ```env
   MONGODB_URI=mongodb://localhost:27017/comuarenal
   ```

4. **Iniciar MongoDB**
   
   Asegurate de que MongoDB este corriendo en tu maquina local:
   ```bash
   # En Linux/Mac
   mongod
   
   # O usando MongoDB Compass conectado a localhost:27017
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

6. **Abrir en el navegador**
   
   Visita [http://localhost:3000](http://localhost:3000)

7. **Cargar productos de prueba**
   
   Ve a la pagina de productos ([http://localhost:3000/productos](http://localhost:3000/productos)) y haz clic en "Cargar Productos de Prueba" para sembrar la base de datos con productos iniciales.

---

## Estructura del Proyecto

```
mvp-proyecto/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts          # GET y POST de productos
│   │       └── seed/
│   │           └── route.ts      # Seed de productos de prueba
│   ├── productos/
│   │   └── page.tsx              # Pagina del catalogo
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # Componentes shadcn/ui
│   ├── header.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── problem.tsx
│   ├── features.tsx
│   ├── audience.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── lib/
│   └── mongodb.ts                # Conexion a MongoDB
├── models/
│   └── Product.ts                # Modelo de Producto
├── public/
│   └── images/
│       └── logo.png              # Logo de COMUARENAL
├── docs/
│   └── requisitos.md             # Documentacion de requisitos
├── .env.local                    # Variables de entorno (no commitear)
├── .gitignore
├── package.json
└── README.md
```

---

## Estado Actual del MVP

### Funcionalidades Completadas

- [x] Landing page informativa con todas las secciones requeridas
- [x] Navegacion responsiva con menu hamburguesa para moviles
- [x] Pagina de catalogo independiente
- [x] Conexion a MongoDB
- [x] API REST para productos (GET, POST)
- [x] Filtrado de productos por categoria
- [x] Seed de productos de prueba
- [x] Diseno responsivo (mobile-first)
- [x] Paleta de colores corporativos

### Funcionalidades Pendientes (Proximas Iteraciones)

- [ ] Sistema de carrito de compras
- [ ] Panel de administracion para gestionar productos
- [ ] Integracion con pasarela de pagos
- [ ] Sistema de pedidos
- [ ] Notificaciones por email

---

## API Endpoints

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products?category=ajies` | Filtrar por categoria |
| POST | `/api/products` | Crear nuevo producto |
| POST | `/api/products/seed` | Cargar productos de prueba |

---

## Licencia

Este proyecto fue desarrollado como parte de una actividad academica.

&copy; 2026 COMUARENAL - Cooperativa Multiactiva de Arenal
