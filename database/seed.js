// Script para poblar la base de datos MongoDB con productos de prueba
// Ejecutar con: node database/seed.js (requiere ts-node o compilar primero)

const products = [
  // Ajies
  {
    name: "Aji Picante Tradicional",
    description: "Aji picante elaborado con receta tradicional de la region",
    price: 8500,
    category: "ajies",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Aji Dulce Casero",
    description: "Aji dulce perfecto para acompanar cualquier comida",
    price: 7500,
    category: "ajies",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Aji Habanero",
    description: "Para los amantes del picante extremo",
    price: 9500,
    category: "ajies",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Aji Chimichurri",
    description: "Mezcla perfecta de aji con hierbas aromaticas",
    price: 10000,
    category: "ajies",
    image: "/placeholder.svg",
    inStock: true,
  },
  // Encurtidos
  {
    name: "Encurtido Mixto",
    description: "Variedad de vegetales encurtidos en vinagre artesanal",
    price: 12000,
    category: "encurtidos",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Pepinillos Encurtidos",
    description: "Pepinillos crujientes en salmuera especial",
    price: 9000,
    category: "encurtidos",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Cebollas Encurtidas",
    description: "Cebollas rojas en vinagre balsamico",
    price: 8500,
    category: "encurtidos",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Zanahorias Encurtidas",
    description: "Zanahorias baby con especias naturales",
    price: 8000,
    category: "encurtidos",
    image: "/placeholder.svg",
    inStock: true,
  },
  // Mermeladas
  {
    name: "Mermelada de Fresa",
    description: "Elaborada con fresas frescas de la region",
    price: 11000,
    category: "mermeladas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Mermelada de Mora",
    description: "Moras silvestres con un toque de limon",
    price: 11500,
    category: "mermeladas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Mermelada de Mango",
    description: "Dulzura tropical en cada cucharada",
    price: 10500,
    category: "mermeladas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Mermelada de Guayaba",
    description: "Sabor autentico colombiano",
    price: 10000,
    category: "mermeladas",
    image: "/placeholder.svg",
    inStock: true,
  },
  // Salsas
  {
    name: "Salsa BBQ Artesanal",
    description: "Perfecta para carnes a la parrilla",
    price: 13000,
    category: "salsas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Salsa de Tomate Casera",
    description: "Tomates frescos con albahaca y oregano",
    price: 9500,
    category: "salsas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Salsa Criolla",
    description: "Mezcla tradicional de hogao colombiano",
    price: 8500,
    category: "salsas",
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    name: "Salsa de Ajo",
    description: "Ajo fresco con aceite de oliva y perejil",
    price: 10500,
    category: "salsas",
    image: "/placeholder.svg",
    inStock: true,
  },
];

// Para usar con MongoDB shell o mongosh:
// 1. Conectar a MongoDB: mongosh mongodb://localhost:27017/comuarenal
// 2. Ejecutar: db.products.insertMany([...products])

// Exportar para uso en otros scripts
if (typeof module !== 'undefined') {
  module.exports = { products };
}

console.log("Productos para seed:", products.length);
console.log("Ejecuta este script conectado a MongoDB para insertar los productos.");
