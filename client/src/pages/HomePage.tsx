import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import CategoryBanner from "@/components/CategoryBanner";
import ParallaxSection from "@/components/ParallaxSection";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedSection from "@/components/AnimatedSection";

// Import product images
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';
import heroImage from '@assets/generated_images/Fashion_hero_editorial_image_5b15abc4.png';

//todo: remove mock functionality
const mockProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear' },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isSale: true, salePrice: 99 },
  { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear' },
  { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms', isNew: true },
  { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics' },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories' },
  { id: '8', name: 'Cashmere Sweater Beige', price: 189, image: sweater, category: 'Knitwear', isSale: true, salePrice: 149 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //todo: remove mock functionality
  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.isSale && product.salePrice ? product.salePrice : product.price,
        quantity: 1,
        image: product.image,
        size: 'M'
      }]);
    }
    
    console.log('Added to cart:', productId);
  };

  //todo: remove mock functionality
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  //todo: remove mock functionality
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen />
      
      <div className="flex items-center justify-end p-2 border-b">
        <ThemeToggle />
      </div>
      
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        {/* Hero Carousel */}
        <HeroCarousel
          slides={[
            {
              id: '1',
              title: 'Spring Collection 2024',
              subtitle: 'Discover timeless elegance with our new arrivals',
              ctaText: 'Shop Now',
              imageSrc: heroImage,
              onCtaClick: () => console.log('Shop now clicked')
            },
            {
              id: '2',
              title: 'Winter Essentials',
              subtitle: 'Stay warm with our curated collection of cozy pieces',
              ctaText: 'Explore Collection',
              imageSrc: blazer,
              onCtaClick: () => console.log('Winter clicked')
            },
            {
              id: '3',
              title: 'Luxury Accessories',
              subtitle: 'Complete your look with handcrafted pieces',
              ctaText: 'Shop Accessories',
              imageSrc: handbag,
              onCtaClick: () => console.log('Accessories clicked')
            }
          ]}
        />

        {/* New Arrivals Carousel */}
        <AnimatedSection animation="fade-in-up" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <ProductCarousel
            title="New Arrivals"
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onWishlist={(id) => console.log('Added to wishlist:', id)}
          />
        </AnimatedSection>

        {/* Category Carousel */}
        <AnimatedSection animation="fade-in" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <CategoryCarousel
            categories={[
              { id: 'outerwear', name: 'Outerwear', imageSrc: coat, count: 24, onClick: () => console.log('Outerwear') },
              { id: 'knitwear', name: 'Knitwear', imageSrc: sweater, count: 18, onClick: () => console.log('Knitwear') },
              { id: 'footwear', name: 'Footwear', imageSrc: sneakers, count: 32, onClick: () => console.log('Footwear') },
              { id: 'accessories', name: 'Accessories', imageSrc: handbag, count: 15, onClick: () => console.log('Accessories') },
              { id: 'bottoms', name: 'Bottoms', imageSrc: trousers, count: 28, onClick: () => console.log('Bottoms') }
            ]}
          />
        </AnimatedSection>

        {/* Parallax Section */}
        <ParallaxSection
          imageSrc={coat}
          title="Crafted for Excellence"
          subtitle="Every piece tells a story of timeless craftsmanship"
          ctaText="Discover More"
          onCtaClick={() => console.log('Parallax clicked')}
          height="lg"
        />

        {/* Featured Products Carousel */}
        <AnimatedSection animation="fade-in-up" delay={100} className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <ProductCarousel
            title="Featured Collection"
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onWishlist={(id) => console.log('Added to wishlist:', id)}
          />
        </AnimatedSection>

        {/* Promo Banner */}
        <AnimatedSection animation="scale-in" className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
          <CategoryBanner
            title="Limited Time Offer"
            description="Up to 30% off on selected items"
            imageSrc={handbag}
            onCtaClick={() => console.log('Promo clicked')}
          />
        </AnimatedSection>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
