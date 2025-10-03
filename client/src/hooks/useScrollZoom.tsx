import { useEffect, useRef, useState } from 'react';

interface ScrollZoomOptions {
  minScale?: number;
  maxScale?: number;
  threshold?: number;
}

export default function useScrollZoom(options: ScrollZoomOptions = {}) {
  const {
    minScale = 1,
    maxScale = 1.2,
    threshold = 300
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(minScale);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const elementCenter = elementTop + elementHeight / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < threshold) {
        const progress = 1 - (distance / threshold);
        const newScale = minScale + (progress * (maxScale - minScale));
        setScale(newScale);
      } else if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        setScale(minScale);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [minScale, maxScale, threshold]);

  return { ref, scale };
}
