import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  imageSrc?: string;
  onCtaClick?: () => void;
}

export default function Hero({
  title = "Spring Collection 2024",
  subtitle = "Discover timeless elegance with our new arrivals",
  ctaText = "Shop Now",
  imageSrc,
  onCtaClick
}: HeroProps) {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-muted">
      {/* Hero Image */}
      {imageSrc && (
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt="Hero"
            className="w-full h-full object-cover object-center"
            data-testid="img-hero"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light mb-4 md:mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            {title}
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 max-w-lg leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            {subtitle}
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={onCtaClick}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
            data-testid="button-hero-cta"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
