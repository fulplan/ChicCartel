import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ParallaxSectionProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  height?: 'sm' | 'md' | 'lg';
}

export default function ParallaxSection({
  imageSrc,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  height = 'md'
}: ParallaxSectionProps) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffsetY(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heightClasses = {
    sm: 'h-64 md:h-80',
    md: 'h-80 md:h-96',
    lg: 'h-96 md:h-[32rem]'
  };

  return (
    <div 
      ref={sectionRef}
      className={`relative ${heightClasses[height]} overflow-hidden`}
      data-testid="section-parallax"
    >
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{ 
          transform: `translateY(${offsetY * -0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          data-testid="img-parallax"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl animate-fade-in-up">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4"
            data-testid="text-parallax-title"
          >
            {title}
          </h2>
          {subtitle && (
            <p 
              className="text-base sm:text-lg md:text-xl mb-6 text-white/90"
              data-testid="text-parallax-subtitle"
            >
              {subtitle}
            </p>
          )}
          {ctaText && (
            <Button
              size="lg"
              variant="outline"
              onClick={onCtaClick}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all hover:scale-105"
              data-testid="button-parallax-cta"
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
