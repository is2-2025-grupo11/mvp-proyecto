"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
  isLoading: boolean
  isSyncing: boolean
  sessionId: string
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  syncWithServer: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "comuarenal-cart"
const SESSION_ID_KEY = "comuarenal-session-id"

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

function getSessionId(): string {
  if (typeof window === "undefined") return ""
  
  let sessionId = localStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Inicializar sessionId y cargar carrito
  useEffect(() => {
    const id = getSessionId()
    setSessionId(id)
    
    // Cargar desde localStorage primero (para UI inmediata)
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch {
        console.error("Error parsing cart from localStorage")
      }
    }
    
    // Luego sincronizar con el servidor
    if (id) {
      fetchCartFromServer(id)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!isLoading && items) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoading])

  const fetchCartFromServer = async (sid: string) => {
    try {
      const response = await fetch(`/api/cart?sessionId=${sid}`)
      if (response.ok) {
        const data = await response.json()
        if (data.items && data.items.length > 0) {
          setItems(data.items.map((item: { productId: { toString: () => string }; name: string; price: number; quantity: number; image: string }) => ({
            productId: item.productId.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })))
        }
      }
    } catch (error) {
      console.error("Error fetching cart from server:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncWithServer = useCallback(async () => {
    if (!sessionId || items.length === 0) return
    
    setIsSyncing(true)
    try {
      // Primero limpiar el carrito en el servidor
      await fetch(`/api/cart?sessionId=${sessionId}`, { method: "DELETE" })
      
      // Luego agregar cada item
      for (const item of items) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            item: {
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            },
          }),
        })
      }
    } catch (error) {
      console.error("Error syncing cart with server:", error)
    } finally {
      setIsSyncing(false)
    }
  }, [sessionId, items])

  // Debounced sync con el servidor
  const debouncedSync = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }
    syncTimeoutRef.current = setTimeout(() => {
      syncWithServer()
    }, 1000)
  }, [syncWithServer])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const addItem = useCallback(async (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.productId === newItem.productId
      )

      if (existingIndex > -1) {
        const updatedItems = [...currentItems]
        updatedItems[existingIndex].quantity += newItem.quantity || 1
        return updatedItems
      }

      return [
        ...currentItems,
        {
          ...newItem,
          quantity: newItem.quantity || 1,
        },
      ]
    })
    setIsOpen(true)
    
    // Sync con servidor
    if (sessionId) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            item: {
              productId: newItem.productId,
              name: newItem.name,
              price: newItem.price,
              quantity: newItem.quantity || 1,
              image: newItem.image,
            },
          }),
        })
      } catch (error) {
        console.error("Error adding item to server:", error)
      }
    }
  }, [sessionId])

  const removeItem = useCallback(async (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    )
    
    // Sync con servidor
    if (sessionId) {
      try {
        await fetch(`/api/cart?sessionId=${sessionId}&productId=${productId}`, {
          method: "DELETE",
        })
      } catch (error) {
        console.error("Error removing item from server:", error)
      }
    }
  }, [sessionId])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
    
    // Sync con servidor
    if (sessionId) {
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            productId,
            quantity,
          }),
        })
      } catch (error) {
        console.error("Error updating quantity on server:", error)
      }
    }
  }, [sessionId, removeItem])

  const clearCart = useCallback(async () => {
    setItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
    
    // Sync con servidor
    if (sessionId) {
      try {
        await fetch(`/api/cart?sessionId=${sessionId}`, {
          method: "DELETE",
        })
      } catch (error) {
        console.error("Error clearing cart on server:", error)
      }
    }
  }, [sessionId])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        isOpen,
        isLoading,
        isSyncing,
        sessionId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        syncWithServer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export { getSessionId }
