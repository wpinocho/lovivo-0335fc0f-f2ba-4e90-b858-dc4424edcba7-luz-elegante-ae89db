import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-card/90 backdrop-blur-sm">
          <CardContent className="p-5">
            <Link to={`/productos/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gradient-calm/20 rounded-2xl mb-4 overflow-hidden relative group/image">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <>
                    {/* Primary image - only fade on hover if there's a second image */}
                    <img
                      src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                      alt={logic.product.title}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110 ${
                        logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image
                          ? 'group-hover:opacity-0'
                          : ''
                      }`}
                    />
                    {/* Secondary image on hover (only if exists and no variant image) */}
                    {logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && (
                      <img
                        src={logic.product.images[1]}
                        alt={`${logic.product.title} - alternativa`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-calm">
                    <span className="text-white/60">Sin imagen</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-gradient-sunrise text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-gradient-sunset text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                      Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-foreground/80 text-background text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground group-hover:bg-gradient-sunset group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {logic.product.title}
              </h3>
              {logic.product.description && (
                <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                  {logic.product.description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </Link>

            {logic.hasVariants && logic.options && (
              <div className="mb-3 space-y-2">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-xs font-medium text-black mb-1">{opt.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={`${opt.name}: ${val}`}
                              className={`h-6 w-6 rounded-full border ${
                                logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''
                              }`}
                              style={{ 
                                backgroundColor: swatch, 
                                borderColor: '#e5e7eb'
                              }}
                              aria-label={`${opt.name}: ${val}`}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border rounded px-2 py-1 text-xs font-medium ${
                              isSelected 
                                ? 'border-black bg-black text-white' 
                                : logic.selected[opt.name] && !isSelected
                                  ? 'border-gray-300 bg-white text-gray-700 opacity-40'
                                  : 'border-gray-300 bg-white text-gray-700'
                            }`}
                            aria-pressed={isSelected}
                            aria-label={`${opt.name}: ${val}`}
                            title={`${opt.name}: ${val}`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black font-semibold">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-gray-400 text-xs line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => {
                  logic.onAddToCartSuccess() // Hook para features adicionales
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className="bg-gradient-sunset text-white hover:opacity-90 transition-opacity rounded-full font-medium shadow-md disabled:opacity-40"
              >
                {logic.inStock ? 'Agregar' : 'Agotado'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}