import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = {}
    if (category && category !== "todos") {
      query = { category }
    }

    const products = await Product.find(query).sort({ createdAt: -1 })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const product = await Product.create(body)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    )
  }
}
