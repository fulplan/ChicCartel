import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const categories = ['Outerwear', 'Knitwear', 'Footwear', 'Accessories', 'Denim'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Beige', value: 'beige', hex: '#D4C5B9' },
    { name: 'Navy', value: 'navy', hex: '#1E3A5F' },
    { name: 'Olive', value: 'olive', hex: '#6B8E23' },
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(updated);
    onFilterChange?.({ categories: updated, priceRange, sizes: selectedSizes, colors: selectedColors });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const updated = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    setSelectedSizes(updated);
    onFilterChange?.({ categories: selectedCategories, priceRange, sizes: updated, colors: selectedColors });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const updated = checked
      ? [...selectedColors, color]
      : selectedColors.filter(c => c !== color);
    setSelectedColors(updated);
    onFilterChange?.({ categories: selectedCategories, priceRange, sizes: selectedSizes, colors: updated });
  };

  return (
    <div className="space-y-8" data-testid="sidebar-filters">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-4" data-testid="text-filter-category">Category</h3>
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
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4" data-testid="text-filter-price">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value as [number, number]);
              onFilterChange?.({ categories: selectedCategories, priceRange: value as [number, number], sizes: selectedSizes, colors: selectedColors });
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
      </div>

      <Separator />

      {/* Size */}
      <div>
        <h3 className="font-medium mb-4" data-testid="text-filter-size">Size</h3>
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
                  inline-flex items-center justify-center h-9 px-4 rounded-md border cursor-pointer transition-colors
                  ${selectedSizes.includes(size) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover-elevate'}
                `}
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color */}
      <div>
        <h3 className="font-medium mb-4" data-testid="text-filter-color">Color</h3>
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
                    w-10 h-10 rounded-full border-2 transition-all
                    ${selectedColors.includes(color.value) ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'}
                  `}
                  style={{ backgroundColor: color.hex }}
                />
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
