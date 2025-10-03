import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-background flex items-center justify-center animate-fade-out"
      data-testid="screen-loading"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 animate-fade-in-up">
          LUXE
        </h1>
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
