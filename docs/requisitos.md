# Requisitos del Proyecto - COMUARENAL MVP

## Descripcion General

Desarrollo de una landing page para COMUARENAL, una cooperativa multiactiva dedicada a la produccion y venta de productos derivados de frutas.

## Requisitos Funcionales

### RF001 - Pagina Informativa
- La pagina principal debe mostrar informacion sobre la cooperativa
- Debe incluir seccion hero con el nombre y logo
- Debe explicar el problema que resuelve
- Debe mostrar las caracteristicas principales de los productos
- Debe identificar la audiencia objetivo

### RF002 - Catalogo de Productos
- Los productos deben mostrarse en una pagina independiente
- El catalogo debe mostrar productos en grid de 4 columnas
- Debe permitir filtrar por categoria (ajies, encurtidos, mermeladas, salsas)
- Cada producto debe mostrar: nombre, descripcion, precio e imagen

### RF003 - Base de Datos
- Los productos deben almacenarse en MongoDB
- Debe existir un endpoint API para consultar productos
- Debe existir un mecanismo para cargar productos de prueba

### RF004 - Navegacion
- La navegacion debe ser fluida entre pagina informativa y catalogo
- El diseno debe ser responsivo para dispositivos moviles

## Requisitos No Funcionales

### RNF001 - Tecnologias
- Frontend: React con Next.js
- Base de datos: MongoDB
- Estilos: Tailwind CSS

### RNF002 - Rendimiento
- La pagina debe cargar en menos de 3 segundos
- Las imagenes deben estar optimizadas

### RNF003 - Usabilidad
- Interfaz intuitiva y facil de navegar
- Paleta de colores corporativos (verde y blanco)

## Categorias de Productos

1. **Ajies** - Productos picantes y salsas de aji
2. **Encurtidos** - Vegetales en vinagre
3. **Mermeladas** - Conservas dulces de frutas
4. **Salsas** - Salsas para acompanar comidas

## Modelo de Datos

### Producto
```javascript
{
  name: String,        // Nombre del producto
  description: String, // Descripcion
  price: Number,       // Precio en COP
  category: String,    // ajies | encurtidos | mermeladas | salsas
  image: String,       // URL de la imagen
  inStock: Boolean,    // Disponibilidad
  createdAt: Date,     // Fecha de creacion
  updatedAt: Date      // Fecha de actualizacion
}
```
