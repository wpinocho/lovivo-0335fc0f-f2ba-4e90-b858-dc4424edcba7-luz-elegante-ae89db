import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useCartUI } from "@/components/CartProvider"

export const FloatingCart = () => {
  const { getTotalItems } = useCart()
  const { openCart } = useCartUI()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={openCart}
        className="h-16 w-16 rounded-full bg-gradient-sunset text-white hover:opacity-90 hover:scale-110 transition-all duration-300 shadow-2xl"
        size="icon"
      >
        <div className="relative">
          <ShoppingCart className="h-7 w-7" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-sunrise text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
      </Button>
    </div>
  )
}