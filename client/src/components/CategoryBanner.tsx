import { Button } from "@/components/ui/button";

interface CategoryBannerProps {
  title: string;
  description?: string;
  imageSrc?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'default' | 'split';
}

export default function CategoryBanner({
  title,
  description,
  imageSrc,
  ctaText = "Shop Now",
  onCtaClick,
  variant = 'default'
}: CategoryBannerProps) {
  if (variant === 'split') {
    return (
      <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-md" data-testid="banner-category-split">
        {/* Image */}
        <div className="relative h-56 sm:h-64 md:h-auto bg-muted">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              data-testid="img-category-banner"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-12 bg-muted">
          <div className="max-w-md w-full">
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-3 md:mb-4"
              data-testid="text-category-title"
            >
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm sm:text-base" data-testid="text-category-description">
                {description}
              </p>
            )}
            <Button onClick={onCtaClick} className="w-full sm:w-auto" data-testid="button-category-cta">
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-md bg-muted" data-testid="banner-category-default">
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            data-testid="img-category-banner"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl">
          <h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-3 md:mb-4"
            data-testid="text-category-title"
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-white/90" data-testid="text-category-description">
              {description}
            </p>
          )}
          <Button 
            variant="outline" 
            onClick={onCtaClick}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
            data-testid="button-category-cta"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
