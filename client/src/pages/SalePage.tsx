import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Percent, Tag, TrendingUp, Flame, Zap, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';

const flashSaleProducts = [
  { id: 'f1', name: 'Classic White Sneakers', price: 129, salePrice: 89, image: sneakers, category: 'Footwear', discount: 31, endsIn: 7200 },
  { id: 'f2', name: 'Luxury Black Coat', price: 399, salePrice: 279, image: coat, category: 'Outerwear', discount: 30, endsIn: 7200 },
  { id: 'f3', name: 'Navy Blue Blazer', price: 299, salePrice: 199, image: blazer, category: 'Blazers', discount: 33, endsIn: 7200 },
  { id: 'f4', name: 'Leather Handbag', price: 249, salePrice: 169, image: handbag, category: 'Accessories', discount: 32, endsIn: 7200 },
];

const dealsProducts = [
  { id: 'd1', name: 'Cashmere Sweater', price: 189, salePrice: 149, image: sweater, category: 'Knitwear', discount: 21 },
  { id: 'd2', name: 'Wide-Leg Trousers', price: 159, salePrice: 119, image: trousers, category: 'Bottoms', discount: 25 },
  { id: 'd3', name: 'Classic Sneakers', price: 149, salePrice: 99, image: sneakers, category: 'Footwear', discount: 34 },
  { id: 'd4', name: 'Black Coat', price: 399, salePrice: 299, image: coat, category: 'Outerwear', discount: 25 },
];

const trendingDeals = [
  { id: 't1', name: 'White Sneakers', price: 129, salePrice: 99, image: sneakers, category: 'Footwear', discount: 23, views: 1547, sales: 89 },
  { id: 't2', name: 'Navy Blazer', price: 299, salePrice: 229, image: blazer, category: 'Blazers', discount: 23, views: 1203, sales: 67 },
  { id: 't3', name: 'Cashmere Sweater', price: 189, salePrice: 139, image: sweater, category: 'Knitwear', discount: 26, views: 987, sales: 54 },
  { id: 't4', name: 'Leather Handbag', price: 249, salePrice: 189, image: handbag, category: 'Accessories', discount: 24, views: 876, sales: 43 },
];

const flipDeals = [
  { id: 'flip1', name: 'Premium Coat', price: 399, salePrice: 279, image: coat, category: 'Outerwear', discount: 30, savings: 120 },
  { id: 'flip2', name: 'Tailored Blazer', price: 299, salePrice: 209, image: blazer, category: 'Blazers', discount: 30, savings: 90 },
  { id: 'flip3', name: 'Designer Handbag', price: 249, salePrice: 174, image: handbag, category: 'Accessories', discount: 30, savings: 75 },
  { id: 'flip4', name: 'Wide-Leg Trousers', price: 159, salePrice: 111, image: trousers, category: 'Bottoms', discount: 30, savings: 48 },
];

const mockProducts = [
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isSale: true, salePrice: 99 },
  { id: '8', name: 'Cashmere Sweater Navy', price: 189, image: sweater, category: 'Knitwear', isSale: true, salePrice: 149 },
  { id: '9', name: 'Summer Sneakers', price: 149, image: sneakers, category: 'Footwear', isSale: true, salePrice: 119 },
  { id: '12', name: 'Wool Sweater', price: 179, image: sweater, category: 'Knitwear', isSale: true, salePrice: 139 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex items-center gap-1 sm:gap-2" data-testid="countdown-timer">
      <div className="flex flex-col items-center bg-gradient-to-br from-red-500 to-orange-500 text-white px-2 py-1 rounded-md min-w-[2.5rem]">
        <span className="text-lg sm:text-xl font-bold leading-none" data-testid="countdown-hours">{String(hours).padStart(2, '0')}</span>
        <span className="text-[0.6rem] uppercase">hrs</span>
      </div>
      <span className="text-lg font-bold">:</span>
      <div className="flex flex-col items-center bg-gradient-to-br from-red-500 to-orange-500 text-white px-2 py-1 rounded-md min-w-[2.5rem]">
        <span className="text-lg sm:text-xl font-bold leading-none" data-testid="countdown-minutes">{String(minutes).padStart(2, '0')}</span>
        <span className="text-[0.6rem] uppercase">min</span>
      </div>
      <span className="text-lg font-bold">:</span>
      <div className="flex flex-col items-center bg-gradient-to-br from-red-500 to-orange-500 text-white px-2 py-1 rounded-md min-w-[2.5rem]">
        <span className="text-lg sm:text-xl font-bold leading-none" data-testid="countdown-seconds">{String(secs).padStart(2, '0')}</span>
        <span className="text-[0.6rem] uppercase">sec</span>
      </div>
    </div>
  );
}

function FlashSaleCarousel({ products, onAddToCart }: { products: typeof flashSaleProducts; onAddToCart: (id: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative" data-testid="carousel-flash-sale">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover-elevate" data-testid={`card-flash-sale-${product.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      data-testid={`img-flash-sale-${product.id}`}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
                        <Flame className="w-3 h-3 mr-1" />
                        {product.discount}% OFF
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Flash
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-medium line-clamp-1" data-testid={`text-flash-sale-name-${product.id}`}>{product.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-red-600" data-testid={`text-flash-sale-price-${product.id}`}>${product.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Ends in:</span>
                      </div>
                      <CountdownTimer seconds={product.endsIn} />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0"
                      onClick={() => onAddToCart(product.id)}
                      data-testid={`button-add-to-cart-${product.id}`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-flash-sale-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-flash-sale-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function DealsShowcaseSlider({ products, onAddToCart }: { products: typeof dealsProducts; onAddToCart: (id: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative" data-testid="carousel-deals-showcase">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="relative overflow-hidden border-2 border-orange-500/20 hover-elevate" data-testid={`card-deals-showcase-${product.id}`}>
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg mt-8 ml-4">{product.discount}%</span>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-deals-showcase-${product.id}`}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    <h3 className="font-medium line-clamp-1" data-testid={`text-deals-showcase-name-${product.id}`}>{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold" data-testid={`text-deals-showcase-price-${product.id}`}>${product.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => onAddToCart(product.id)}
                      data-testid={`button-deals-add-to-cart-${product.id}`}
                    >
                      Shop Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-deals-showcase-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-deals-showcase-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function FlipDealCard({ product, onAddToCart }: { product: typeof flipDeals[0]; onAddToCart: (id: string) => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000 h-[400px]"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      data-testid={`card-flip-deal-${product.id}`}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card className="absolute inset-0 overflow-hidden backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="relative h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid={`img-flip-deal-front-${product.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-3 py-1">
                {product.discount}% OFF
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm opacity-90 mb-2">{product.category}</p>
              <h3 className="text-2xl font-serif font-light mb-3" data-testid={`text-flip-deal-name-${product.id}`}>{product.name}</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">${product.salePrice}</span>
                <span className="text-lg line-through opacity-70">${product.price}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Back */}
        <Card 
          className="absolute inset-0 overflow-hidden backface-hidden bg-gradient-to-br from-red-500 to-orange-500 text-white p-6 flex flex-col justify-center items-center" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          data-testid={`card-flip-deal-back-${product.id}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Zap className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">YOU SAVE</h3>
            <p className="text-6xl font-bold mb-6" data-testid={`text-flip-deal-savings-${product.id}`}>${product.savings}</p>
            <div className="space-y-2 mb-6">
              <p className="text-lg">Original: ${product.price}</p>
              <p className="text-lg">Sale: ${product.salePrice}</p>
            </div>
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-white/90 w-full"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              data-testid={`button-flip-deal-add-to-cart-${product.id}`}
            >
              Add to Cart
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function TrendingDealsCarousel({ products, onAddToCart }: { products: typeof trendingDeals; onAddToCart: (id: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative" data-testid="carousel-trending-deals">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="overflow-hidden hover-elevate" data-testid={`card-trending-deal-${product.id}`}>
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-sm">
                        {product.discount}% OFF
                      </Badge>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        data-testid={`img-trending-deal-${product.id}`}
                      />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-medium line-clamp-1" data-testid={`text-trending-deal-name-${product.id}`}>{product.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold" data-testid={`text-trending-deal-price-${product.id}`}>${product.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          👁️
                        </motion.div>
                        <span data-testid={`text-trending-views-${product.id}`}>{product.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🔥
                        </motion.div>
                        <span data-testid={`text-trending-sales-${product.id}`}>{product.sales} sold</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => onAddToCart(product.id)}
                      data-testid={`button-trending-add-to-cart-${product.id}`}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-trending-deals-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
        data-testid="button-trending-deals-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function SalePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: string) => {
    const allProducts = [...flashSaleProducts, ...dealsProducts, ...trendingDeals, ...flipDeals, ...mockProducts] as any[];
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    const price = product.salePrice || product.price;
    
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
        price: price,
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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-500/10 via-background to-orange-500/10">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle, red 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge variant="destructive" className="mb-6 gap-1 text-base px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500">
                  <Flame className="w-4 h-4" />
                  HOT SALE - Limited Time Only
                </Badge>
              </motion.div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Flash Sale
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Don't miss out on incredible savings. Premium fashion at unbeatable prices.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30"
                >
                  <Percent className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Up to 40% Off</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
                >
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="font-medium">Hurry - Ends Soon!</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flash Sale Carousel */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl sm:text-4xl font-serif font-light">Flash Sale</h2>
            </div>
            <p className="text-muted-foreground">Limited quantities - Shop before time runs out!</p>
          </motion.div>
          <FlashSaleCarousel products={flashSaleProducts} onAddToCart={handleAddToCart} />
        </section>

        {/* Deals Showcase Slider */}
        <section className="bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <Tag className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl sm:text-4xl font-serif font-light">Today's Best Deals</h2>
              </div>
              <p className="text-muted-foreground">Curated selections at incredible prices</p>
            </motion.div>
            <DealsShowcaseSlider products={dealsProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* Flip Deal Cards */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl sm:text-4xl font-serif font-light">Savings Reveal</h2>
            </div>
            <p className="text-muted-foreground">Hover to see how much you save</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flipDeals.map((product) => (
              <FlipDealCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Trending Deals Carousel */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-pink-600" />
                <h2 className="text-3xl sm:text-4xl font-serif font-light">Trending Deals</h2>
              </div>
              <p className="text-muted-foreground">Most popular items flying off the shelves</p>
            </motion.div>
            <TrendingDealsCarousel products={trendingDeals} onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* All Sale Items */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4">
              All Sale Items
            </h2>
            <p className="text-muted-foreground text-lg">
              Premium quality at discounted prices
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
