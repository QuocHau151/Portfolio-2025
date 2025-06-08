"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProxyConfigurator() {
  const [selectedType, setSelectedType] = useState("Residential");
  const [selectedPeriod, setSelectedPeriod] = useState("1 tháng");

  const periods = [
    { name: "1 tháng", discount: 0 },
    { name: "3 tháng", discount: 10 },
    { name: "6 tháng", discount: 15 },
    { name: "1 năm", discount: 25 },
    { name: "2 năm", discount: 30 },
  ];

  const types = [
    { name: "Datacenter", basePrice: 400000 },
    { name: "Residential", basePrice: 800000 },
    { name: "Mobile", basePrice: 1200000 },
    { name: "Enterprise", basePrice: 2500000 },
  ];

  const currentType = types.find((t) => t.name === selectedType);
  const currentPeriod = periods.find((p) => p.name === selectedPeriod);
  const discountedPrice = currentType
    ? currentType.basePrice * (1 - (currentPeriod?.discount || 0) / 100)
    : 0;

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Type Selection */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {types.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedType(type.name)}
              className={`rounded-full px-6 py-3 font-medium transition-all ${
                selectedType === type.name
                  ? "bg-green-500 text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              Proxy {type.name}
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
                Loại proxy
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>{selectedType}</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Số lượng IP
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>50 IP</option>
                <option>100 IP</option>
                <option>200 IP</option>
                <option>500+ IP</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Vị trí
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>Toàn cầu</option>
                <option>Việt Nam</option>
                <option>USA</option>
                <option>Europe</option>
                <option>Asia</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Giao thức
              </label>
              <select className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white">
                <option>HTTP/HTTPS</option>
                <option>SOCKS5</option>
                <option>All protocols</option>
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
              {currentPeriod?.discount ? ` (-${currentPeriod.discount}%)` : ""}
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
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
