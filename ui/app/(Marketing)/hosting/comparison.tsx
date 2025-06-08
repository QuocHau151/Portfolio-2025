import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function HostingPricingComparison() {
  const plans = [
    {
      name: "Starter",
      popular: false,
      price: "89,000",
      originalPrice: "120,000",
      storage: "10GB SSD",
      bandwidth: "100GB",
      domains: "1 Website",
      databases: "5 MySQL",
      email: "10 Email",
      features: [
        { name: "Tên miền miễn phí", included: true },
        { name: "SSL miễn phí", included: true },
        { name: "WordPress tối ưu", included: true },
        { name: "Backup tự động", included: false },
        { name: "CDN miễn phí", included: false },
        { name: "Staging site", included: false },
      ],
    },
    {
      name: "Business",
      popular: true,
      price: "159,000",
      originalPrice: "220,000",
      storage: "50GB SSD",
      bandwidth: "Unlimited",
      domains: "5 Websites",
      databases: "Unlimited",
      email: "50 Email",
      features: [
        { name: "Tên miền miễn phí", included: true },
        { name: "SSL miễn phí", included: true },
        { name: "WordPress tối ưu", included: true },
        { name: "Backup tự động", included: true },
        { name: "CDN miễn phí", included: true },
        { name: "Staging site", included: false },
      ],
    },
    {
      name: "Premium",
      popular: false,
      price: "299,000",
      originalPrice: "400,000",
      storage: "100GB SSD",
      bandwidth: "Unlimited",
      domains: "Unlimited",
      databases: "Unlimited",
      email: "Unlimited",
      features: [
        { name: "Tên miền miễn phí", included: true },
        { name: "SSL miễn phí", included: true },
        { name: "WordPress tối ưu", included: true },
        { name: "Backup tự động", included: true },
        { name: "CDN miễn phí", included: true },
        { name: "Staging site", included: true },
      ],
    },
    {
      name: "Enterprise",
      popular: false,
      price: "599,000",
      originalPrice: "800,000",
      storage: "200GB SSD",
      bandwidth: "Unlimited",
      domains: "Unlimited",
      databases: "Unlimited",
      email: "Unlimited",
      features: [
        { name: "Tên miền miễn phí", included: true },
        { name: "SSL miễn phí", included: true },
        { name: "WordPress tối ưu", included: true },
        { name: "Backup tự động", included: true },
        { name: "CDN miễn phí", included: true },
        { name: "Staging site", included: true },
      ],
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Bảng Giá Hosting</h2>
          <p className="text-lg text-neutral-400">
            Chọn gói hosting phù hợp với website của bạn
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
                <h3 className="mb-4 text-xl font-bold">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-400">
                    {plan.price}
                  </span>
                  <span className="text-green-400"> VNĐ</span>
                  <div className="text-sm text-neutral-400 line-through">
                    {plan.originalPrice} VNĐ
                  </div>
                  <div className="text-sm text-neutral-400">/tháng</div>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Dung lượng:</span>
                  <span>{plan.storage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Băng thông:</span>
                  <span>{plan.bandwidth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Website:</span>
                  <span>{plan.domains}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Database:</span>
                  <span>{plan.databases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Email:</span>
                  <span>{plan.email}</span>
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
                Đặt hàng ngay
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
