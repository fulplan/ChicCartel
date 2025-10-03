import { ShoppingBag, Search, Heart, Menu, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import MobileNav from "./MobileNav";
import MegaMenu from "./MegaMenu";
import useScrollDirection from "@/hooks/useScrollDirection";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchChange?: (value: string) => void;
}

const womenMenuSections = [
  {
    title: "Clothing",
    items: [
      { title: "Dresses", href: "/women?category=dresses", description: "Day & evening styles" },
      { title: "Tops & Blouses", href: "/women?category=tops" },
      { title: "Knitwear", href: "/women?category=knitwear" },
      { title: "Outerwear", href: "/women?category=outerwear" },
      { title: "Pants & Jeans", href: "/women?category=pants" },
    ],
  },
  {
    title: "Shoes",
    items: [
      { title: "Sneakers", href: "/women?category=sneakers" },
      { title: "Heels", href: "/women?category=heels" },
      { title: "Boots", href: "/women?category=boots" },
      { title: "Sandals", href: "/women?category=sandals" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { title: "Bags", href: "/women?category=bags" },
      { title: "Jewelry", href: "/women?category=jewelry" },
      { title: "Scarves", href: "/women?category=scarves" },
      { title: "Belts", href: "/women?category=belts" },
    ],
  },
];

const menMenuSections = [
  {
    title: "Clothing",
    items: [
      { title: "T-Shirts & Polos", href: "/men?category=tshirts" },
      { title: "Shirts", href: "/men?category=shirts" },
      { title: "Hoodies & Sweatshirts", href: "/men?category=hoodies" },
      { title: "Jackets & Coats", href: "/men?category=jackets" },
      { title: "Pants & Jeans", href: "/men?category=pants" },
    ],
  },
  {
    title: "Shoes",
    items: [
      { title: "Sneakers", href: "/men?category=sneakers" },
      { title: "Boots", href: "/men?category=boots" },
      { title: "Dress Shoes", href: "/men?category=dress-shoes" },
      { title: "Sandals", href: "/men?category=sandals" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { title: "Watches", href: "/men?category=watches" },
      { title: "Bags", href: "/men?category=bags" },
      { title: "Wallets", href: "/men?category=wallets" },
      { title: "Belts", href: "/men?category=belts" },
    ],
  },
];

const accessoriesMenuSections = [
  {
    title: "Bags & Leather Goods",
    items: [
      { title: "Handbags", href: "/accessories?category=handbags" },
      { title: "Backpacks", href: "/accessories?category=backpacks" },
      { title: "Wallets", href: "/accessories?category=wallets" },
      { title: "Travel Bags", href: "/accessories?category=travel" },
    ],
  },
  {
    title: "Jewelry & Watches",
    items: [
      { title: "Necklaces", href: "/accessories?category=necklaces" },
      { title: "Rings", href: "/accessories?category=rings" },
      { title: "Bracelets", href: "/accessories?category=bracelets" },
      { title: "Watches", href: "/accessories?category=watches" },
    ],
  },
  {
    title: "Other",
    items: [
      { title: "Sunglasses", href: "/accessories?category=sunglasses" },
      { title: "Hats", href: "/accessories?category=hats" },
      { title: "Scarves", href: "/accessories?category=scarves" },
      { title: "Tech Accessories", href: "/accessories?category=tech" },
    ],
  },
];

export default function Header({ cartItemCount = 0, onCartClick, onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const scrollDirection = useScrollDirection();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const isHeaderVisible = scrollDirection !== 'down' || window.scrollY < 100;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex items-center justify-between h-14 md:h-16 gap-2 md:gap-4">
            {/* Mobile Menu */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden flex-shrink-0"
              onClick={() => setIsMobileNavOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <div className="flex-shrink-0 flex-1 lg:flex-initial">
              <Link href="/">
                <h1 className="text-xl md:text-2xl font-serif font-light tracking-tight cursor-pointer hover:opacity-80 transition-opacity" data-testid="text-logo">
                  LUXE
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link 
                href="/new-arrivals" 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="link-new-arrivals"
              >
                New Arrivals
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('women')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                  data-testid="link-women"
                >
                  Women
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeMenu === 'women' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('men')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                  data-testid="link-men"
                >
                  Men
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeMenu === 'men' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('accessories')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                  data-testid="link-accessories"
                >
                  Accessories
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeMenu === 'accessories' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link 
                href="/sale" 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="link-sale"
              >
                Sale
              </Link>
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              {isSearchOpen ? (
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onBlur={() => {
                    if (!searchValue) setIsSearchOpen(false);
                  }}
                  className="w-full"
                  autoFocus
                  data-testid="input-search"
                />
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <Button 
                size="icon" 
                variant="ghost" 
                className="md:hidden"
                data-testid="button-mobile-search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost"
                className="hidden sm:flex"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost"
                className="hidden sm:flex"
                data-testid="button-account"
              >
                <User className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={onCartClick}
                className="relative"
                data-testid="button-cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    data-testid="text-cart-count"
                  >
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      </header>

      {/* Mega Menus */}
      <div
        onMouseEnter={() => setActiveMenu('women')}
        onMouseLeave={() => setActiveMenu(null)}
        className="relative"
      >
        <MegaMenu
          isOpen={activeMenu === 'women'}
          onClose={() => setActiveMenu(null)}
          sections={womenMenuSections}
          featured={{
            title: "Spring Collection",
            description: "Discover our latest spring arrivals",
            href: "/women?collection=spring",
          }}
        />
      </div>

      <div
        onMouseEnter={() => setActiveMenu('men')}
        onMouseLeave={() => setActiveMenu(null)}
        className="relative"
      >
        <MegaMenu
          isOpen={activeMenu === 'men'}
          onClose={() => setActiveMenu(null)}
          sections={menMenuSections}
          featured={{
            title: "New Essentials",
            description: "Timeless pieces for every wardrobe",
            href: "/men?collection=essentials",
          }}
        />
      </div>

      <div
        onMouseEnter={() => setActiveMenu('accessories')}
        onMouseLeave={() => setActiveMenu(null)}
        className="relative"
      >
        <MegaMenu
          isOpen={activeMenu === 'accessories'}
          onClose={() => setActiveMenu(null)}
          sections={accessoriesMenuSections}
          featured={{
            title: "Trending Now",
            description: "Must-have accessories of the season",
            href: "/accessories?trending=true",
          }}
        />
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-14 md:h-16" />
    </>
  );
}
