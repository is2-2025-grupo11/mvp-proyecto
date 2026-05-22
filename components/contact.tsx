"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Direccion",
    content: "Arenal, Bolivar, Colombia",
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "+57 300 123 4567",
  },
  {
    icon: Mail,
    title: "Correo",
    content: "contacto@comuarenal.com",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 AM - 5:00 PM",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Gracias por contactarnos. Pronto nos comunicaremos contigo.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="contacto" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-3">Contactanos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Estamos Aqui para Ayudarte
          </h2>
          <p className="text-muted-foreground text-lg">
            Tienes preguntas sobre nuestros productos o deseas hacer un pedido especial? 
            No dudes en comunicarte con nosotros.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{info.title}</p>
                    <p className="text-sm text-muted-foreground">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Pedidos al por Mayor
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ofrecemos precios especiales para distribuidores y pedidos al por mayor. 
                Contactanos para conocer nuestras condiciones comerciales y descuentos por volumen.
              </p>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Enviar Mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="Correo electronico"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-card border-border focus:border-primary"
                />
                <Input
                  type="tel"
                  placeholder="Telefono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tu mensaje..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-card border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
