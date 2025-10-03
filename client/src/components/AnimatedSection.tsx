import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  className = ''
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  const delayStyle = { animationDelay: `${delay}ms` };

  return (
    <div 
      ref={ref} 
      className={`${animationClass} ${className}`}
      style={isVisible ? delayStyle : undefined}
    >
      {children}
    </div>
  );
}
