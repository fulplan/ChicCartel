import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight, Award, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";

import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';

const mockProducts = [
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear' },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Bags' },
  { id: '10', name: 'Designer Sneakers', price: 149, image: sneakers, category: 'Footwear' },
  { id: '11', name: 'Evening Clutch', price: 189, image: handbag, category: 'Bags' },
];

const showcaseProducts = [
  { 
    id: 'showcase-1', 
    name: 'Signature Leather Tote', 
    price: 349, 
    image: handbag, 
    category: 'Bags',
    description: 'Handcrafted Italian leather with gold-tone hardware'
  },
  { 
    id: 'showcase-2', 
    name: 'Premium Sport Sneakers', 
    price: 179, 
    image: sneakers, 
    category: 'Footwear',
    description: 'Engineered comfort meets contemporary design'
  },
  { 
    id: 'showcase-3', 
    name: 'Designer Crossbody', 
    price: 229, 
    image: handbag, 
    category: 'Bags',
    description: 'Versatile elegance for day to evening'
  },
];

const productAngles = [
  { id: 1, image: handbag, label: 'Front View' },
  { id: 2, image: handbag, label: 'Side Profile' },
  { id: 3, image: handbag, label: 'Interior' },
  { id: 4, image: handbag, label: 'Detail Shot' },
];

const brands = [
  { id: 'brand-1', name: 'MAISON LUXE', specialty: 'Premium Leather Goods', icon: Award },
  { id: 'brand-2', name: 'ATELIER GOLD', specialty: 'Fine Jewelry', icon: Star },
  { id: 'brand-3', name: 'NOIR COLLECTION', specialty: 'Designer Accessories', icon: Sparkles },
  { id: 'brand-4', name: 'ESSENCE', specialty: 'Timeless Elegance', icon: Award },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function AccessoriesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [showcaseRef, showcaseApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  const [productDetailRef, productDetailApi] = useEmblaCarousel({ loop: true });
  const [detailIndex, setDetailIndex] = useState(0);

  const [brandsRef, brandsApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const onShowcaseSelect = useCallback(() => {
    if (!showcaseApi) return;
    setShowcaseIndex(showcaseApi.selectedScrollSnap());
  }, [showcaseApi]);

  const onDetailSelect = useCallback(() => {
    if (!productDetailApi) return;
    setDetailIndex(productDetailApi.selectedScrollSnap());
  }, [productDetailApi]);

  useEffect(() => {
    if (!showcaseApi) return;
    onShowcaseSelect();
    showcaseApi.on('select', onShowcaseSelect);
  }, [showcaseApi, onShowcaseSelect]);

  useEffect(() => {
    if (!productDetailApi) return;
    onDetailSelect();
    productDetailApi.on('select', onDetailSelect);
  }, [productDetailApi, onDetailSelect]);

  const scrollShowcasePrev = useCallback(() => {
    if (showcaseApi) showcaseApi.scrollPrev();
  }, [showcaseApi]);

  const scrollShowcaseNext = useCallback(() => {
    if (showcaseApi) showcaseApi.scrollNext();
  }, [showcaseApi]);

  const scrollDetailPrev = useCallback(() => {
    if (productDetailApi) productDetailApi.scrollPrev();
  }, [productDetailApi]);

  const scrollDetailNext = useCallback(() => {
    if (productDetailApi) productDetailApi.scrollNext();
  }, [productDetailApi]);

  const handleAddToCart = (productId: string) => {
    const allProducts = [...mockProducts, ...showcaseProducts];
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
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-background to-background" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-6 gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" data-testid="badge-curated">
                <Sparkles className="w-3 h-3" />
                Curated Collection
              </Badge>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6" data-testid="text-page-title">
                Accessories
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-subtitle">
                The perfect finishing touches. Handpicked accessories to complete your signature look.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Curated Showcase Carousel with Autoplay */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-2" data-testid="text-showcase-title">
              Signature Selections
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-showcase-subtitle">
              Our most coveted pieces, curated for the discerning collector
            </p>
          </motion.div>

          <div className="relative" data-testid="carousel-showcase">
            <div className="overflow-hidden" ref={showcaseRef}>
              <div className="flex">
                {showcaseProducts.map((product, index) => (
                  <div key={product.id} className="flex-[0_0_100%] min-w-0 px-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl p-6 md:p-12 border border-amber-500/10"
                      data-testid={`card-showcase-${product.id}`}
                    >
                      <div className="order-2 lg:order-1 space-y-6">
                        <Badge variant="outline" className="border-amber-500/30 text-amber-700 dark:text-amber-400" data-testid={`badge-showcase-${product.id}`}>
                          Featured
                        </Badge>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light" data-testid={`text-showcase-name-${product.id}`}>
                          {product.name}
                        </h3>
                        <p className="text-lg text-muted-foreground" data-testid={`text-showcase-desc-${product.id}`}>
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-semibold text-amber-700 dark:text-amber-400" data-testid={`text-showcase-price-${product.id}`}>
                            ${product.price}
                          </span>
                        </div>
                        <Button 
                          size="lg" 
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
                          data-testid={`button-add-to-cart-${product.id}`}
                        >
                          Add to Cart
                        </Button>
                      </div>
                      <motion.div 
                        className="order-1 lg:order-2 aspect-square rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          data-testid={`img-showcase-${product.id}`}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={scrollShowcasePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex bg-background/80 backdrop-blur-sm border-amber-500/20"
              data-testid="button-showcase-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={scrollShowcaseNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex bg-background/80 backdrop-blur-sm border-amber-500/20"
              data-testid="button-showcase-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center gap-2 mt-6">
              {showcaseProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => showcaseApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === showcaseIndex 
                      ? 'w-8 bg-amber-600' 
                      : 'w-2 bg-amber-600/30'
                  }`}
                  data-testid={`button-showcase-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Categories Grid with Animated Reveal */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-2" data-testid="text-categories-title">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-categories-subtitle">
              Discover our complete accessory collection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Bags", count: 28, color: "amber" },
              { name: "Footwear", count: 42, color: "amber" },
              { name: "Jewelry", count: 35, color: "amber" },
              { name: "Others", count: 18, color: "amber" }
            ].map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                viewport={{ once: true }}
                className="group p-6 border rounded-lg hover-elevate transition-all text-left relative overflow-hidden"
                data-testid={`button-category-${category.name.toLowerCase()}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 transition-all duration-300" />
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-1" data-testid={`text-category-name-${category.name.toLowerCase()}`}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-category-count-${category.name.toLowerCase()}`}>
                    {category.count} items
                  </p>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-12 h-12 bg-amber-500/10 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Brands Slider */}
        <section className="bg-gradient-to-br from-amber-500/5 to-transparent py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4" data-testid="text-brands-title">
                Designer Collaborations
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-brands-subtitle">
                Partnering with the world's finest artisans and heritage brands
              </p>
            </motion.div>

            <div className="relative" data-testid="carousel-brands">
              <div className="overflow-hidden" ref={brandsRef}>
                <div className="flex gap-6">
                  {brands.map((brand, index) => {
                    const Icon = brand.icon;
                    return (
                      <div key={brand.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-background border border-amber-500/20 rounded-xl p-8 text-center hover-elevate"
                          data-testid={`card-brand-${brand.id}`}
                        >
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-6">
                            <Icon className="w-8 h-8 text-amber-600" data-testid={`icon-brand-${brand.id}`} />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 tracking-wider" data-testid={`text-brand-name-${brand.id}`}>
                            {brand.name}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`text-brand-specialty-${brand.id}`}>
                            {brand.specialty}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Detail Carousel - Different Angles */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative" data-testid="carousel-product-detail">
              <div className="overflow-hidden rounded-2xl" ref={productDetailRef}>
                <div className="flex">
                  {productAngles.map((angle) => (
                    <div key={angle.id} className="flex-[0_0_100%] min-w-0">
                      <motion.div 
                        className="aspect-square"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={angle.image} 
                          alt={angle.label}
                          className="w-full h-full object-cover rounded-2xl"
                          data-testid={`img-detail-angle-${angle.id}`}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="icon"
                variant="outline"
                onClick={scrollDetailPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                data-testid="button-detail-prev"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={scrollDetailNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                data-testid="button-detail-next"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="flex justify-center gap-2 mt-6">
                {productAngles.map((angle, index) => (
                  <button
                    key={angle.id}
                    onClick={() => productDetailApi?.scrollTo(index)}
                    className="group"
                    data-testid={`button-detail-thumbnail-${angle.id}`}
                  >
                    <div className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === detailIndex 
                        ? 'border-amber-600 ring-2 ring-amber-600/20' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}>
                      <img 
                        src={angle.image} 
                        alt={angle.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-amber-500/30 text-amber-700 dark:text-amber-400" data-testid="badge-featured-detail">
                360° View
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-serif font-light" data-testid="text-detail-title">
                Italian Leather Handbag
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-detail-description">
                Crafted from premium Italian leather, this timeless piece combines functionality with elegant design. Each bag is meticulously handcrafted by master artisans.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2" data-testid="text-detail-feature-1">
                  <span className="text-amber-600">•</span>
                  <span>Genuine Italian full-grain leather</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-detail-feature-2">
                  <span className="text-amber-600">•</span>
                  <span>Multiple compartments with premium lining</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-detail-feature-3">
                  <span className="text-amber-600">•</span>
                  <span>Adjustable shoulder strap</span>
                </li>
                <li className="flex items-start gap-2" data-testid="text-detail-feature-4">
                  <span className="text-amber-600">•</span>
                  <span>Handcrafted gold-tone hardware</span>
                </li>
              </ul>
              <div className="flex items-baseline gap-3 pt-4">
                <span className="text-4xl font-semibold text-amber-700 dark:text-amber-400" data-testid="text-detail-price">
                  $279
                </span>
              </div>
              <Button 
                size="lg"
                onClick={() => handleAddToCart('7')}
                className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
                data-testid="button-add-to-cart-detail"
              >
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </section>

        {/* All Accessories */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-light mb-4" data-testid="text-all-accessories-title">
              Complete Collection
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-all-accessories-subtitle">
              Elevate your style with our complete collection
            </p>
          </motion.div>

          <ProductGrid
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onWishlist={(id) => console.log('Added to wishlist:', id)}
          />
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
