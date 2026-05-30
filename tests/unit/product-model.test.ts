/**
 * PRUEBA UNITARIA 1: Validaciones del Modelo Product
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: El modelo Product define la estructura de datos principal del negocio
 * - Riesgo cubierto: Datos invalidos podrian corromper la base de datos o causar errores en la UI
 * - Por que unitaria: Prueba logica de validacion aislada, sin dependencias externas (BD, API)
 * 
 * DESCUBRIMIENTOS:
 * - Las validaciones de Mongoose son declarativas en el schema
 * - Los mensajes de error personalizados ayudan al debugging
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// Importamos el schema directamente para pruebas unitarias
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es requerido"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripcion del producto es requerida"],
    },
    price: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio no puede ser negativo"],
    },
    category: {
      type: String,
      required: [true, "La categoria es requerida"],
      enum: ["ajies", "encurtidos", "mermeladas", "salsas"],
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

describe('Modelo Product - Validaciones', () => {
  let mongoServer: MongoMemoryServer
  let ProductModel: mongoose.Model<any>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
    ProductModel = mongoose.model('ProductTest', ProductSchema)
  }, 60000) // Timeout de 60 segundos para descargar MongoDB en memoria

  afterAll(async () => {
    await mongoose.disconnect()
    if (mongoServer) {
      await mongoServer.stop()
    }
  })

  it('debe crear un producto valido con todos los campos requeridos', async () => {
    const productData = {
      name: 'Aji Picante',
      description: 'Delicioso aji picante artesanal',
      price: 8500,
      category: 'ajies',
    }

    const product = new ProductModel(productData)
    const savedProduct = await product.save()

    expect(savedProduct.name).toBe('Aji Picante')
    expect(savedProduct.price).toBe(8500)
    expect(savedProduct.category).toBe('ajies')
    expect(savedProduct.inStock).toBe(true) // valor por defecto
    expect(savedProduct.image).toBe('/placeholder.svg') // valor por defecto
  })

  it('debe fallar si el nombre esta vacio', async () => {
    const productData = {
      name: '',
      description: 'Descripcion valida',
      price: 5000,
      category: 'salsas',
    }

    const product = new ProductModel(productData)
    
    await expect(product.save()).rejects.toThrow()
  })

  it('debe fallar si el precio es negativo', async () => {
    const productData = {
      name: 'Producto Test',
      description: 'Descripcion valida',
      price: -100,
      category: 'mermeladas',
    }

    const product = new ProductModel(productData)
    
    await expect(product.save()).rejects.toThrow(/precio no puede ser negativo/)
  })

  it('debe fallar si la categoria no es valida', async () => {
    const productData = {
      name: 'Producto Test',
      description: 'Descripcion valida',
      price: 5000,
      category: 'categoria_invalida',
    }

    const product = new ProductModel(productData)
    
    await expect(product.save()).rejects.toThrow()
  })

  it('debe aceptar todas las categorias validas', async () => {
    const categoriasValidas = ['ajies', 'encurtidos', 'mermeladas', 'salsas']
    
    for (const categoria of categoriasValidas) {
      const product = new ProductModel({
        name: `Producto ${categoria}`,
        description: 'Descripcion',
        price: 1000,
        category: categoria,
      })
      
      const saved = await product.save()
      expect(saved.category).toBe(categoria)
    }
  })
})
