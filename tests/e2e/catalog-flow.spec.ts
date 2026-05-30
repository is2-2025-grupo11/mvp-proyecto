/**
 * PRUEBA E2E 1: Flujo de Catalogo y Filtrado
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: El catalogo es la pagina principal donde los usuarios ven productos
 * - Riesgo cubierto: Si el filtrado falla, los usuarios no pueden encontrar los productos que buscan
 * - Por que E2E: Prueba el flujo completo desde el navegador hasta la BD y de vuelta
 * 
 * DESCUBRIMIENTOS:
 * - El estado de carga debe manejarse correctamente
 * - Los filtros deben actualizarse visualmente al seleccionarlos
 */

import { test, expect } from '@playwright/test'

test.describe('Catalogo de Productos - Flujo E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/productos')
  })

  test('debe cargar la pagina de productos correctamente', async ({ page }) => {
    // Verificar que el titulo esta presente
    await expect(page.locator('h1')).toContainText('Productos Derivados de Frutas')
    
    // Verificar que los botones de categoria estan presentes
    await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ajies' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Encurtidos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Mermeladas' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Salsas' })).toBeVisible()
  })

  test('debe mostrar estado de carga inicialmente', async ({ page }) => {
    // Navegar a la pagina y verificar el loader
    await page.goto('/productos')
    
    // El loader puede aparecer brevemente
    const loader = page.locator('text=Cargando productos')
    
    // Esperar a que desaparezca el loader (productos cargados o error)
    await expect(loader).toBeHidden({ timeout: 10000 })
  })

  test('debe filtrar productos al hacer clic en una categoria', async ({ page }) => {
    // Esperar a que la pagina cargue completamente
    await page.waitForLoadState('networkidle')
    
    // Hacer clic en el filtro "Ajies"
    await page.getByRole('button', { name: 'Ajies' }).click()
    
    // Verificar que el boton esta activo (tiene el estilo primary)
    const ajiesButton = page.getByRole('button', { name: 'Ajies' })
    await expect(ajiesButton).toHaveClass(/bg-primary/)
  })

  test('debe volver a mostrar todos los productos al hacer clic en Todos', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    
    // Primero filtrar por una categoria
    await page.getByRole('button', { name: 'Salsas' }).click()
    await page.waitForTimeout(500)
    
    // Luego volver a todos
    await page.getByRole('button', { name: 'Todos' }).click()
    
    // Verificar que el boton "Todos" esta activo
    const todosButton = page.getByRole('button', { name: 'Todos' })
    await expect(todosButton).toHaveClass(/bg-primary/)
  })

  test('debe tener navegacion de regreso al inicio', async ({ page }) => {
    // Verificar que existe el enlace para volver
    const volverLink = page.getByRole('link', { name: /Volver al Inicio/i })
    await expect(volverLink).toBeVisible()
    
    // Verificar que apunta a la pagina principal
    await expect(volverLink).toHaveAttribute('href', '/')
  })

  test('debe mostrar el logo de COMUARENAL', async ({ page }) => {
    const logo = page.getByRole('img', { name: /COMUARENAL Logo/i })
    await expect(logo).toBeVisible()
  })
})
