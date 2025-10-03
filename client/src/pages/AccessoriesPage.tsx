import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';

const mockProducts = [
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear' },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Bags' },
  { id: '10', name: 'Designer Sneakers', price: 149, image: sneakers, category: 'Footwear' },
  { id: '11', name: 'Evening Clutch', price: 189, image: handbag, category: 'Bags' },
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
        <section className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-background to-background" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-6 gap-1">
                <Sparkles className="w-3 h-3" />
                Curated Collection
              </Badge>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6">
                Accessories
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                The perfect finishing touches. Handpicked accessories to complete your signature look.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Bags", count: 28 },
              { name: "Footwear", count: 42 },
              { name: "Jewelry", count: 35 },
              { name: "Others", count: 18 }
            ].map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left"
              >
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Product */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <Badge variant="outline" className="mb-4">Featured</Badge>
                <h2 className="text-4xl sm:text-5xl font-serif font-light mb-4">
                  Leather Handbag
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Crafted from premium Italian leather, this timeless piece combines functionality with elegant design.
                </p>
                <ul className="space-y-2 mb-8 text-muted-foreground">
                  <li>• Genuine Italian leather</li>
                  <li>• Multiple compartments</li>
                  <li>• Adjustable strap</li>
                  <li>• Handcrafted details</li>
                </ul>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-semibold">$279</span>
                </div>
              </div>
              <div className="order-1 lg:order-2 aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={handbag} 
                  alt="Leather Handbag" 
                  className="w-full h-full object-cover"
                />
              </div>
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
            <h2 className="text-4xl sm:text-5xl font-serif font-light mb-4">
              All Accessories
            </h2>
            <p className="text-muted-foreground text-lg">
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
