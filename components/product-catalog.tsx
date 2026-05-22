"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Flame, Citrus } from "lucide-react"

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
    name: "Encurtido de Verduras Mixtas",
    category: "encurtidos" as Category,
    price: 12000,
    description: "Variedad de verduras frescas encurtidas en vinagre especiado.",
    badge: "Nuevo",
    icon: Citrus,
  },
  {
    id: 4,
    name: "Encurtido de Cebolla",
    category: "encurtidos" as Category,
    price: 9000,
    description: "Cebollas crujientes con un toque de especias naturales.",
    icon: Citrus,
  },
  {
    id: 5,
    name: "Mermelada de Mango",
    category: "mermeladas" as Category,
    price: 15000,
    description: "Dulce mermelada elaborada con mangos maduros seleccionados.",
    badge: "Popular",
    icon: Citrus,
  },
  {
    id: 6,
    name: "Mermelada de Fresa",
    category: "mermeladas" as Category,
    price: 14000,
    description: "Fresas frescas convertidas en una deliciosa mermelada casera.",
    icon: Citrus,
  },
  {
    id: 7,
    name: "Mermelada de Naranja",
    category: "mermeladas" as Category,
    price: 13500,
    description: "Citrica y refrescante, perfecta para el desayuno.",
    icon: Citrus,
  },
  {
    id: 8,
    name: "Salsa BBQ Artesanal",
    category: "salsas" as Category,
    price: 11000,
    description: "Salsa ahumada con toques dulces, ideal para carnes.",
    icon: Flame,
  },
  {
    id: 9,
    name: "Salsa de Tomate Casera",
    category: "salsas" as Category,
    price: 10000,
    description: "Tomates frescos cocinados con hierbas aromaticas.",
    badge: "Organico",
    icon: Citrus,
  },
]

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

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
    <section id="productos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-3">Nuestro Catalogo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Productos Derivados de Frutas
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubre nuestra variedad de productos artesanales, elaborados con las mejores 
            frutas de la region.
          </p>
        </div>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full aspect-square bg-secondary rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <product.icon className="h-20 w-20 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {categories.find((c) => c.id === product.category)?.label}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <p className="text-xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
