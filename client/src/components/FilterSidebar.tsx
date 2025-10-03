import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  brands: string[];
  materials: string[];
  ratings: number[];
  availability: string[];
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const categories = ['Outerwear', 'Knitwear', 'Footwear', 'Accessories', 'Denim', 'Activewear'];
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Beige', value: 'beige', hex: '#D4C5B9' },
    { name: 'Navy', value: 'navy', hex: '#1E3A5F' },
    { name: 'Olive', value: 'olive', hex: '#6B8E23' },
    { name: 'Gray', value: 'gray', hex: '#808080' },
    { name: 'Brown', value: 'brown', hex: '#8B4513' },
    { name: 'Red', value: 'red', hex: '#DC143C' },
  ];
  const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Gucci', 'Prada', 'Chanel'];
  const materials = ['Cotton', 'Wool', 'Silk', 'Leather', 'Polyester', 'Cashmere', 'Denim', 'Linen'];
  const ratings = [4, 3, 2, 1];
  const availability = ['In Stock', 'Low Stock', 'Pre-Order', 'Coming Soon'];

  const emitFilterChange = () => {
    onFilterChange?.({
      categories: selectedCategories,
      priceRange,
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      materials: selectedMaterials,
      ratings: selectedRatings,
      availability: selectedAvailability,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const updated = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    setSelectedSizes(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const updated = checked
      ? [...selectedColors, color]
      : selectedColors.filter(c => c !== color);
    setSelectedColors(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter(b => b !== brand);
    setSelectedBrands(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    const updated = checked
      ? [...selectedMaterials, material]
      : selectedMaterials.filter(m => m !== material);
    setSelectedMaterials(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const updated = checked
      ? [...selectedRatings, rating]
      : selectedRatings.filter(r => r !== rating);
    setSelectedRatings(updated);
    setTimeout(emitFilterChange, 0);
  };

  const handleAvailabilityChange = (avail: string, checked: boolean) => {
    const updated = checked
      ? [...selectedAvailability, avail]
      : selectedAvailability.filter(a => a !== avail);
    setSelectedAvailability(updated);
    setTimeout(emitFilterChange, 0);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedRatings([]);
    setSelectedAvailability([]);
    setTimeout(emitFilterChange, 0);
  };

  const activeFiltersCount = 
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedBrands.length +
    selectedMaterials.length +
    selectedRatings.length +
    selectedAvailability.length +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

  return (
    <div className="w-full lg:w-80 bg-card rounded-lg border border-border p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto" data-testid="sidebar-filters">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="mt-1">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="h-8 px-2"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "size", "color"]} className="space-y-4">
        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Price Range</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value as [number, number]);
                  setTimeout(emitFilterChange, 0);
                }}
                max={1000}
                step={10}
                className="w-full"
                data-testid="slider-price"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span data-testid="text-price-min">${priceRange[0]}</span>
                <span data-testid="text-price-max">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Category</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    data-testid={`checkbox-category-${category.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Brands</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Size</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <div key={size}>
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                    className="sr-only"
                    data-testid={`checkbox-size-${size.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`
                      inline-flex items-center justify-center h-10 px-4 rounded-md border cursor-pointer transition-all
                      ${selectedSizes.includes(size) 
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                        : 'bg-background hover:bg-muted hover:border-primary/50'
                      }
                    `}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="color" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Color</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color.value}>
                  <Checkbox
                    id={`color-${color.value}`}
                    checked={selectedColors.includes(color.value)}
                    onCheckedChange={(checked) => handleColorChange(color.value, checked as boolean)}
                    className="sr-only"
                    data-testid={`checkbox-color-${color.value}`}
                  />
                  <Label
                    htmlFor={`color-${color.value}`}
                    className="cursor-pointer block"
                    title={color.name}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full border-2 transition-all hover:scale-110
                        ${selectedColors.includes(color.value) 
                          ? 'border-primary ring-2 ring-primary ring-offset-2' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      style={{ backgroundColor: color.hex }}
                    />
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Materials */}
        <AccordionItem value="materials" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Materials</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                  />
                  <Label
                    htmlFor={`material-${material}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Rating</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-normal cursor-pointer flex-1 flex items-center gap-1"
                  >
                    <div className="flex">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability */}
        <AccordionItem value="availability" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3">
            <h3 className="font-medium text-sm">Availability</h3>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-3">
              {availability.map((avail) => (
                <div key={avail} className="flex items-center space-x-2">
                  <Checkbox
                    id={`availability-${avail}`}
                    checked={selectedAvailability.includes(avail)}
                    onCheckedChange={(checked) => handleAvailabilityChange(avail, checked as boolean)}
                  />
                  <Label
                    htmlFor={`availability-${avail}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {avail}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
