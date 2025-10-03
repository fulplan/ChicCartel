import ProductCard from "./ProductCard";

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

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export default function ProductGrid({ products, onAddToCart, onWishlist }: ProductGridProps) {
  return (
    <div 
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
      data-testid="grid-products"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
          onWishlist={onWishlist}
        />
      ))}
    </div>
  );
}
