import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Componente UI completamente editable para suscripción a newsletter.
 * El agente IA puede modificar colores, textos, layout, etc.
 * 
 * Consume lógica de HeadlessNewsletter (solo muestra email input).
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="relative py-20 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-ambient opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gradient-sunrise rounded-full p-4 shadow-xl">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-lg text-muted-foreground">
                  Recibirás nuestras mejores ofertas y consejos para mejorar tu bienestar con iluminación inteligente
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                    Únete a la Revolución de la Luz
                  </h3>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Recibe consejos exclusivos sobre iluminación saludable y ofertas especiales
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="tu@correo.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12 rounded-full px-6 border-2"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    size="lg"
                    className="bg-gradient-sunset text-white hover:opacity-90 transition-opacity rounded-full px-8 shadow-xl"
                  >
                    {logic.isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive font-medium">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};