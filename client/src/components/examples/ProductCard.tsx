import ProductCard from '../ProductCard';
import productImage from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';

export default function ProductCardExample() {
  return (
    <div className="max-w-sm p-4">
      <ProductCard
        id="1"
        name="Minimalist Black Coat"
        price={299}
        image={productImage}
        category="Outerwear"
        isNew={true}
        onAddToCart={(id) => console.log('Added to cart:', id)}
        onWishlist={(id) => console.log('Added to wishlist:', id)}
      />
    </div>
  );
}
