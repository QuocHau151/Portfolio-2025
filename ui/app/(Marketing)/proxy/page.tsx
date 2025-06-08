import ProxyConfigurator from "./configurator";
import ProxyCTASection from "./cta-section";
import ProxyFAQSection from "./faq-section";
import ProxyFeaturesSection from "./features-section";
import ProxyHeroSection from "./hero-section";
import ProxyLocations from "./locations";
import ProxyPricingComparison from "./pricing-comparison";
import ProxyTestimonials from "./testimonials";

export default function CompleteProxyPage() {
  return (
    <div className="min-h-screen">
      <ProxyHeroSection />
      <ProxyFeaturesSection />
      <ProxyPricingComparison />
      <ProxyConfigurator />
      <ProxyLocations />
      <ProxyTestimonials />
      <ProxyFAQSection />
      <ProxyCTASection />
    </div>
  );
}
