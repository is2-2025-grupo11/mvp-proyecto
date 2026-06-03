"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function CartButton() {
  const { itemCount, openCart, isLoading } = useCart()

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={openCart}
      aria-label={`Carrito de compras${itemCount > 0 ? `, ${itemCount} productos` : ""}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {!isLoading && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  )
}
