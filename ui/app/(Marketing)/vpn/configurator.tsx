"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VPNConfigurator() {
  const [selectedPlan, setSelectedPlan] = useState("Premium");
  const [selectedPeriod, setSelectedPeriod] = useState("1 năm");

  const periods = [
    { name: "1 tháng", discount: 0 },
    { name: "6 tháng", discount: 30 },
    { name: "1 năm", discount: 50 },
    { name: "2 năm", discount: 70 },
  ];

  const plans = [
    { name: "Basic", basePrice: 150000 },
    { name: "Premium", basePrice: 250000 },
    { name: "Business", basePrice: 450000 },
    { name: "Enterprise", basePrice: 900000 },
  ];

  const currentPlan = plans.find((p) => p.name === selectedPlan);
  const currentPeriod = periods.find((p) => p.name === selectedPeriod);
  const discountedPrice = currentPlan
    ? currentPlan.basePrice * (1 - (currentPeriod?.discount || 0) / 100)
    : 0;

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Plan Selection */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {plans.map((plan) => (
            <button
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`rounded-full px-6 py-3 font-medium transition-all ${
                selectedPlan === plan.name
                  ? "bg-green-500 text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              VPN {plan.name}
            </button>
          ))}
        </div>

        {/* Period Selection */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {periods.map((period) => (
            <button
              key={period.name}
              onClick={() => setSelectedPeriod(period.name)}
              className={`relative rounded-lg px-6 py-3 font-medium transition-all ${
                selectedPeriod === period.name
                  ? "bg-green-500 text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {period.discount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-xs text-white">
                  -{period.discount}%
                </Badge>
              )}
              {period.name}
            </button>
          ))}
        </div>

        {/* Configuration Form */}
        <div className="mb-8 rounded-2xl bg-neutral-800 p-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Gói VPN
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>{selectedPlan}</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Số thiết bị
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>3 thiết bị</option>
                <option>6 thiết bị</option>
                <option>10 thiết bị</option>
                <option>Unlimited</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Vị trí ưu tiên
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>Tự động</option>
                <option>Việt Nam</option>
                <option>Singapore</option>
                <option>USA</option>
                <option>Europe</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Mục đích sử dụng
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>Streaming</option>
                <option>Gaming</option>
                <option>Business</option>
                <option>Privacy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center justify-between rounded-2xl bg-neutral-800 p-8 md:flex-row">
          <div>
            <h3 className="mb-2 text-2xl font-bold">Tổng chi phí</h3>
            <p className="text-neutral-400">
              Cho thời hạn {selectedPeriod.toLowerCase()}
              {currentPeriod?.discount
                ? ` (Tiết kiệm ${currentPeriod.discount}%)`
                : ""}
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="mb-2 text-4xl font-bold text-green-400">
              {Math.round(discountedPrice).toLocaleString()} VNĐ
            </div>
            <Button
              size="lg"
              className="bg-green-500 px-8 font-semibold text-black hover:bg-green-600"
            >
              Dùng thử 30 ngày miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
