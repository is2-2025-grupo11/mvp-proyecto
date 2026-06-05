import mongoose, { Schema, Document, Model } from "mongoose"

export interface IOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ICustomer {
  name: string
  email: string
  phone: string
  address: string
  city: string
  notes?: string
}

export interface IOrder extends Document {
  orderNumber: string
  items: IOrderItem[]
  customer: ICustomer
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema({
  productId: {
    type: String,
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
  },
  image: {
    type: String,
    default: "/placeholder.svg",
  },
})

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "El telefono es requerido"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "La direccion es requerida"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "La ciudad es requerida"],
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
})

const OrderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: function (items: IOrderItem[]) {
          return items.length > 0
        },
        message: "La orden debe tener al menos un producto",
      },
    },
    customer: {
      type: CustomerSchema,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

// Generar numero de orden unico antes de guardar
OrderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const date = new Date()
    const timestamp = date.getTime().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    this.orderNumber = `ORD-${timestamp}-${random}`
  }
  next()
})

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)

export default Order
