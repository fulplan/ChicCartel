import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, Clock, ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";

import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';
import heroImage from '@assets/generated_images/Fashion_hero_editorial_image_5b15abc4.png';

const mockProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear', isNew: true },
  { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms', isNew: true },
  { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear', isNew: true },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isNew: true },
  { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics', isNew: true },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories', isNew: true },
];

const trendingProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear', isNew: true },
  { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear', isNew: true },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories', isNew: true },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isNew: true },
];

const featuredSlides = [
  {
    id: 'slide-1',
    title: 'Minimalist Elegance',
    description: 'Timeless pieces that define modern sophistication',
    image: coat,
    productId: '1'
  },
  {
    id: 'slide-2',
    title: 'Luxury Essentials',
    description: 'Premium quality for the discerning wardrobe',
    image: sweater,
    productId: '2'
  },
  {
    id: 'slide-3',
    title: 'Statement Pieces',
    description: 'Bold designs that make lasting impressions',
    image: blazer,
    productId: '4'
  }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function NewArrivalsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [heroRef, heroApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [heroSelectedIndex, setHeroSelectedIndex] = useState(0);

  const [trendingRef, trendingApi] = useEmblaCarousel(
    { 
      align: 'start',
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );
  const [canScrollTrendingPrev, setCanScrollTrendingPrev] = useState(false);
  const [canScrollTrendingNext, setCanScrollTrendingNext] = useState(false);

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

  const scrollHeroPrev = useCallback(() => {
    if (heroApi) heroApi.scrollPrev();
  }, [heroApi]);

  const scrollHeroNext = useCallback(() => {
    if (heroApi) heroApi.scrollNext();
  }, [heroApi]);

  const scrollHeroTo = useCallback((index: number) => {
    if (heroApi) heroApi.scrollTo(index);
  }, [heroApi]);

  const onHeroSelect = useCallback(() => {
    if (!heroApi) return;
    setHeroSelectedIndex(heroApi.selectedScrollSnap());
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    onHeroSelect();
    heroApi.on('select', onHeroSelect);
    heroApi.on('reInit', onHeroSelect);
  }, [heroApi, onHeroSelect]);

  const scrollTrendingPrev = useCallback(() => {
    if (trendingApi) trendingApi.scrollPrev();
  }, [trendingApi]);

  const scrollTrendingNext = useCallback(() => {
    if (trendingApi) trendingApi.scrollNext();
  }, [trendingApi]);

  const onTrendingSelect = useCallback(() => {
    if (!trendingApi) return;
    setCanScrollTrendingPrev(trendingApi.canScrollPrev());
    setCanScrollTrendingNext(trendingApi.canScrollNext());
  }, [trendingApi]);

  useEffect(() => {
    if (!trendingApi) return;
    onTrendingSelect();
    trendingApi.on('select', onTrendingSelect);
    trendingApi.on('reInit', onTrendingSelect);
  }, [trendingApi, onTrendingSelect]);

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
        <section className="relative" data-testid="section-hero-slider">
          <div className="overflow-hidden" ref={heroRef}>
            <div className="flex">
              {featuredSlides.map((slide) => (
                <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                  <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-muted">
                    <div className="absolute inset-0">
                      <motion.img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 5, ease: "linear" }}
                        data-testid={`img-hero-slide-${slide.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                    </div>

                    <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl text-white"
                      >
                        <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white" data-testid={`badge-hero-new-${slide.id}`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          New Arrival
                        </Badge>
                        <h2 
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-4 md:mb-6 leading-tight"
                          data-testid={`text-hero-title-${slide.id}`}
                        >
                          {slide.title}
                        </h2>
                        <p 
                          className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 max-w-lg leading-relaxed"
                          data-testid={`text-hero-description-${slide.id}`}
                        >
                          {slide.description}
                        </p>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => handleAddToCart(slide.productId)}
                          className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto transition-all hover:scale-105"
                          data-testid={`button-hero-shop-${slide.id}`}
                        >
                          Shop Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={scrollHeroPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
            data-testid="button-hero-prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={scrollHeroNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
            data-testid="button-hero-next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollHeroTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === heroSelectedIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                data-testid={`button-hero-dot-${index}`}
              />
            ))}
          </div>
        </section>

        <AnimatedSection animation="fade-in-up" delay={100}>
          <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6" data-testid="badge-just-landed">
                  <Sparkles className="w-4 h-4" />
                  <span>Just Landed</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-6" data-testid="text-page-title">
                  New Arrivals
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-page-subtitle">
                  Discover the latest additions to our collection. Fresh styles crafted for the modern wardrobe.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2" data-testid="info-updated-daily">
                    <Clock className="w-4 h-4" />
                    <span>Updated Daily</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <div className="flex items-center gap-2" data-testid="info-new-items">
                    <TrendingUp className="w-4 h-4" />
                    <span>{mockProducts.length} New Items</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={200}>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" data-testid="section-trending">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-2" data-testid="text-trending-title">
                  Trending Now
                </h2>
                <p className="text-muted-foreground" data-testid="text-trending-subtitle">
                  Most popular picks this week
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={scrollTrendingPrev}
                  disabled={!canScrollTrendingPrev}
                  className="hidden md:flex"
                  data-testid="button-trending-prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={scrollTrendingNext}
                  disabled={!canScrollTrendingNext}
                  className="hidden md:flex"
                  data-testid="button-trending-next"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden" ref={trendingRef}>
              <div className="flex gap-4 md:gap-6">
                {trendingProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group relative h-full"
                      data-testid={`card-trending-${product.id}`}
                    >
                      <Card className="overflow-hidden h-full hover-elevate active-elevate-2 transition-shadow">
                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            data-testid={`img-trending-${product.id}`}
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-primary text-primary-foreground" data-testid={`badge-trending-new-${product.id}`}>
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                          <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              className="flex-1 text-xs sm:text-sm"
                              onClick={() => handleAddToCart(product.id)}
                              data-testid={`button-trending-add-cart-${product.id}`}
                            >
                              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                              <span className="hidden sm:inline">Add to Cart</span>
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 sm:h-9 sm:w-9"
                              data-testid={`button-trending-wishlist-${product.id}`}
                            >
                              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider truncate" data-testid={`text-trending-category-${product.id}`}>
                            {product.category}
                          </p>
                          <h3 className="font-medium text-sm sm:text-base truncate" data-testid={`text-trending-name-${product.id}`}>
                            {product.name}
                          </h3>
                          <p className="font-medium text-sm sm:text-base" data-testid={`text-trending-price-${product.id}`}>
                            ${product.price}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={300}>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" data-testid="section-featured">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-muted/30 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <motion.img 
                  src={coat} 
                  alt="Featured New Arrival" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  data-testid="img-featured-product"
                />
                <Badge className="absolute top-4 left-4 gap-1" data-testid="badge-featured-just-in">
                  <Sparkles className="w-3 h-3" />
                  Just In
                </Badge>
              </div>
              <div className="p-8 lg:p-12">
                <Badge variant="outline" className="mb-4" data-testid="badge-featured-label">Featured</Badge>
                <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4" data-testid="text-featured-title">
                  Minimalist Black Coat
                </h2>
                <p className="text-lg text-muted-foreground mb-6" data-testid="text-featured-description">
                  The perfect blend of sophistication and comfort. This season's must-have outerwear piece.
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-3xl font-semibold" data-testid="text-featured-price">$299</span>
                  <span className="text-sm text-muted-foreground" data-testid="text-featured-shipping">Free Shipping</span>
                </div>
                <Button size="lg" onClick={() => handleAddToCart('1')} className="w-full sm:w-auto" data-testid="button-featured-add-cart">
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={400}>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" data-testid="section-all-arrivals">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4" data-testid="text-latest-title">
                Latest Releases
              </h2>
              <p className="text-muted-foreground" data-testid="text-latest-subtitle">
                Fresh from the studio, curated for your wardrobe
              </p>
            </motion.div>

            <ProductGrid
              products={mockProducts}
              onAddToCart={handleAddToCart}
              onWishlist={(id) => console.log('Added to wishlist:', id)}
            />
          </section>
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
