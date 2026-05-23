import mongoose, { Schema, Document, Model } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: "ajies" | "encurtidos" | "mermeladas" | "salsas"
  image: string
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es requerido"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripcion del producto es requerida"],
    },
    price: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0, "El precio no puede ser negativo"],
    },
    category: {
      type: String,
      required: [true, "La categoria es requerida"],
      enum: ["ajies", "encurtidos", "mermeladas", "salsas"],
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

export default Product
