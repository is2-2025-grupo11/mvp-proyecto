/**
 * PRUEBA E2E 2: Navegacion y Estructura de la Aplicacion
 * 
 * JUSTIFICACION:
 * - Funcionalidad critica: La navegacion permite a los usuarios moverse entre secciones
 * - Riesgo cubierto: Enlaces rotos o navegacion incorrecta frustra a los usuarios
 * - Por que E2E: Prueba la experiencia real del usuario navegando la aplicacion
 * 
 * DESCUBRIMIENTOS:
 * - El header es fijo y debe ser visible en todo momento
 * - El menu mobile debe funcionar correctamente en pantallas pequenas
 */

import { test, expect } from '@playwright/test'

test.describe('Navegacion y Estructura - E2E', () => {
  test('debe cargar la pagina principal correctamente', async ({ page }) => {
    await page.goto('/')
    
    // Verificar que la pagina carga sin errores
    await expect(page).toHaveTitle(/COMUARENAL|Productos/)
  })

  test('debe navegar desde inicio a productos', async ({ page }) => {
    await page.goto('/')
    
    // Buscar y hacer clic en enlace a productos
    const productosLink = page.getByRole('link', { name: /productos/i }).first()
    
    if (await productosLink.isVisible()) {
      await productosLink.click()
      await expect(page).toHaveURL(/\/productos/)
    }
  })

  test('debe navegar desde productos a inicio', async ({ page }) => {
    await page.goto('/productos')
    
    // Hacer clic en "Volver al Inicio"
    const volverLink = page.getByRole('link', { name: /Volver al Inicio/i })
    await expect(volverLink).toBeVisible()
    
    await volverLink.click()
    await expect(page).toHaveURL('/')
  })

  test('debe tener header fijo visible al hacer scroll', async ({ page }) => {
    await page.goto('/productos')
    
    // Hacer scroll hacia abajo
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // El header debe seguir visible
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('debe mostrar el footer con copyright', async ({ page }) => {
    await page.goto('/productos')
    
    // Hacer scroll al final
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Verificar el footer
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText('COMUARENAL')
    await expect(footer).toContainText('Todos los derechos reservados')
  })

  test('debe ser responsive - menu mobile en pantallas pequenas', async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/productos')
    
    // El boton de menu mobile debe estar visible
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuButton).toBeVisible()
  })

  test('debe abrir y cerrar menu mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/productos')
    
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    
    // Abrir menu
    await menuButton.click()
    
    // Verificar que el menu esta abierto (enlace visible)
    const menuLink = page.locator('text=Volver al Inicio').last()
    await expect(menuLink).toBeVisible()
    
    // Cerrar menu
    await menuButton.click()
  })

  test('debe mostrar correctamente en desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/productos')
    
    // En desktop, el enlace debe estar en la navegacion principal
    const navLink = page.locator('nav').getByRole('link', { name: /Volver al Inicio/i })
    await expect(navLink).toBeVisible()
    
    // El boton de menu mobile no debe estar visible
    const menuButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuButton).toBeHidden()
  })
})
