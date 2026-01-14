import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-calm">
              <span className="text-white/80 text-sm">Sin imagen</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-xl line-clamp-1 bg-gradient-sunset bg-clip-text text-transparent">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-gradient-sunrise text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                Destacada
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-gradient-sunset text-white hover:opacity-90 transition-opacity rounded-full font-medium"
            onClick={() => onViewProducts(collection.id)}
          >
            Ver Productos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}