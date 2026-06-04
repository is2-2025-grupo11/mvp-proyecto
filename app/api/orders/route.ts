import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import Cart from "@/models/Cart"

// GET - Obtener ordenes (filtrar por email opcional)
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")
    const orderNumber = request.nextUrl.searchParams.get("orderNumber")

    await connectDB()

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
    const { sessionId, customer } = body

    if (!sessionId || !customer) {
      return NextResponse.json(
        { error: "sessionId y customer son requeridos" },
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

    await connectDB()

    // Obtener carrito
    const cart = await Cart.findOne({ sessionId })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "El carrito esta vacio" },
        { status: 400 }
      )
    }

    // Crear orden
    const order = new Order({
      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        notes: customer.notes?.trim() || "",
      },
      total: cart.total,
      status: "pending",
    })

    await order.save()

    // Vaciar carrito despues de crear la orden
    cart.items = []
    cart.total = 0
    await cart.save()

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error al crear orden:", error)
    return NextResponse.json(
      { error: "Error al crear la orden" },
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

    await connectDB()

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
