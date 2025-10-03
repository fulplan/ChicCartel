import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Import product images
import coat from '@assets/generated_images/Black_minimalist_fashion_coat_cd5d7051.png';
import sweater from '@assets/generated_images/Beige_cashmere_luxury_sweater_f7741aad.png';
import sneakers from '@assets/generated_images/White_minimalist_fashion_sneakers_ba10d597.png';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';
import trousers from '@assets/generated_images/Olive_green_wide-leg_trousers_1935f49c.png';
import tshirt from '@assets/generated_images/White_cotton_essential_t-shirt_a79af24d.png';
import handbag from '@assets/generated_images/Brown_leather_luxury_handbag_1cdfb11b.png';

//todo: remove mock functionality
const mockProducts = [
  { id: '1', name: 'Minimalist Black Coat', price: 299, image: coat, category: 'Outerwear', isNew: true },
  { id: '2', name: 'Cashmere Sweater', price: 189, image: sweater, category: 'Knitwear' },
  { id: '3', name: 'Classic White Sneakers', price: 129, image: sneakers, category: 'Footwear', isSale: true, salePrice: 99 },
  { id: '4', name: 'Navy Tailored Blazer', price: 349, image: blazer, category: 'Outerwear' },
  { id: '5', name: 'Wide Leg Trousers', price: 159, image: trousers, category: 'Bottoms', isNew: true },
  { id: '6', name: 'Essential White Tee', price: 49, image: tshirt, category: 'Basics' },
  { id: '7', name: 'Leather Handbag', price: 279, image: handbag, category: 'Accessories' },
  { id: '8', name: 'Cashmere Sweater Navy', price: 189, image: sweater, category: 'Knitwear', isSale: true, salePrice: 149 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-end p-2 border-b">
        <ThemeToggle />
      </div>
      
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-1 md:mb-2" data-testid="text-page-title">
                All Products
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base" data-testid="text-product-count">
                {mockProducts.length} items
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar onFilterChange={(filters) => console.log('Filters:', filters)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex gap-6 lg:gap-8">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar onFilterChange={(filters) => console.log('Filters:', filters)} />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                products={mockProducts}
                onAddToCart={handleAddToCart}
                onWishlist={(id) => console.log('Added to wishlist:', id)}
              />
            </div>
          </div>
        </div>
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
