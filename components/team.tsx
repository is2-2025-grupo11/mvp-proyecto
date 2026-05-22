import { User } from "lucide-react"

const teamMembers = [
  {
    name: "Integrante 1",
    role: "Desarrollador Frontend",
    description: "Encargado del diseno e implementacion de la interfaz de usuario.",
  },
  {
    name: "Integrante 2",
    role: "Desarrollador Backend",
    description: "Responsable de la logica del servidor y base de datos.",
  },
  {
    name: "Integrante 3",
    role: "Disenador UI/UX",
    description: "A cargo del diseno visual y experiencia de usuario.",
  },
  {
    name: "Integrante 4",
    role: "Project Manager",
    description: "Coordinacion del equipo y gestion del proyecto.",
  },
]

export function Team() {
  return (
    <section id="equipo" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">El Equipo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Nuestro Equipo de Desarrollo
          </h2>
          <p className="text-muted-foreground text-lg">
            Conoce a las personas detras de este proyecto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
