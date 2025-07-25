import Hero from "@/components/landing/hero";
import FeatureOne from "@/components/landing/features-1";
import Footer from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <FeatureOne />
      <Footer />
    </div>
  );
}