import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';

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

        {/* Featured Collections Banner */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={sweater} 
                alt="Knitwear Collection" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-serif font-light mb-2">Knitwear</h3>
                <p className="text-white/90 mb-4">Cozy essentials for every season</p>
                <Button variant="secondary" size="sm">Shop Collection</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={handbag} 
                alt="Accessories Collection" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-serif font-light mb-2">Accessories</h3>
                <p className="text-white/90 mb-4">Complete your perfect look</p>
                <Button variant="secondary" size="sm">Shop Collection</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section with Tabs */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-light">Shop Women's</h2>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-initial">All Items</TabsTrigger>
                <TabsTrigger value="clothing" className="flex-1 sm:flex-initial">Clothing</TabsTrigger>
                <TabsTrigger value="accessories" className="flex-1 sm:flex-initial">Accessories</TabsTrigger>
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
