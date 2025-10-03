import ProductGrid from '../ProductGrid';
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';

export default function ProductGridExample() {
  const products = [
    { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
    { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear' },
    { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isSale: true, salePrice: 99 },
    { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid
        products={products}
        onAddToCart={(id) => console.log('Added to cart:', id)}
        onWishlist={(id) => console.log('Added to wishlist:', id)}
      />
    </div>
  );
}
