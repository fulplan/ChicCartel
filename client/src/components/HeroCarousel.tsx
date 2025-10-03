import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  imageSrc: string;
  onCtaClick?: () => void;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" data-testid="carousel-hero">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-muted">
                <div className="absolute inset-0">
                  <img
                    src={slide.imageSrc}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center animate-ken-burns"
                    data-testid={`img-hero-${slide.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
                  <div className="max-w-2xl text-white animate-fade-in-up">
                    <h2 
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light mb-4 md:mb-6 leading-tight"
                      data-testid={`text-hero-title-${slide.id}`}
                    >
                      {slide.title}
                    </h2>
                    <p 
                      className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 max-w-lg leading-relaxed"
                      data-testid={`text-hero-subtitle-${slide.id}`}
                    >
                      {slide.subtitle}
                    </p>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={slide.onCtaClick}
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto transition-all hover:scale-105"
                      data-testid={`button-hero-cta-${slide.id}`}
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        size="icon"
        variant="ghost"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            data-testid={`button-carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
