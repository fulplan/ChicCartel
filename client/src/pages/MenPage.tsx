import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Truck, Award, Star } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';

const heroSlides = [
  {
    id: 'power',
    title: 'Power & Presence',
    subtitle: 'Commanding style for the modern professional. Expertly tailored pieces that make a statement.',
    ctaText: 'Shop Power Suits',
    imageSrc: blazer,
  },
  {
    id: 'urban',
    title: 'Urban Edge',
    subtitle: 'Street-inspired sophistication. Bold designs that blend comfort with contemporary style.',
    ctaText: 'Explore Urban Collection',
    imageSrc: coat,
  },
  {
    id: 'refined',
    title: 'Refined Essentials',
    subtitle: 'Timeless pieces crafted with precision. Elevate your everyday with premium basics.',
    ctaText: 'Shop Essentials',
    imageSrc: tshirt,
  },
];

const categories = [
  { id: 'outerwear', name: 'Outerwear', imageSrc: coat, count: 24 },
  { id: 'blazers', name: 'Blazers & Suits', imageSrc: blazer, count: 18 },
  { id: 'footwear', name: 'Footwear', imageSrc: sneakers, count: 32 },
  { id: 'knitwear', name: 'Knitwear', imageSrc: sweater, count: 16 },
  { id: 'trousers', name: 'Trousers', imageSrc: trousers, count: 28 },
  { id: 'basics', name: 'Essential Basics', imageSrc: tshirt, count: 42 },
];

const featuredProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear' },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isNew: true },
  { id: '4', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics' },
  { id: '5', name: 'Cashmere Sweater', price: 179, image: sweater, category: 'Knitwear' },
  { id: '6', name: 'Olive Wide-Leg Trousers', price: 159, image: trousers, category: 'Trousers', isNew: true },
];

const newArrivals = [
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isNew: true },
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '6', name: 'Olive Wide-Leg Trousers', price: 159, image: trousers, category: 'Trousers', isNew: true },
  { id: '5', name: 'Cashmere Sweater', price: 179, image: sweater, category: 'Knitwear', isNew: true },
];

const brandStory = [
  {
    id: 'craftsmanship',
    title: 'Uncompromising Craftsmanship',
    description: 'Every piece is meticulously crafted with attention to detail, using premium materials sourced from the finest mills worldwide.',
    icon: Award,
  },
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'We use only the highest quality fabrics and materials, ensuring each garment stands the test of time with proper care.',
    icon: Shield,
  },
  {
    id: 'delivery',
    title: 'Express Delivery',
    description: 'Fast, reliable shipping to your doorstep. Track your order every step of the way with our premium delivery service.',
    icon: Truck,
  },
  {
    id: 'satisfaction',
    title: 'Guaranteed Satisfaction',
    description: 'Not completely satisfied? Our 30-day return policy ensures you find the perfect fit for your style and lifestyle.',
    icon: Star,
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function MenPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const handleAddToCart = (productId: string) => {
    const allProducts = [...featuredProducts, ...newArrivals];
    const product = allProducts.find(p => p.id === productId);
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
        price: product.price,
        quantity: 1,
        image: product.image,
        size: 'M'
      }]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-end p-3 md:p-4 border-b">
        <ThemeToggle />
      </div>
      
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Bold Hero Carousel */}
        <HeroCarousel slides={heroSlides} />

        {/* Category Showcase Slider */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4"
                data-testid="text-category-section-title"
              >
                Explore Your Style
              </h2>
              <p className="text-lg text-white/70 max-w-2xl" data-testid="text-category-section-subtitle">
                Discover curated collections designed for the modern man who demands excellence in every detail.
              </p>
            </motion.div>

            <CategoryCarousel categories={categories} />
          </div>
        </section>

        {/* Dynamic Product Feature Section with Interactive Cards */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <Badge 
                variant="outline" 
                className="mb-4 text-xs uppercase tracking-wider border-foreground/20"
                data-testid="badge-featured-label"
              >
                Curated Selection
              </Badge>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4"
                data-testid="text-featured-title"
              >
                Featured Pieces
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-subtitle">
                Handpicked essentials that define contemporary masculine style
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {featuredProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`card-featured-product-${product.id}`}
                >
                  <Card className="overflow-hidden border-border/50 hover-elevate transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        data-testid={`img-featured-product-${product.id}`}
                      />
                      {product.isNew && (
                        <Badge 
                          className="absolute top-4 right-4 bg-black text-white border-0"
                          data-testid={`badge-new-${product.id}`}
                        >
                          NEW
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-full bg-white text-black hover:bg-white/90"
                          data-testid={`button-add-to-cart-${product.id}`}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2" data-testid={`text-category-${product.id}`}>
                        {product.category}
                      </p>
                      <h3 className="text-xl font-serif font-light mb-2" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-lg font-medium" data-testid={`text-product-price-${product.id}`}>
                        ${product.price}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <ProductCarousel
              title="Complete the Look"
              products={featuredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* New Arrivals Carousel */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <Badge 
                    variant="outline" 
                    className="mb-4 text-xs uppercase tracking-wider"
                    data-testid="badge-new-arrivals-label"
                  >
                    Just Landed
                  </Badge>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light" data-testid="text-new-arrivals-title">
                    New Arrivals
                  </h2>
                </div>
                <Button 
                  variant="outline" 
                  className="group"
                  data-testid="button-view-all-arrivals"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            <ProductCarousel
              title=""
              products={newArrivals}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* Brand Story & Values Carousel */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4"
                data-testid="text-brand-story-title"
              >
                The Standard of Excellence
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto" data-testid="text-brand-story-subtitle">
                Our commitment to quality, craftsmanship, and your satisfaction
              </p>
            </motion.div>

            <div className="overflow-hidden" ref={emblaRef} data-testid="carousel-brand-story">
              <div className="flex">
                {brandStory.map((story, index) => (
                  <div 
                    key={story.id} 
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card 
                        className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 h-full"
                        data-testid={`card-brand-story-${story.id}`}
                      >
                        <div className="p-8">
                          <div className="mb-6">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                              <story.icon className="w-7 h-7 text-white" data-testid={`icon-brand-story-${story.id}`} />
                            </div>
                          </div>
                          <h3 
                            className="text-2xl font-serif font-light mb-4 text-white"
                            data-testid={`text-brand-story-title-${story.id}`}
                          >
                            {story.title}
                          </h3>
                          <p 
                            className="text-white/70 leading-relaxed"
                            data-testid={`text-brand-story-description-${story.id}`}
                          >
                            {story.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Style Guide Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="mb-4 text-xs uppercase tracking-wider"
                  data-testid="badge-style-guide-label"
                >
                  Style Guide
                </Badge>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-6"
                  data-testid="text-style-guide-title"
                >
                  Master Your Style
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="text-style-guide-description">
                  Elevate your wardrobe with our expertly curated style guide. Learn how to build a versatile 
                  collection that transitions seamlessly from boardroom to weekend, from dawn to dusk.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Build a capsule wardrobe',
                    'Mix formal and casual pieces',
                    'Master seasonal layering',
                    'Choose the right fit'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                      data-testid={`list-item-style-tip-${index}`}
                    >
                      <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                      <span className="text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button 
                  size="lg" 
                  className="group"
                  data-testid="button-read-style-guide"
                >
                  Read Full Guide
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[coat, blazer, sweater, trousers].map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative overflow-hidden rounded-md ${
                      index === 0 ? 'row-span-2' : ''
                    }`}
                    data-testid={`img-style-guide-${index}`}
                  >
                    <img
                      src={img}
                      alt={`Style guide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={blazer} 
              alt="Men's fashion"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 
                className="text-5xl sm:text-6xl md:text-7xl font-serif font-light mb-6"
                data-testid="text-cta-title"
              >
                Define Your Standard
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed" data-testid="text-cta-subtitle">
                Join thousands of men who refuse to compromise on quality and style. 
                Your wardrobe upgrade starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 text-base"
                  data-testid="button-cta-shop"
                >
                  Shop Men's Collection
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base"
                  data-testid="button-cta-learn"
                >
                  Learn Our Story
                </Button>
              </div>
            </motion.div>
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
