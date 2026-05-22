import { Home, Store, Utensils, Heart } from "lucide-react"

const audiences = [
  {
    icon: Home,
    title: "Familias",
    description: "Hogares que buscan productos naturales y de calidad para su alimentacion diaria.",
  },
  {
    icon: Store,
    title: "Tiendas Locales",
    description: "Comerciantes interesados en ofrecer productos artesanales y diferenciados.",
  },
  {
    icon: Utensils,
    title: "Restaurantes",
    description: "Establecimientos gastronomicos que valoran ingredientes autenticos y locales.",
  },
  {
    icon: Heart,
    title: "Consumidores Conscientes",
    description: "Personas que apoyan la economia local y prefieren productos sostenibles.",
  },
]

export function Audience() {
  return (
    <section id="audiencia" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">Nuestros Clientes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            A Quien Va Dirigido
          </h2>
          <p className="text-muted-foreground text-lg">
            Nuestros productos estan disenados para satisfacer las necesidades de diversos segmentos 
            que valoran la calidad y autenticidad.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <audience.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {audience.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
