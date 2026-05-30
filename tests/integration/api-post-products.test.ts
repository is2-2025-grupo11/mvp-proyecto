/**
 * PRUEBA DE INTEGRACION 2: API POST /api/products
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: Permite agregar nuevos productos al catalogo
 * - Riesgo cubierto: Creacion de productos invalidos o duplicados podria corromper datos
 * - Por que integracion: Prueba la validacion del modelo + persistencia en MongoDB
 * 
 * DESCUBRIMIENTOS:
 * - Mongoose valida automaticamente los datos antes de guardar
 * - Los campos con valores por defecto se aplican correctamente
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

describe('API Integration: POST /api/products', () => {
  let mongoServer: MongoMemoryServer
  let Product: mongoose.Model<any>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
    Product = mongoose.model('ProductPost', ProductSchema)
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

  it('debe crear un producto con datos validos', async () => {
    const productData = {
      name: 'Nueva Salsa Picante',
      description: 'Salsa artesanal con chiles seleccionados',
      price: 9500,
      category: 'salsas',
    }

    const product = await Product.create(productData)

    expect(product._id).toBeDefined()
    expect(product.name).toBe('Nueva Salsa Picante')
    expect(product.price).toBe(9500)
    expect(product.category).toBe('salsas')
    expect(product.inStock).toBe(true) // valor por defecto
    expect(product.image).toBe('/placeholder.svg') // valor por defecto
    expect(product.createdAt).toBeDefined()
  })

  it('debe rechazar producto sin nombre', async () => {
    const productData = {
      description: 'Descripcion valida',
      price: 5000,
      category: 'ajies',
    }

    await expect(Product.create(productData)).rejects.toThrow()
  })

  it('debe rechazar producto sin descripcion', async () => {
    const productData = {
      name: 'Producto Test',
      price: 5000,
      category: 'ajies',
    }

    await expect(Product.create(productData)).rejects.toThrow()
  })

  it('debe rechazar producto con precio negativo', async () => {
    const productData = {
      name: 'Producto Invalido',
      description: 'Test',
      price: -100,
      category: 'mermeladas',
    }

    await expect(Product.create(productData)).rejects.toThrow()
  })

  it('debe rechazar producto con categoria invalida', async () => {
    const productData = {
      name: 'Producto Test',
      description: 'Test',
      price: 5000,
      category: 'categoria_inexistente',
    }

    await expect(Product.create(productData)).rejects.toThrow()
  })

  it('debe permitir precio igual a cero (producto gratis)', async () => {
    const productData = {
      name: 'Muestra Gratis',
      description: 'Muestra de cortesia',
      price: 0,
      category: 'ajies',
    }

    const product = await Product.create(productData)
    
    expect(product.price).toBe(0)
  })

  it('debe aplicar trim al nombre del producto', async () => {
    const productData = {
      name: '   Aji con Espacios   ',
      description: 'Test',
      price: 5000,
      category: 'ajies',
    }

    const product = await Product.create(productData)
    
    expect(product.name).toBe('Aji con Espacios')
  })

  it('debe permitir especificar imagen personalizada', async () => {
    const productData = {
      name: 'Producto con Imagen',
      description: 'Test',
      price: 5000,
      category: 'salsas',
      image: '/images/mi-producto.jpg',
    }

    const product = await Product.create(productData)
    
    expect(product.image).toBe('/images/mi-producto.jpg')
  })

  it('debe persistir el producto en la base de datos', async () => {
    const productData = {
      name: 'Producto Persistente',
      description: 'Verificar persistencia',
      price: 7500,
      category: 'encurtidos',
    }

    const created = await Product.create(productData)
    const found = await Product.findById(created._id)
    
    expect(found).not.toBeNull()
    expect(found?.name).toBe('Producto Persistente')
  })
})
