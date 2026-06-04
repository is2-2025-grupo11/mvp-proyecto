import mongoose, { Schema, Document, Model } from "mongoose"

export interface ICartItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
  image: string
}

export interface ICart extends Document {
  sessionId: string
  items: ICartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  image: {
    type: String,
    default: "/placeholder.svg",
  },
})

const CartSchema: Schema = new Schema(
  {
    sessionId: {
      type: String,
      required: [true, "El ID de sesion es requerido"],
      unique: true,
      index: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Middleware para calcular el total antes de guardar
CartSchema.pre("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  next()
})

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)

export default Cart
