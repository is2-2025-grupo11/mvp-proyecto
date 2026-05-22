"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Flame, Citrus, ArrowLeft, Menu, X } from "lucide-react"

type Category = "all" | "ajies" | "encurtidos" | "mermeladas" | "salsas"

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "ajies", label: "Ajies" },
  { id: "encurtidos", label: "Encurtidos" },
  { id: "mermeladas", label: "Mermeladas" },
  { id: "salsas", label: "Salsas" },
]

const products = [
  {
    id: 1,
    name: "Aji Picante Tradicional",
    category: "ajies" as Category,
    price: 8500,
    description: "Aji preparado con receta tradicional, picante y lleno de sabor.",
    badge: "Mas Vendido",
    icon: Flame,
  },
  {
    id: 2,
    name: "Aji Suave",
    category: "ajies" as Category,
    price: 7500,
    description: "Perfecto para quienes prefieren un toque suave de picante.",
    icon: Flame,
  },
  {
    id: 3,
    name: "Aji Extra Picante",
    category: "ajies" as Category,
    price: 9000,
    description: "Para los amantes del picante intenso y autentico.",
    badge: "Nuevo",
    icon: Flame,
  },
  {
    id: 4,
    name: "Aji con Hierbas",
    category: "ajies" as Category,
    price: 8000,
    description: "Combinacion unica de aji con hierbas aromaticas.",
    icon: Flame,
  },
  {
    id: 5,
    name: "Encurtido de Verduras Mixtas",
    category: "encurtidos" as Category,
    price: 12000,
    description: "Variedad de verduras frescas encurtidas en vinagre especiado.",
    badge: "Popular",
    icon: Citrus,
  },
  {
    id: 6,
    name: "Encurtido de Cebolla",
    category: "encurtidos" as Category,
    price: 9000,
    description: "Cebollas crujientes con un toque de especias naturales.",
    icon: Citrus,
  },
  {
    id: 7,
    name: "Encurtido de Pepinillos",
    category: "encurtidos" as Category,
    price: 10000,
    description: "Pepinillos frescos con el balance perfecto de acidez.",
    icon: Citrus,
  },
  {
    id: 8,
    name: "Encurtido de Zanahoria",
    category: "encurtidos" as Category,
    price: 9500,
    description: "Zanahorias crujientes en vinagre con especias.",
    icon: Citrus,
  },
  {
    id: 9,
    name: "Mermelada de Mango",
    category: "mermeladas" as Category,
    price: 15000,
    description: "Dulce mermelada elaborada con mangos maduros seleccionados.",
    badge: "Favorito",
    icon: Citrus,
  },
  {
    id: 10,
    name: "Mermelada de Fresa",
    category: "mermeladas" as Category,
    price: 14000,
    description: "Fresas frescas convertidas en una deliciosa mermelada casera.",
    icon: Citrus,
  },
  {
    id: 11,
    name: "Mermelada de Naranja",
    category: "mermeladas" as Category,
    price: 13500,
    description: "Citrica y refrescante, perfecta para el desayuno.",
    icon: Citrus,
  },
  {
    id: 12,
    name: "Mermelada de Guayaba",
    category: "mermeladas" as Category,
    price: 14500,
    description: "Sabor tropical autentico de guayaba madura.",
    badge: "Nuevo",
    icon: Citrus,
  },
  {
    id: 13,
    name: "Salsa BBQ Artesanal",
    category: "salsas" as Category,
    price: 11000,
    description: "Salsa ahumada con toques dulces, ideal para carnes.",
    icon: Flame,
  },
  {
    id: 14,
    name: "Salsa de Tomate Casera",
    category: "salsas" as Category,
    price: 10000,
    description: "Tomates frescos cocinados con hierbas aromaticas.",
    badge: "Organico",
    icon: Citrus,
  },
  {
    id: 15,
    name: "Salsa Picante Especial",
    category: "salsas" as Category,
    price: 11500,
    description: "Mezcla de chiles con el nivel perfecto de picante.",
    icon: Flame,
  },
  {
    id: 16,
    name: "Salsa de Ajo",
    category: "salsas" as Category,
    price: 10500,
    description: "Cremosa salsa de ajo para acompanar cualquier plato.",
    icon: Citrus,
  },
]

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory)

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
            </nav>

            <button
              className="md:hidden p-2"
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

          {/* Grid de productos 4x4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="relative mb-4">
                    <div className="w-full aspect-square bg-secondary rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <product.icon className="h-16 w-16 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    {product.badge && (
                      <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {categories.find((c) => c.id === product.category)?.label}
                    </p>
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
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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
