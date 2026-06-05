"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"

interface CustomerForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
  notes: string
}

type OrderStatus = "idle" | "loading" | "success" | "error"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart, isLoading: cartLoading } = useCart()
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("idle")
  const [orderNumber, setOrderNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState<CustomerForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Partial<CustomerForm>>({})

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerForm> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es valido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El telefono es requerido"
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "El telefono debe tener entre 7 y 15 digitos"
    }

    if (!formData.address.trim()) {
      newErrors.address = "La direccion es requerida"
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario escribe
    if (errors[name as keyof CustomerForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setOrderStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          customer: formData,
          total: total,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la orden")
      }

      setOrderNumber(data.orderNumber)
      setOrderStatus("success")
      await clearCart()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error al procesar la orden"
      )
      setOrderStatus("error")
    }
  }

  // Estado de carga del carrito
  if (cartLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Cargando carrito...</span>
        </div>
      </main>
    )
  }

  // Carrito vacio
  if (items.length === 0 && orderStatus !== "success") {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Tu carrito esta vacio
          </h1>
          <p className="text-muted-foreground mb-8">
            Agrega algunos productos antes de continuar con la compra
          </p>
          <Link href="/productos">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Ver Productos
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  // Orden exitosa
  if (orderStatus === "success") {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Orden Confirmada
          </h1>
          <p className="text-muted-foreground mb-2">
            Tu orden ha sido registrada exitosamente
          </p>
          <p className="text-xl font-semibold text-primary mb-8">
            Numero de orden: {orderNumber}
          </p>
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-foreground mb-2">Proximos pasos</h3>
            <p className="text-sm text-muted-foreground">
              Nos comunicaremos contigo al correo{" "}
              <span className="font-medium text-foreground">{formData.email}</span>{" "}
              para confirmar los detalles de tu pedido y coordinar la entrega.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos">
              <Button variant="outline">Seguir Comprando</Button>
            </Link>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/productos"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver a Productos</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="COMUARENAL Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-foreground hidden sm:block">
                COMUARENAL
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Finalizar Compra
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Informacion de Envio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electronico *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="3001234567"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Direccion *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Tu direccion completa"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Tu ciudad"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Instrucciones especiales de entrega, preferencias, etc."
                      rows={3}
                    />
                  </div>

                  {orderStatus === "error" && (
                    <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    disabled={orderStatus === "loading"}
                  >
                    {orderStatus === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Procesando...
                      </>
                    ) : (
                      <>Confirmar Pedido - {formatPrice(total)}</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div>
            <Card className="bg-card border-border sticky top-4">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Resumen del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 py-3 border-b border-border last:border-0"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="text-foreground">Por coordinar</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Nota:</strong> El costo de envio
                    sera calculado y comunicado por nuestro equipo segun tu ubicacion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
