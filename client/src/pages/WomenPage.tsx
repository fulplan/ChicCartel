import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star } from "lucide-react";

import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import heroImage from '@assets/generated_images/Fashion_hero_editorial_image_5b15abc4.png';

const mockProducts = {
  all: [
    { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear' },
    { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms' },
    { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics' },
    { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories' },
    { id: '8', name: 'Cashmere Sweater Navy', price: 189, image: sweater, category: 'Knitwear' },
  ],
  clothing: [
    { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear' },
    { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms' },
    { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics' },
  ],
  accessories: [
    { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories' },
  ],
};

const collections = [
  {
    id: 'essentials',
    title: 'Essential Basics',
    description: 'Timeless wardrobe staples for every day',
    image: tshirt,
    gradient: 'from-pink-500/20 to-purple-500/20'
  },
  {
    id: 'luxury',
    title: 'Luxury Knitwear',
    description: 'Soft cashmere pieces for elegant comfort',
    image: sweater,
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'tailored',
    title: 'Tailored Collection',
    description: 'Sophisticated pieces for the modern woman',
    image: blazer,
    gradient: 'from-pink-600/20 to-purple-600/20'
  },
  {
    id: 'outerwear',
    title: 'Statement Outerwear',
    description: 'Make an impression with timeless coats',
    image: coat,
    gradient: 'from-purple-600/20 to-pink-600/20'
  }
];

const lookbookSlides = [
  {
    id: 'look1',
    title: 'Minimalist Elegance',
    subtitle: 'Clean lines, maximum impact',
    image: heroImage
  },
  {
    id: 'look2',
    title: 'Casual Sophistication',
    subtitle: 'Effortless style for every day',
    image: coat
  },
  {
    id: 'look3',
    title: 'Power Dressing',
    subtitle: 'Confidence in every stitch',
    image: blazer
  }
];

const categories = [
  {
    id: 'dresses',
    name: 'Dresses',
    icon: Sparkles,
    image: heroImage,
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'tops',
    name: 'Tops & Blouses',
    icon: Heart,
    image: tshirt,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    icon: Star,
    image: coat,
    color: 'from-pink-600 to-purple-600'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Sparkles,
    image: handbag,
    color: 'from-purple-600 to-pink-500'
  }
];

const testimonials = [
  {
    id: 1,
    quote: "The quality and attention to detail is unmatched. Every piece feels luxurious and timeless.",
    author: "Emma Richardson",
    role: "Fashion Enthusiast"
  },
  {
    id: 2,
    quote: "I love how these pieces make me feel - confident, elegant, and ready to take on the world.",
    author: "Sophia Chen",
    role: "Style Blogger"
  },
  {
    id: 3,
    quote: "Finally, a collection that understands modern women need both style and functionality.",
    author: "Olivia Martinez",
    role: "Creative Director"
  },
  {
    id: 4,
    quote: "The craftsmanship is exceptional. These aren't just clothes - they're investments in yourself.",
    author: "Isabella Thompson",
    role: "Fashion Designer"
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

export default function WomenPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [collectionsRef, collectionsApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [collectionsIndex, setCollectionsIndex] = useState(0);

  const [lookbookRef, lookbookApi] = useEmblaCarousel(
    { loop: true, duration: 30 }
  );
  const [lookbookIndex, setLookbookIndex] = useState(0);

  const [testimonialsRef, testimonialsApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const handleAddToCart = (productId: string) => {
    const allProducts = [...mockProducts.all];
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

  const scrollLookbookPrev = useCallback(() => {
    if (lookbookApi) lookbookApi.scrollPrev();
  }, [lookbookApi]);

  const scrollLookbookNext = useCallback(() => {
    if (lookbookApi) lookbookApi.scrollNext();
  }, [lookbookApi]);

  const onCollectionsSelect = useCallback(() => {
    if (!collectionsApi) return;
    setCollectionsIndex(collectionsApi.selectedScrollSnap());
  }, [collectionsApi]);

  const onLookbookSelect = useCallback(() => {
    if (!lookbookApi) return;
    setLookbookIndex(lookbookApi.selectedScrollSnap());
  }, [lookbookApi]);

  useEffect(() => {
    if (!collectionsApi) return;
    onCollectionsSelect();
    collectionsApi.on('select', onCollectionsSelect);
    collectionsApi.on('reInit', onCollectionsSelect);
  }, [collectionsApi, onCollectionsSelect]);

  useEffect(() => {
    if (!lookbookApi) return;
    onLookbookSelect();
    lookbookApi.on('select', onLookbookSelect);
    lookbookApi.on('reInit', onLookbookSelect);
  }, [lookbookApi, onLookbookSelect]);

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
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-background" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-primary bg-clip-text text-transparent">
                Women
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Elegant pieces designed for the modern woman. Timeless styles that empower and inspire.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Collections Carousel with Autoplay */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Featured Collections
              </h2>
            </div>

            <div className="relative" data-testid="carousel-collections">
              <div className="overflow-hidden rounded-2xl" ref={collectionsRef}>
                <div className="flex">
                  {collections.map((collection, index) => (
                    <div key={collection.id} className="flex-[0_0_100%] min-w-0 px-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group"
                        data-testid={`card-collection-${collection.id}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
                        <img 
                          src={collection.image}
                          alt={collection.title}
                          className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                          data-testid={`img-collection-${collection.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-end p-8 md:p-12">
                          <div className="text-white max-w-2xl">
                            <h3 className="text-3xl md:text-5xl font-serif font-light mb-3" data-testid={`text-collection-title-${collection.id}`}>
                              {collection.title}
                            </h3>
                            <p className="text-lg text-white/90 mb-6" data-testid={`text-collection-desc-${collection.id}`}>
                              {collection.description}
                            </p>
                            <Button 
                              variant="outline" 
                              size="lg"
                              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                              data-testid={`button-collection-cta-${collection.id}`}
                            >
                              Explore Collection
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {collections.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === collectionsIndex 
                        ? 'w-8 bg-gradient-to-r from-pink-600 to-purple-600' 
                        : 'w-2 bg-muted-foreground/30'
                    }`}
                    data-testid={`button-collections-dot-${index}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Lookbook Slider */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
                Lookbook
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover your signature style with our curated looks
              </p>
            </motion.div>

            <div className="relative" data-testid="carousel-lookbook">
              <div className="overflow-hidden rounded-3xl" ref={lookbookRef}>
                <div className="flex">
                  {lookbookSlides.map((slide) => (
                    <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                        <img 
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-lookbook-${slide.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 flex items-end justify-center p-8 md:p-12 lg:p-16"
                        >
                          <div className="text-center text-white max-w-3xl">
                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-4" data-testid={`text-lookbook-title-${slide.id}`}>
                              {slide.title}
                            </h3>
                            <p className="text-lg md:text-xl text-white/90" data-testid={`text-lookbook-subtitle-${slide.id}`}>
                              {slide.subtitle}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={scrollLookbookPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
                data-testid="button-lookbook-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={scrollLookbookNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hidden md:flex"
                data-testid="button-lookbook-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {lookbookSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === lookbookIndex 
                        ? 'w-8 bg-white' 
                        : 'w-2 bg-white/50'
                    }`}
                    data-testid={`button-lookbook-dot-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Animated Category Cards */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`card-category-${category.id}`}
                >
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-muted/50 to-muted hover-elevate cursor-pointer h-[280px]">
                    <div className="absolute inset-0">
                      <img 
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transition-transform duration-700"
                        data-testid={`img-category-${category.id}`}
                      />
                    </div>
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`mb-4 p-4 rounded-full bg-gradient-to-r ${category.color}`}
                      >
                        <Icon className="w-8 h-8 text-white" data-testid={`icon-category-${category.id}`} />
                      </motion.div>
                      <h3 className="text-xl font-serif font-light" data-testid={`text-category-name-${category.id}`}>
                        {category.name}
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button variant="ghost" size="sm" className="text-primary">
                          Shop Now →
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Style Inspiration
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What our community is saying
              </p>
            </motion.div>

            <div className="relative max-w-6xl mx-auto" data-testid="carousel-testimonials">
              <div className="overflow-hidden" ref={testimonialsRef}>
                <div className="flex gap-6">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-pink-200/20 dark:border-purple-500/20">
                          <div className="flex items-start gap-3 mb-6">
                            <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                            <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                            <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                            <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                            <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                          </div>
                          <blockquote className="text-foreground mb-6 italic leading-relaxed" data-testid={`text-testimonial-quote-${testimonial.id}`}>
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="border-t pt-4">
                            <p className="font-medium" data-testid={`text-testimonial-author-${testimonial.id}`}>
                              {testimonial.author}
                            </p>
                            <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                              {testimonial.role}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section with Tabs */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-light">Shop Women's</h2>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-initial" data-testid="tab-all">All Items</TabsTrigger>
                <TabsTrigger value="clothing" className="flex-1 sm:flex-initial" data-testid="tab-clothing">Clothing</TabsTrigger>
                <TabsTrigger value="accessories" className="flex-1 sm:flex-initial" data-testid="tab-accessories">Accessories</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <ProductGrid
                products={mockProducts.all}
                onAddToCart={handleAddToCart}
                onWishlist={(id) => console.log('Added to wishlist:', id)}
              />
            </TabsContent>

            <TabsContent value="clothing" className="mt-0">
              <ProductGrid
                products={mockProducts.clothing}
                onAddToCart={handleAddToCart}
                onWishlist={(id) => console.log('Added to wishlist:', id)}
              />
            </TabsContent>

            <TabsContent value="accessories" className="mt-0">
              <ProductGrid
                products={mockProducts.accessories}
                onAddToCart={handleAddToCart}
                onWishlist={(id) => console.log('Added to wishlist:', id)}
              />
            </TabsContent>
          </Tabs>
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
