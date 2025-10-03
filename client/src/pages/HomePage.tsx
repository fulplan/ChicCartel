import { useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

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
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footerwear', isSale: true, salePrice: 99 },
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
    <div className="min-h-screen flex flex-col bg-background">
      <LoadingScreen />
      
      <div className="flex items-center justify-end p-3 md:p-4 border-b">
        <ThemeToggle />
      </div>
      
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Carousel with Enhanced Styling */}
        <section className="relative">
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
        </section>

        {/* Editorial Feature Section */}
        <AnimatedSection animation="fade-in-up" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>New Season</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light mb-6 leading-tight">
                Where Elegance
                <br />
                Meets Modern
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-prose">
                Curated collections that transcend trends. Each piece is carefully selected to embody 
                timeless sophistication and contemporary style.
              </p>
              <Button size="lg" className="group">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={coat} 
                  alt="Featured Collection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* New Arrivals Carousel */}
        <AnimatedSection animation="fade-in-up" className="bg-muted/30 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 md:mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trending</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light">New Arrivals</h2>
              </div>
              <Button variant="ghost" className="hidden sm:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <ProductCarousel
              title=""
              products={mockProducts}
              onAddToCart={handleAddToCart}
              onWishlist={(id) => console.log('Added to wishlist:', id)}
            />
          </div>
        </AnimatedSection>

        {/* Category Showcase */}
        <AnimatedSection animation="fade-in" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our carefully curated collections, designed for every occasion
            </p>
          </div>
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

        {/* Parallax Section - Craftsmanship */}
        <ParallaxSection
          imageSrc={coat}
          title="Crafted for Excellence"
          subtitle="Every piece tells a story of timeless craftsmanship and attention to detail"
          ctaText="Discover Our Story"
          onCtaClick={() => console.log('Parallax clicked')}
          height="lg"
        />

        {/* Featured Collection Grid */}
        <AnimatedSection animation="fade-in-up" delay={100} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked favorites that define this season's aesthetic
            </p>
          </div>
          <ProductCarousel
            title=""
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onWishlist={(id) => console.log('Added to wishlist:', id)}
          />
        </AnimatedSection>

        {/* Premium Banner Section */}
        <AnimatedSection animation="scale-in" className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryBanner
              title="Limited Time Offer"
              description="Up to 30% off on selected items. Elevate your wardrobe with timeless pieces."
              imageSrc={handbag}
              onCtaClick={() => console.log('Promo clicked')}
            />
          </div>
        </AnimatedSection>

        {/* Brand Values Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Premium Quality",
                description: "Every piece is crafted with exceptional attention to detail and the finest materials"
              },
              {
                title: "Timeless Design",
                description: "Our collections transcend seasonal trends, offering enduring style and versatility"
              },
              {
                title: "Sustainable Luxury",
                description: "Committed to ethical practices and sustainable fashion that respects our planet"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
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
