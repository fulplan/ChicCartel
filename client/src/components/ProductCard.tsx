import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  hoverImage,
  category,
  isNew,
  isSale,
  salePrice,
  onAddToCart,
  onWishlist
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(id);
  };

  const displayPrice = isSale && salePrice ? salePrice : price;
  const hasDiscount = isSale && salePrice && salePrice < price;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-md">
        <img
          src={isHovered && hoverImage ? hoverImage : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground" data-testid="badge-new">
              New
            </Badge>
          )}
          {isSale && (
            <Badge className="bg-accent text-accent-foreground" data-testid="badge-sale">
              Sale
            </Badge>
          )}
        </div>

        {/* Actions on Hover (Desktop) / Always Visible (Mobile) */}
        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="flex-1 text-xs sm:text-sm"
            onClick={() => onAddToCart?.(id)}
            data-testid={`button-add-to-cart-${id}`}
          >
            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
          <Button
            size="icon"
            variant={isWishlisted ? "default" : "secondary"}
            onClick={handleWishlist}
            className="h-8 w-8 sm:h-9 sm:w-9"
            data-testid={`button-wishlist-${id}`}
          >
            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1 px-1">
        {category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider truncate" data-testid={`text-category-${id}`}>
            {category}
          </p>
        )}
        <h3 className="font-medium text-sm sm:text-base truncate" data-testid={`text-name-${id}`}>
          {name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm sm:text-base" data-testid={`text-price-${id}`}>
            ${displayPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
              ${price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
