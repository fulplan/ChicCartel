import { ReactNode } from "react";
import { motion } from "framer-motion";
import FilterSidebar, { FilterState } from "./FilterSidebar";
import { Button } from "./ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface ProductPageLayoutProps {
  children: ReactNode;
  onFilterChange?: (filters: FilterState) => void;
  showFilters?: boolean;
}

export default function ProductPageLayout({ 
  children, 
  onFilterChange,
  showFilters = true 
}: ProductPageLayoutProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  if (!showFilters) {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block flex-shrink-0"
        >
          <FilterSidebar onFilterChange={onFilterChange} />
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar onFilterChange={onFilterChange} />
              </SheetContent>
            </Sheet>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
