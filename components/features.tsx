import { Flame, Citrus, Cherry, Droplets } from "lucide-react"

const features = [
  {
    icon: Flame,
    title: "Ajies Artesanales",
    description: "Preparados con recetas tradicionales, nuestros ajies ofrecen el nivel perfecto de picante para realzar cualquier comida.",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: Citrus,
    title: "Encurtidos Crujientes",
    description: "Verduras frescas conservadas en vinagre especiado, manteniendo su textura crujiente y sabor autentico.",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    icon: Cherry,
    title: "Mermeladas Naturales",
    description: "Elaboradas con frutas maduras seleccionadas, sin conservantes artificiales. Ideales para el desayuno familiar.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    icon: Droplets,
    title: "Salsas Gourmet",
    description: "Salsas versátiles para acompanar carnes, pastas y mas. Desde BBQ ahumada hasta tomate casero.",
    color: "bg-orange-500/10 text-orange-600",
  },
]

export function Features() {
  return (
    <section id="caracteristicas" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">Nuestros Productos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Caracteristicas Principales
          </h2>
          <p className="text-muted-foreground text-lg">
            Cuatro lineas de productos derivados de frutas, elaborados con pasion y tradicion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
