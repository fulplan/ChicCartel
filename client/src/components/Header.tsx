import { ShoppingBag, Search, Heart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import MobileNav from "./MobileNav";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchChange?: (value: string) => void;
}

export default function Header({ cartItemCount = 0, onCartClick, onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
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
            <Link 
              href="/women" 
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-women"
            >
              Women
            </Link>
            <Link 
              href="/men" 
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-men"
            >
              Men
            </Link>
            <Link 
              href="/accessories" 
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-accessories"
            >
              Accessories
            </Link>
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
  );
}
