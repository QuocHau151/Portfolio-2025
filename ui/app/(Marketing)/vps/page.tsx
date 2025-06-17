import CTASection from "./cta-section";
import FAQSection from "./faq-section";
import FeaturesSection from "./features-section";
import HeroSection from "./hero-section";
import VpsPlansMain from "./main";
import PricingComparison from "./pricing-comparison";
import ServerLocations from "./server-locations";
import Testimonials from "./testimonials";

export default function VpsPlans() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PricingComparison />
      <VpsPlansMain />
      <FeaturesSection />
      <ServerLocations />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </div>
  );
}
