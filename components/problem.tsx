import { AlertTriangle, TrendingDown, ShoppingBag, Leaf } from "lucide-react"

const problems = [
  {
    icon: AlertTriangle,
    problem: "Productos industriales sin sabor autentico",
    solution: "Elaboracion artesanal con recetas tradicionales",
  },
  {
    icon: TrendingDown,
    problem: "Falta de apoyo a productores locales",
    solution: "Cooperativa que fortalece la economia regional",
  },
  {
    icon: ShoppingBag,
    problem: "Dificultad para encontrar productos naturales",
    solution: "Catalogo digital accesible para clientes digitales",
  },
  {
    icon: Leaf,
    problem: "Conservantes y quimicos en alimentos",
    solution: "Ingredientes 100% naturales y frescos",
  },
]

export function Problem() {
  return (
    <section id="problema" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">El Problema</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Que Problema Resolvemos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            En un mercado dominado por productos industrializados, los consumidores buscan 
            alternativas naturales y autenticas que conecten con la tradicion y apoyen a 
            las comunidades locales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm line-through mb-2">
                    {item.problem}
                  </p>
                  <p className="text-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
