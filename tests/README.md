# Pruebas de Software - COMUARENAL

## Estructura de Pruebas

```
tests/
├── setup.ts                    # Configuracion global de Vitest
├── unit/                       # Pruebas unitarias
│   ├── product-model.test.ts   # Validaciones del modelo Product
│   └── format-price.test.ts    # Funcion de formateo de precios
├── integration/                # Pruebas de integracion
│   ├── api-get-products.test.ts    # API GET /api/products
│   └── api-post-products.test.ts   # API POST /api/products
└── e2e/                        # Pruebas End-to-End
    ├── catalog-flow.spec.ts    # Flujo del catalogo y filtrado
    └── navigation.spec.ts      # Navegacion de la aplicacion
```

## Comandos de Ejecucion

```bash
# Ejecutar todas las pruebas unitarias e integracion (modo watch)
pnpm test

# Ejecutar solo pruebas unitarias
pnpm test:unit

# Ejecutar solo pruebas de integracion
pnpm test:integration

# Ejecutar pruebas E2E (requiere que la app este corriendo)
pnpm test:e2e

# Ejecutar pruebas E2E con interfaz visual
pnpm test:e2e:ui

# Ejecutar todas las pruebas
pnpm test:all
```

## Requisitos Previos

### Para pruebas unitarias e integracion:
- Node.js 18+
- Las dependencias se instalan automaticamente con `pnpm install`

### Para pruebas E2E:
```bash
# Instalar navegadores de Playwright (solo la primera vez)
pnpm exec playwright install
```

## Justificacion de las Pruebas

### Pruebas Unitarias

| Prueba | Archivo | Justificacion |
|--------|---------|---------------|
| Validaciones del Modelo Product | `product-model.test.ts` | El modelo define la estructura de datos del negocio. Validaciones incorrectas podrian corromper la BD. |
| Funcion formatPrice | `format-price.test.ts` | El formateo de precios es critico para la UX. Precios mal mostrados confunden a los clientes. |

### Pruebas de Integracion

| Prueba | Archivo | Justificacion |
|--------|---------|---------------|
| API GET /api/products | `api-get-products.test.ts` | Este endpoint alimenta todo el catalogo. Si falla, los usuarios no ven productos. |
| API POST /api/products | `api-post-products.test.ts` | Permite agregar productos. Datos invalidos podrian corromper la BD. |

### Pruebas E2E

| Prueba | Archivo | Justificacion |
|--------|---------|---------------|
| Flujo de Catalogo | `catalog-flow.spec.ts` | Prueba la experiencia completa de navegacion del catalogo y filtrado por categorias. |
| Navegacion | `navigation.spec.ts` | Verifica que los enlaces funcionan y la app es responsive. |

## Respuestas a Preguntas de Sustentacion

### 1. Por que eligieron esas pruebas y no otras?

Elegimos pruebas que cubren las **funcionalidades criticas del negocio**:
- El modelo Product es la base de datos principal
- La API de productos es el punto de entrada para todo el catalogo
- El flujo de catalogo es lo que los usuarios utilizan diariamente

### 2. Que riesgo cubre cada prueba?

- **Unitarias**: Integridad de datos y formateo correcto de precios
- **Integracion**: Funcionamiento correcto de la API con la base de datos
- **E2E**: Experiencia del usuario funciona de principio a fin

### 3. Por que es unitaria y no de integracion?

- **Unitarias**: Prueban logica aislada (validaciones, funciones puras) sin dependencias externas
- **Integracion**: Prueban componentes trabajando juntos (API + MongoDB)
- **E2E**: Prueban el sistema completo desde el navegador

### 4. Que descubrieron al escribirlas?

- Las validaciones de Mongoose son declarativas y faciles de probar
- El formato de precios colombiano usa punto como separador de miles
- El estado de carga debe manejarse correctamente en la UI
- El menu mobile requiere pruebas especificas de viewport

### 5. Como las ejecutan?

Los comandos estan documentados arriba. El flujo recomendado es:
1. `pnpm test` para desarrollo (modo watch)
2. `pnpm test:all` antes de hacer commit
