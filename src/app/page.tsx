import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { MapSection } from "@/components/home/MapSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MapSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
