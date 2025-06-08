import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingComparison() {
  const plans = [
    {
      name: "VPS Giá Rẻ",
      popular: false,
      price: "150,000",
      originalPrice: "200,000",
      cpu: "1 Core",
      ram: "1GB",
      storage: "20GB SSD",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: false },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: false },
      ],
    },
    {
      name: "VPS SSD",
      popular: true,
      price: "270,000",
      originalPrice: "350,000",
      cpu: "2 Core",
      ram: "2GB",
      storage: "40GB SSD",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
    {
      name: "VPS NVMe Cao Cấp",
      popular: false,
      price: "450,000",
      originalPrice: "600,000",
      cpu: "4 Core",
      ram: "4GB",
      storage: "80GB NVMe",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
    {
      name: "VPS NBN",
      popular: false,
      price: "800,000",
      originalPrice: "1,000,000",
      cpu: "8 Core",
      ram: "8GB",
      storage: "160GB NVMe",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
  ];

  return (
    <section className="px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-bold">Bảng Giá VPS</h2>
          <p className="text-[13px] text-gray-400">
            Chọn gói VPS phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="grid gap-8 space-y-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <div className="text-sm text-gray-400 line-through">
                    {plan.originalPrice} VNĐ
                  </div>
                  <div className="text-sm text-gray-400">/tháng</div>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU:</span>
                  <span>{plan.cpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">RAM:</span>
                  <span>{plan.ram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ổ cứng:</span>
                  <span>{plan.storage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Băng thông:</span>
                  <span>{plan.bandwidth}</span>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <X className="h-5 w-5 text-gray-500" />
                    )}
                    <span
                      className={
                        feature.included ? "text-white" : "text-gray-500"
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
                    : "bg-neutral-700 hover:bg-neutral-600 hover:text-white"
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
