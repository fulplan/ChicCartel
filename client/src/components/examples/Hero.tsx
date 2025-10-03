import Hero from '../Hero';
import heroImage from '@assets/generated_images/Fashion_hero_editorial_image_5b15abc4.png';

export default function HeroExample() {
  return (
    <Hero 
      imageSrc={heroImage}
      onCtaClick={() => console.log('CTA clicked')}
    />
  );
}
