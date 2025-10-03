import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, Tag } from "lucide-react";

import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';

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

export default function SalePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
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

  const calculateDiscount = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
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
        <section className="relative bg-gradient-to-br from-red-500/10 via-background to-orange-500/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge variant="destructive" className="mb-6 gap-1 text-base px-4 py-2">
                <Tag className="w-4 h-4" />
                Limited Time Only
              </Badge>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6">
                Sale
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Exceptional pieces at unbeatable prices. Don't miss out on these curated deals.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive">
                  <Percent className="w-4 h-4" />
                  <span className="font-medium">Up to 30% Off</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Ends Soon</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deal Highlights */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Best Deals", value: "30% OFF", color: "text-red-600" },
              { label: "New Markdowns", value: "20% OFF", color: "text-orange-600" },
              { label: "Flash Sale", value: "25% OFF", color: "text-pink-600" },
              { label: "Final Sale", value: "40% OFF", color: "text-purple-600" }
            ].map((deal, index) => (
              <motion.div
                key={deal.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border-2 border-dashed rounded-lg text-center hover:border-solid hover:bg-accent transition-all"
              >
                <p className="text-sm text-muted-foreground mb-2">{deal.label}</p>
                <p className={`text-3xl font-bold ${deal.color}`}>{deal.value}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Sale Items */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <img 
                  src={sneakers} 
                  alt="Sale Item" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    {calculateDiscount(129, 99)}% OFF
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-serif font-light mb-2">Classic White Sneakers</h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-semibold">$99</span>
                    <span className="text-white/70 line-through">$129</span>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <img 
                  src={sweater} 
                  alt="Sale Item" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    {calculateDiscount(189, 149)}% OFF
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-serif font-light mb-2">Cashmere Sweater</h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-semibold">$149</span>
                    <span className="text-white/70 line-through">$189</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-serif font-light mb-4">
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
