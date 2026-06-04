import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Cart from "@/models/Cart"

// GET - Obtener carrito por sessionId
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId es requerido" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    let cart = await Cart.findOne({ sessionId })

    if (!cart) {
      // Crear carrito vacio si no existe
      cart = await Cart.create({ sessionId, items: [], total: 0 })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error al obtener carrito:", error)
    return NextResponse.json(
      { error: "Error al obtener el carrito" },
      { status: 500 }
    )
  }
}

// POST - Agregar item al carrito
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, item } = body

    if (!sessionId || !item) {
      return NextResponse.json(
        { error: "sessionId e item son requeridos" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    let cart = await Cart.findOne({ sessionId })

    if (!cart) {
      cart = new Cart({ sessionId, items: [] })
    }

    // Verificar si el producto ya existe en el carrito
    const existingItemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === item.productId
    )

    if (existingItemIndex > -1) {
      // Actualizar cantidad si ya existe
      cart.items[existingItemIndex].quantity += item.quantity || 1
    } else {
      // Agregar nuevo item
      cart.items.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "/placeholder.svg",
      })
    }

    await cart.save()

    return NextResponse.json(cart, { status: 201 })
  } catch (error) {
    console.error("Error al agregar al carrito:", error)
    return NextResponse.json(
      { error: "Error al agregar al carrito" },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cantidad de un item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, productId, quantity } = body

    if (!sessionId || !productId || quantity === undefined) {
      return NextResponse.json(
        { error: "sessionId, productId y quantity son requeridos" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const cart = await Cart.findOne({ sessionId })

    if (!cart) {
      return NextResponse.json(
        { error: "Carrito no encontrado" },
        { status: 404 }
      )
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    )

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Producto no encontrado en el carrito" },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      // Eliminar item si cantidad es 0 o menor
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error al actualizar carrito:", error)
    return NextResponse.json(
      { error: "Error al actualizar el carrito" },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar item o vaciar carrito
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")
    const productId = request.nextUrl.searchParams.get("productId")

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId es requerido" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const cart = await Cart.findOne({ sessionId })

    if (!cart) {
      return NextResponse.json(
        { error: "Carrito no encontrado" },
        { status: 404 }
      )
    }

    if (productId) {
      // Eliminar un producto especifico
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      )
    } else {
      // Vaciar todo el carrito
      cart.items = []
    }

    await cart.save()

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error al eliminar del carrito:", error)
    return NextResponse.json(
      { error: "Error al eliminar del carrito" },
      { status: 500 }
    )
  }
}
