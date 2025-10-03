import CategoryBanner from '../CategoryBanner';
import blazer from '@assets/generated_images/Navy_blue_tailored_blazer_cc037dc0.png';

export default function CategoryBannerExample() {
  return (
    <div className="space-y-8 p-4">
      <CategoryBanner
        title="New Season Essentials"
        description="Discover our curated collection of timeless pieces"
        imageSrc={blazer}
        onCtaClick={() => console.log('CTA clicked')}
      />
      
      <CategoryBanner
        title="Spring Collection"
        description="Fresh styles for the new season"
        imageSrc={blazer}
        variant="split"
        onCtaClick={() => console.log('CTA clicked')}
      />
    </div>
  );
}
