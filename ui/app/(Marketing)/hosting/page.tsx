import HostingPricingComparison from "./comparison";
import HostingConfigurator from "./configurator";
import HostingCTASection from "./cta-section";
import HostingFAQSection from "./faq-section";
import HostingFeaturesSection from "./features-section";
import HostingHeroSection from "./hero-section";
import HostingTestimonials from "./testimonials";

export default function CompleteHostingPage() {
  return (
    <div className="min-h-screen">
      <HostingHeroSection />
      <HostingPricingComparison />
      <HostingConfigurator />
      <HostingFeaturesSection />
      <HostingTestimonials />
      <HostingFAQSection />
      <HostingCTASection />
    </div>
  );
}
