const technologies = [
  {
    name: "Next.js",
    description: "Framework React para produccion",
    category: "Frontend",
  },
  {
    name: "React",
    description: "Biblioteca de interfaces de usuario",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    description: "JavaScript con tipado estatico",
    category: "Lenguaje",
  },
  {
    name: "Tailwind CSS",
    description: "Framework de estilos utilitarios",
    category: "Estilos",
  },
  {
    name: "shadcn/ui",
    description: "Componentes UI accesibles",
    category: "Componentes",
  },
  {
    name: "Vercel",
    description: "Plataforma de despliegue cloud",
    category: "Infraestructura",
  },
]

export function TechStack() {
  return (
    <section id="tecnologia" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">Tecnologia</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Stack Tecnologico
          </h2>
          <p className="text-muted-foreground text-lg">
            Construido con tecnologias modernas para garantizar rendimiento, escalabilidad y 
            una excelente experiencia de usuario.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {tech.name}
                </h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {tech.category}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
