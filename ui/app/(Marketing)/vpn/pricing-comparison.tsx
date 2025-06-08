import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function VPNPricingComparison() {
  const plans = [
    {
      name: "Basic",
      popular: false,
      price: "99,000",
      originalPrice: "150,000",
      period: "/tháng",
      servers: "1000+ servers",
      countries: "30 quốc gia",
      devices: "3 thiết bị",
      bandwidth: "Unlimited",
      features: [
        { name: "No-logs policy", included: true },
        { name: "AES-256 encryption", included: true },
        { name: "Kill switch", included: true },
        { name: "Streaming support", included: false },
        { name: "P2P/Torrenting", included: false },
        { name: "24/7 support", included: false },
      ],
    },
    {
      name: "Premium",
      popular: true,
      price: "149,000",
      originalPrice: "250,000",
      period: "/tháng",
      servers: "3000+ servers",
      countries: "50 quốc gia",
      devices: "6 thiết bị",
      bandwidth: "Unlimited",
      features: [
        { name: "No-logs policy", included: true },
        { name: "AES-256 encryption", included: true },
        { name: "Kill switch", included: true },
        { name: "Streaming support", included: true },
        { name: "P2P/Torrenting", included: true },
        { name: "24/7 support", included: true },
      ],
    },
    {
      name: "Business",
      popular: false,
      price: "299,000",
      originalPrice: "450,000",
      period: "/tháng",
      servers: "5000+ servers",
      countries: "60 quốc gia",
      devices: "10 thiết bị",
      bandwidth: "Unlimited",
      features: [
        { name: "No-logs policy", included: true },
        { name: "AES-256 encryption", included: true },
        { name: "Kill switch", included: true },
        { name: "Streaming support", included: true },
        { name: "P2P/Torrenting", included: true },
        { name: "Dedicated IP", included: true },
      ],
    },
    {
      name: "Enterprise",
      popular: false,
      price: "599,000",
      originalPrice: "900,000",
      period: "/tháng",
      servers: "5000+ servers",
      countries: "60+ quốc gia",
      devices: "Unlimited",
      bandwidth: "Unlimited",
      features: [
        { name: "No-logs policy", included: true },
        { name: "AES-256 encryption", included: true },
        { name: "Kill switch", included: true },
        { name: "Streaming support", included: true },
        { name: "P2P/Torrenting", included: true },
        { name: "Team management", included: true },
      ],
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Bảng Giá VPN</h2>
          <p className="text-lg text-neutral-400">
            Chọn gói VPN phù hợp với nhu cầu bảo mật của bạn
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl bg-neutral-800 p-8 ${
                plan.popular ? "scale-105 ring-2 ring-green-500" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-green-500 text-black">
                  Phổ biến nhất
                </Badge>
              )}

              <div className="mb-8 text-center">
                <h3 className="mb-4 text-xl font-bold">VPN {plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-400">
                    {plan.price}
                  </span>
                  <span className="text-green-400"> VNĐ</span>
                  <span className="text-sm text-neutral-400">
                    {plan.period}
                  </span>
                  <div className="text-sm text-neutral-400 line-through">
                    {plan.originalPrice} VNĐ
                  </div>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Servers:</span>
                  <span className="text-sm">{plan.servers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Quốc gia:</span>
                  <span className="text-sm">{plan.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Thiết bị:</span>
                  <span className="text-sm">{plan.devices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Băng thông:</span>
                  <span className="text-sm">{plan.bandwidth}</span>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-500" />
                    )}
                    <span
                      className={
                        feature.included ? "text-white" : "text-neutral-500"
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "bg-neutral-700 hover:bg-neutral-600"
                }`}
              >
                Chọn gói này
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
