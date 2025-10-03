# Design Guidelines: Modern Fashion E-Commerce Platform

## Design Approach: Reference-Based (Fashion E-Commerce Leaders)

**Selected References**: Drawing inspiration from Zara, ASOS, and premium Shopify fashion stores
**Rationale**: Fashion e-commerce is experience-focused, visual-rich, and design-differentiated. The industry demands stunning product presentation, emotional engagement, and trend-forward aesthetics.

**Core Principles**:
- Product-first philosophy: Large, immersive imagery dominates
- Sophisticated minimalism: Flat design with premium feel
- Editorial quality: Magazine-inspired layouts
- Effortless discovery: Intuitive browsing and filtering

---

## Color Palette

### Light Mode (Primary)
- **Background**: 0 0% 98% (soft white)
- **Surface**: 0 0% 100% (pure white)
- **Primary Brand**: 0 0% 10% (deep charcoal - sophisticated black)
- **Secondary**: 0 0% 40% (medium gray for supporting text)
- **Accent**: 25 95% 53% (warm terracotta - sparingly for CTAs and highlights)
- **Border**: 0 0% 90% (subtle dividers)

### Dark Mode
- **Background**: 0 0% 8% (rich charcoal)
- **Surface**: 0 0% 12% (slightly elevated)
- **Primary Brand**: 0 0% 95% (off-white text)
- **Secondary**: 0 0% 65% (muted gray)
- **Accent**: 25 90% 60% (lighter terracotta)
- **Border**: 0 0% 20% (subtle contrast)

---

## Typography

**Font Families**:
- **Headings**: 'Cormorant Garamond' (elegant serif for editorial feel)
- **Body/UI**: 'Inter' (clean sans-serif for readability)
- **Accents**: 'Bebas Neue' (condensed display for sale tags, categories)

**Scale**:
- Hero Headlines: text-6xl md:text-7xl lg:text-8xl font-light
- Section Titles: text-3xl md:text-4xl font-normal
- Product Names: text-xl font-medium
- Body Text: text-base leading-relaxed
- Small Print: text-sm text-secondary

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 24
- Micro spacing: p-4, gap-4 (component internals)
- Standard spacing: p-8, gap-8 (between elements)
- Section spacing: py-16 md:py-24 (major sections)
- Generous breathing room: py-24 md:py-32 (featured sections)

**Grid Strategy**:
- Desktop: 4-column product grids (grid-cols-4)
- Tablet: 3-column (md:grid-cols-3)
- Mobile: 2-column (grid-cols-2)
- Featured products: 2-3 column asymmetric layouts

---

## Component Library

### Navigation
- Sticky header with transparent-to-solid scroll transition
- Mega menu with category imagery for collections
- Minimal icon-based mobile nav
- Search with autocomplete product previews

### Product Display
- **Product Cards**: Borderless with image hover swap (alternate views), minimal text overlay, quick-add cart button on hover
- **Product Grid**: Masonry-style for editorial pages, standard grid for category browsing
- **Product Detail**: Split-screen (50/50) with sticky image gallery, accordion specs

### Hero Sections
- Full-width immersive imagery with text overlay
- Split hero: half image, half content for seasonal campaigns
- Video background option for collection launches
- Minimal text, strong typography contrast

### Shopping Features
- **Filter Sidebar**: Collapsible with checkbox groups, price sliders
- **Cart Drawer**: Slide-in from right, quick edit functionality
- **Wishlist**: Heart icon integration, grid view saved items

### Content Blocks
- **Editorial Grid**: Magazine-style with mixed image sizes
- **Lookbook**: Full-bleed scrollable imagery with product tags
- **Collection Preview**: Large hero image + 3-4 product cards below
- **Instagram Feed**: Social proof grid integration

### Forms & Interactions
- Underline-style inputs for newsletter signup
- Floating labels for checkout forms
- Smooth micro-animations on add-to-cart (scale + fade)
- Size selector: pill-style buttons with selected state

---

## Images

### Hero Images (Large, Full-Width)
- **Homepage Hero**: Fashion model in seasonal collection, studio or lifestyle setting (1920x1080 minimum)
- **Collection Pages**: Thematic lifestyle photography showcasing collection mood
- **Campaign Banners**: Editorial-quality imagery for promotions

### Product Photography
- Clean white background for e-commerce consistency
- Lifestyle shots for hover states (on-model or styled)
- Detail shots for material/texture closeups
- 4-6 images per product minimum

### Supporting Imagery
- **About/Brand Story**: Behind-the-scenes, atelier photography
- **Category Tiles**: Curated outfit or product group shots
- **Instagram Grid**: User-generated content, authentic styling
- **Lookbook**: Full-length editorial spreads

### Image Treatment
- Subtle grayscale filters for sophistication
- Maintain aspect ratios (3:4 portrait for products, 16:9 for banners)
- Lazy loading for performance
- Responsive srcset for optimal delivery

---

## Key Pages Layout

**Homepage**: Hero banner → Featured collection grid → Split promotional banner → New arrivals 4-col grid → Editorial lookbook section → Instagram feed → Newsletter signup

**Collection Page**: Hero image with collection name → Filter sidebar + 4-col product grid → Load more pagination

**Product Detail**: Breadcrumb nav → Image gallery (left 60%) + Product info (right 40%) → Description tabs → Related products carousel → Recently viewed

**Cart/Checkout**: Clean, minimal steps with progress indicator, order summary sticky sidebar

---

This design system creates a premium, modern fashion e-commerce experience that balances editorial sophistication with conversion-focused functionality. The flat design aesthetic maintains visual clarity while rich layouts ensure engaging product discovery.