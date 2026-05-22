import { Users, Award, Heart, TreePine } from "lucide-react"

const features = [
  {
    icon: TreePine,
    title: "Tradicion Local",
    description: "Apoyamos a los agricultores de nuestra region, fortaleciendo la economia local y preservando tecnicas ancestrales.",
  },
  {
    icon: Heart,
    title: "Elaboracion Artesanal",
    description: "Cada producto es elaborado con dedicacion, siguiendo recetas tradicionales que garantizan un sabor unico.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Seleccionamos las mejores frutas para ofrecer productos de la mas alta calidad a nuestros clientes.",
  },
  {
    icon: Users,
    title: "Comunidad Cooperativa",
    description: "Somos una cooperativa multiactiva comprometida con el desarrollo sostenible de Arenal.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">Sobre Nosotros</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Una Cooperativa con Raices en la Tierra
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            COMUARENAL nace del compromiso de nuestra comunidad por llevar lo mejor del campo 
            a cada hogar. Transformamos frutas frescas en productos deliciosos que conservan 
            todo el sabor y la calidad de nuestra tierra.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
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
