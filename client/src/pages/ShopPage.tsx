import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  SlidersHorizontal, 
  LayoutGrid, 
  LayoutList, 
  ChevronDown,
  X 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const sortOptions: Record<SortOption, string> = {
    'featured': 'Featured',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'newest': 'Newest First'
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
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
        {/* Hero Banner */}
        <section className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4">
                All Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover our complete collection of carefully curated fashion pieces
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            {/* Left: Results count and active filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                {mockProducts.length} products
              </p>
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="ml-1 hover:bg-background/80 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilters([])}
                    className="h-auto py-1 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <span className="text-sm">{sortOptions[sortBy]}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {(Object.entries(sortOptions) as [SortOption, string][]).map(([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setSortBy(value)}
                      className={sortBy === value ? 'bg-accent' : ''}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter Toggle */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-filters">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your product search with these filter options
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar onFilterChange={(filters) => console.log('Filters:', filters)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8 lg:gap-12">
            {/* Desktop Filter Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block w-64 xl:w-72 flex-shrink-0"
            >
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Refine Your Search</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Use filters to find exactly what you're looking for
                  </p>
                </div>
                <FilterSidebar onFilterChange={(filters) => console.log('Filters:', filters)} />
              </div>
            </motion.aside>

            {/* Product Display Area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {viewMode === 'grid' ? (
                    <ProductGrid
                      products={mockProducts}
                      onAddToCart={handleAddToCart}
                      onWishlist={(id) => console.log('Added to wishlist:', id)}
                    />
                  ) : (
                    <div className="space-y-4">
                      {mockProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-6 p-4 border rounded-lg hover:shadow-md transition-shadow bg-card"
                        >
                          <div className="w-32 h-40 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <div className="flex gap-1">
                                  {product.isNew && (
                                    <Badge variant="secondary" className="text-xs">New</Badge>
                                  )}
                                  {product.isSale && (
                                    <Badge variant="destructive" className="text-xs">Sale</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                              <div className="flex items-baseline gap-2">
                                {product.isSale && product.salePrice ? (
                                  <>
                                    <span className="text-xl font-semibold">${product.salePrice}</span>
                                    <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                                  </>
                                ) : (
                                  <span className="text-xl font-semibold">${product.price}</span>
                                )}
                              </div>
                            </div>
                            <Button onClick={() => handleAddToCart(product.id)} className="w-full sm:w-auto">
                              Add to Cart
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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
