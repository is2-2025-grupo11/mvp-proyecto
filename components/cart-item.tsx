"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/components/cart-provider"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground mt-1">
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(item.productId)}
            aria-label="Eliminar producto"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-foreground">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}
