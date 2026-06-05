"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, ArrowLeft, Menu, X, Loader2, Check } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { CartButton } from "@/components/cart-button"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: "ajies" | "encurtidos" | "mermeladas" | "salsas"
  image: string
  inStock: boolean
}

type Category = "todos" | "ajies" | "encurtidos" | "mermeladas" | "salsas"

const categories: { id: Category; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ajies", label: "Ajies" },
  { id: "encurtidos", label: "Encurtidos" },
  { id: "mermeladas", label: "Mermeladas" },
  { id: "salsas", label: "Salsas" },
]

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [activeCategory])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const url =
        activeCategory === "todos"
          ? "/api/products"
          : `/api/products?category=${activeCategory}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error al cargar los productos")
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const seedProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/products/seed", { method: "POST" })
      if (response.ok) {
        fetchProducts()
      } else {
        setError("Error al cargar productos de prueba")
      }
    } catch {
      setError("Error al conectar con la base de datos")
    }
  }

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product._id)
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedToCart(product._id)
    setTimeout(() => {
      setAddedToCart(null)
      setAddingToCart(null)
    }, 1500)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="COMUARENAL Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-bold text-foreground text-lg">COMUARENAL</p>
                <p className="text-xs text-muted-foreground">Catalogo de Productos</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Link>
              <CartButton />
            </nav>

            <div className="flex items-center gap-4 md:hidden">
              <CartButton />
              <button
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 py-2 text-foreground/80 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary font-semibold mb-3">Nuestro Catalogo</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Productos Derivados de Frutas
            </h1>
            <p className="text-muted-foreground text-lg">
              Descubre nuestra variedad de productos artesanales, elaborados con las mejores 
              frutas de la region.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className={
                  activeCategory === cat.id
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary"
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Cargando productos...</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{error}</p>
              <p className="text-muted-foreground mb-6">
                Asegurate de que MongoDB este corriendo en localhost:27017
              </p>
              <Button onClick={fetchProducts} variant="outline">
                Reintentar
              </Button>
            </div>
          )}

          {/* Sin productos */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-6">
                No hay productos disponibles. Haz clic en el boton para cargar productos de prueba.
              </p>
              <Button
                onClick={seedProducts}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Cargar Productos de Prueba
              </Button>
            </div>
          )}

          {/* Grid de productos 4x4 */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product._id}
                    className="group bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-5">
                      <div className="relative mb-4">
                        <div className="w-full aspect-square bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </p>
                      <Button 
                        size="sm" 
                        className={`gap-1 min-w-[100px] ${
                          addedToCart === product._id 
                            ? "bg-green-600 hover:bg-green-600 text-white" 
                            : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        }`}
                        disabled={!product.inStock || addingToCart === product._id}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addingToCart === product._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : addedToCart === product._id ? (
                          <>
                            <Check className="h-4 w-4" />
                            Agregado
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            {product.inStock ? "Agregar" : "Agotado"}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <p className="text-center text-muted-foreground mt-8">
                Mostrando {products.length} producto{products.length !== 1 ? "s" : ""}
                {activeCategory !== "todos" && ` en ${activeCategory}`}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Footer simple */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} COMUARENAL. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
