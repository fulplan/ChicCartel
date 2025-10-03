import { motion } from "framer-motion";
import useScrollZoom from "@/hooks/useScrollZoom";

interface ScrollZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  minScale?: number;
  maxScale?: number;
}

export default function ScrollZoomImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  minScale = 1,
  maxScale = 1.15,
}: ScrollZoomImageProps) {
  const { ref, scale } = useScrollZoom({ minScale, maxScale, threshold: 400 });

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{
          scale,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
