import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Clock } from "lucide-react";

import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';

const mockProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear', isNew: true },
  { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms', isNew: true },
  { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear', isNew: true },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isNew: true },
  { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics', isNew: true },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories', isNew: true },
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
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Just Landed</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light mb-6">
                New Arrivals
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover the latest additions to our collection. Fresh styles crafted for the modern wardrobe.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Updated Daily</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{mockProducts.length} New Items</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured New Arrival */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-muted/30 rounded-2xl overflow-hidden"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={coat} 
                alt="Featured New Arrival" 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 gap-1">
                <Sparkles className="w-3 h-3" />
                Just In
              </Badge>
            </div>
            <div className="p-8 lg:p-12">
              <Badge variant="outline" className="mb-4">Featured</Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4">
                Minimalist Black Coat
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                The perfect blend of sophistication and comfort. This season's must-have outerwear piece.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl font-semibold">$299</span>
                <span className="text-sm text-muted-foreground">Free Shipping</span>
              </div>
              <Button size="lg" onClick={() => handleAddToCart('1')} className="w-full sm:w-auto">
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </section>

        {/* All New Arrivals Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4">
              Latest Releases
            </h2>
            <p className="text-muted-foreground">
              Fresh from the studio, curated for your wardrobe
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
