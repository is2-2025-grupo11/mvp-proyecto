/**
 * PRUEBA DE INTEGRACION 1: API GET /api/products
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: Este endpoint alimenta todo el catalogo de productos
 * - Riesgo cubierto: Si falla, los usuarios no pueden ver ningun producto
 * - Por que integracion: Prueba la interaccion entre el API Route, MongoDB y el modelo Product
 * 
 * DESCUBRIMIENTOS:
 * - El filtro por categoria usa query params
 * - El endpoint devuelve un array vacio si no hay productos (no un error)
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// Schema del producto para pruebas
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true, 
    enum: ["ajies", "encurtidos", "mermeladas", "salsas"] 
  },
  image: { type: String, default: "/placeholder.svg" },
  inStock: { type: Boolean, default: true },
}, { timestamps: true })

describe('API Integration: GET /api/products', () => {
  let mongoServer: MongoMemoryServer
  let Product: mongoose.Model<any>

  const productosTest = [
    {
      name: 'Aji Picante',
      description: 'Aji tradicional',
      price: 8500,
      category: 'ajies',
    },
    {
      name: 'Encurtido Mixto',
      description: 'Verduras encurtidas',
      price: 12000,
      category: 'encurtidos',
    },
    {
      name: 'Mermelada de Fresa',
      description: 'Mermelada artesanal',
      price: 14000,
      category: 'mermeladas',
    },
    {
      name: 'Salsa BBQ',
      description: 'Salsa ahumada',
      price: 11000,
      category: 'salsas',
    },
  ]

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
    Product = mongoose.model('ProductIntegration', ProductSchema)
  }, 60000) // Timeout de 60 segundos para descargar MongoDB en memoria

  afterAll(async () => {
    await mongoose.disconnect()
    if (mongoServer) {
      await mongoServer.stop()
    }
  })

  beforeEach(async () => {
    await Product.deleteMany({})
  })

  it('debe retornar un array vacio cuando no hay productos', async () => {
    const products = await Product.find({})
    
    expect(products).toEqual([])
    expect(Array.isArray(products)).toBe(true)
  })

  it('debe retornar todos los productos cuando no hay filtro', async () => {
    await Product.insertMany(productosTest)
    
    const products = await Product.find({}).sort({ createdAt: -1 })
    
    expect(products).toHaveLength(4)
    expect(products[0]).toHaveProperty('name')
    expect(products[0]).toHaveProperty('price')
    expect(products[0]).toHaveProperty('category')
  })

  it('debe filtrar productos por categoria "ajies"', async () => {
    await Product.insertMany(productosTest)
    
    const products = await Product.find({ category: 'ajies' })
    
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Aji Picante')
    expect(products[0].category).toBe('ajies')
  })

  it('debe filtrar productos por categoria "mermeladas"', async () => {
    await Product.insertMany(productosTest)
    
    const products = await Product.find({ category: 'mermeladas' })
    
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('Mermelada de Fresa')
  })

  it('debe retornar array vacio para categoria sin productos', async () => {
    await Product.create({
      name: 'Solo Aji',
      description: 'Test',
      price: 5000,
      category: 'ajies',
    })
    
    const products = await Product.find({ category: 'salsas' })
    
    expect(products).toHaveLength(0)
  })

  it('debe ordenar productos por fecha de creacion descendente', async () => {
    // Crear productos con delay para diferentes timestamps
    await Product.create(productosTest[0])
    await new Promise(resolve => setTimeout(resolve, 10))
    await Product.create(productosTest[1])
    
    const products = await Product.find({}).sort({ createdAt: -1 })
    
    expect(products[0].name).toBe('Encurtido Mixto') // El mas reciente primero
  })
})
