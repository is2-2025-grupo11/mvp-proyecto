import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"

// GET - Obtener ordenes (filtrar por email opcional)
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")
    const orderNumber = request.nextUrl.searchParams.get("orderNumber")

    await connectToDatabase()

    let query = {}

    if (orderNumber) {
      query = { orderNumber }
    } else if (email) {
      query = { "customer.email": email.toLowerCase() }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error al obtener ordenes:", error)
    return NextResponse.json(
      { error: "Error al obtener las ordenes" },
      { status: 500 }
    )
  }
}

// POST - Crear nueva orden
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customer, total } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito esta vacio" },
        { status: 400 }
      )
    }

    if (!customer) {
      return NextResponse.json(
        { error: "La informacion del cliente es requerida" },
        { status: 400 }
      )
    }

    // Validar campos del cliente
    const requiredFields = ["name", "email", "phone", "address", "city"]
    for (const field of requiredFields) {
      if (!customer[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        )
      }
    }

    await connectToDatabase()

    // Generar orderNumber manualmente para evitar colisiones
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const orderNumber = `ORD-${timestamp}-${random}`

    // Crear orden directamente con los items enviados
    const order = new Order({
      orderNumber,
      items: items.map((item: { productId: string; name: string; price: number; quantity: number; image: string }) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "/placeholder.svg",
      })),
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        notes: customer.notes?.trim() || "",
      },
      total: total || items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0),
      status: "pending",
    })

    await order.save()

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error al crear orden:", error)
    
    // Manejar error de duplicado
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Error de duplicado, intenta de nuevo" },
        { status: 409 }
      )
    }
    
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    return NextResponse.json(
      { error: `Error al crear la orden: ${errorMessage}` },
      { status: 500 }
    )
  }
}

// PUT - Actualizar estado de orden
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNumber, status } = body

    if (!orderNumber || !status) {
      return NextResponse.json(
        { error: "orderNumber y status son requeridos" },
        { status: 400 }
      )
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ]
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Estado invalido" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const order = await Order.findOneAndUpdate(
      { orderNumber },
      { status },
      { new: true }
    )

    if (!order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error al actualizar orden:", error)
    return NextResponse.json(
      { error: "Error al actualizar la orden" },
      { status: 500 }
    )
  }
}
