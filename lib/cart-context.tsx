'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Product, ProductVariant } from './types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  generateWhatsAppMessage: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.variantId === variant.id)
        if (existing) {
          return prev.map((item) =>
            item.variantId === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        return [...prev, { productId: product.id, variantId: variant.id, quantity, product, variant }]
      })
    },
    []
  )

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId))
  }, [])

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.variantId !== variantId))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  )

  const generateWhatsAppMessage = useCallback(() => {
    const itemLines = items
      .map(
        (item) =>
          `${item.product.titleZh} - ${item.variant.colorName} x${item.quantity} (\u00A5${(item.variant.price * item.quantity).toLocaleString('zh-CN')})`
      )
      .join('\n')
    return encodeURIComponent(
      `您好，我想咨询以下商品：\n\n${itemLines}\n\n合计：\u00A5${totalPrice.toLocaleString('zh-CN')}\n\n请问如何购买？`
    )
  }, [items, totalPrice])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
