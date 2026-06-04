/**
 * PRUEBA UNITARIA 2: Funcion formatPrice
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: Formateo de precios es esencial para la experiencia del usuario
 * - Riesgo cubierto: Precios mal formateados podrian confundir a los clientes o causar errores de compra
 * - Por que unitaria: Es una funcion pura sin efectos secundarios ni dependencias externas
 * 
 * DESCUBRIMIENTOS:
 * - Intl.NumberFormat maneja correctamente el formato colombiano (COP)
 * - Casos edge como 0, numeros grandes y decimales son importantes de probar
 */

import { describe, it, expect } from 'vitest'

// Extraemos la funcion formatPrice para pruebas unitarias
// Esta funcion existe en product-catalog.tsx y productos/page.tsx
function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
}

describe('formatPrice - Formateo de Precios', () => {
  it('debe formatear un precio basico correctamente', () => {
    const result = formatPrice(8500)
    
    // El formato colombiano usa $ y punto como separador de miles
    expect(result).toContain('8.500')
    expect(result).toContain('$')
  })

  it('debe formatear precio cero', () => {
    const result = formatPrice(0)
    
    expect(result).toContain('0')
    expect(result).toContain('$')
  })

  it('debe formatear precios grandes con separadores de miles', () => {
    const result = formatPrice(1500000)
    
    // 1.500.000 en formato colombiano
    expect(result).toContain('1.500.000')
  })

  it('debe redondear decimales correctamente', () => {
    const result = formatPrice(8500.99)
    
    // minimumFractionDigits: 0 deberia redondear
    expect(result).toContain('8.501')
  })

  it('debe manejar precios pequenos', () => {
    const result = formatPrice(500)
    
    expect(result).toContain('500')
    expect(result).toContain('$')
  })

  it('debe mantener consistencia en multiples llamadas', () => {
    const price = 12000
    const result1 = formatPrice(price)
    const result2 = formatPrice(price)
    
    expect(result1).toBe(result2)
  })
})

describe('formatPrice - Casos de Productos Reales', () => {
  const productosReales = [
    { nombre: 'Aji Picante Tradicional', precio: 8500 },
    { nombre: 'Encurtido de Verduras Mixtas', precio: 12000 },
    { nombre: 'Mermelada de Mango', precio: 15000 },
    { nombre: 'Salsa BBQ Artesanal', precio: 11000 },
  ]

  it('debe formatear todos los precios del catalogo correctamente', () => {
    for (const producto of productosReales) {
      const result = formatPrice(producto.precio)
      
      expect(result).toContain('$')
      expect(result.length).toBeGreaterThan(0)
      // Verificar que no haya NaN o undefined
      expect(result).not.toContain('NaN')
      expect(result).not.toContain('undefined')
    }
  })
})
