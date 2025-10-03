import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export default function ProductCarousel({ 
  title, 
  products, 
  onAddToCart, 
  onWishlist 
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light" data-testid="text-carousel-title">
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="hidden md:flex"
            data-testid="button-product-carousel-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="hidden md:flex"
            data-testid="button-product-carousel-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-[0_0_50%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0"
            >
              <ProductCard
                {...product}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
