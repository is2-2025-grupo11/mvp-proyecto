import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted" />
      
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Leaf className="h-4 w-4" />
              Productos 100% Naturales
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Del Campo a tu Mesa con{" "}
              <span className="text-primary">Sabor Artesanal</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              En COMUARENAL transformamos las mejores frutas en productos derivados de alta calidad: 
              ajies, encurtidos, mermeladas y salsas elaboradas con tradicion y amor por nuestra tierra.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/productos">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Ver Catalogo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#nosotros">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Conocer Mas
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Anos de experiencia</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground">Productos</p>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-90" />
              <div className="relative bg-card rounded-3xl shadow-2xl p-8 border border-border">
                <Image
                  src="/images/logo.png"
                  alt="COMUARENAL - Productos Artesanales"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
