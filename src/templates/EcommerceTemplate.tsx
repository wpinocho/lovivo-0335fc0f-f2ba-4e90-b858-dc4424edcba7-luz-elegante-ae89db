import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={`py-4 backdrop-blur-xl bg-background/80 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="hover:opacity-80 transition-opacity">
            <BrandLogoLeft />
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {!loadingCollections && hasCollections && (
                <ScrollLink 
                  to="/#collections" 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                >
                  Colecciones
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-sunset group-hover:w-full transition-all duration-300"></span>
                </ScrollLink>
              )}
              <ScrollLink 
                to="/#products" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
              >
                Productos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-sunset group-hover:w-full transition-all duration-300"></span>
              </ScrollLink>
              <Link 
                to="/blog" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-sunset group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-3">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10 transition-colors"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-sunset text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`relative py-16 overflow-hidden ${footerClassName}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90"></div>
      <div className="absolute inset-0 bg-gradient-sunset opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="invert">
              <BrandLogoLeft />
            </div>
            <p className="mt-4 text-background/70 text-sm">
              Iluminación inteligente que cuida tu salud y respeta tu ritmo natural
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-background text-lg">Enlaces</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors text-sm"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-background/70 hover:text-background transition-colors text-sm"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-background text-lg">Síguenos</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center">
          <p className="text-background/60 text-sm">
            &copy; 2025 Spectrum. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}