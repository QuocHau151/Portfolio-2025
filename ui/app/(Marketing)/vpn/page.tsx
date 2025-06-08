import VPNConfigurator from "./configurator";
import VPNCTASection from "./cta-section";
import VPNFAQSection from "./faq-section";
import VPNFeaturesSection from "./features-section";
import VPNHeroSection from "./hero-section";
import VPNPricingComparison from "./pricing-comparison";
import VPNServerLocations from "./server-locations";
import VPNTestimonials from "./testimonials";

export default function CompleteVPNPage() {
  return (
    <div className="min-h-screen">
      <VPNHeroSection />
      <VPNFeaturesSection />
      <VPNPricingComparison />
      <VPNConfigurator />
      <VPNServerLocations />
      <VPNTestimonials />
      <VPNFAQSection />
      <VPNCTASection />
    </div>
  );
}
