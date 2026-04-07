"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type CartItem = {
  id: number
  name: string
  subtitle: string
  image: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: { id: number; name: string; subtitle: string; image: string; price: number }) => void
  removeItem: (id: number) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: { id: number; name: string; subtitle: string; image: string; price: number }) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
