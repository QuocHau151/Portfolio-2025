"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function VpsPlans() {
  const [selectedPeriod, setSelectedPeriod] = useState("1-month");

  // VPS type data
  const vpsTypes = [
    { id: "budget", label: "VPS Giá Rẻ", active: true },
    { id: "ssd", label: "VPS SSD", active: false },
    { id: "amd", label: "VPS AMD", active: false },
    { id: "nvme", label: "VPS NVMe", active: false },
    { id: "gpu", label: "VPS GPU", active: false },
  ];

  // Billing period data with discounts
  const billingPeriods = [
    { id: "1-month", label: "1 tháng", discount: null, multiplier: 1 },
    { id: "3-month", label: "3 tháng", discount: "-5%", multiplier: 2.85 }, // 3 * 0.95
    { id: "6-month", label: "6 tháng", discount: "-10%", multiplier: 5.4 }, // 6 * 0.9
    { id: "1-year", label: "1 năm", discount: "-15%", multiplier: 10.2 }, // 12 * 0.85
    { id: "2-year", label: "2 năm", discount: "-20%", multiplier: 19.2 }, // 24 * 0.8
    { id: "3-year", label: "3 năm", discount: "-25%", multiplier: 27 }, // 36 * 0.75
  ];

  // Configuration options for each VPS type
  const configOptions = {
    budget: {
      cpu: [
        { value: "1", label: "1 vCPU", price: 50000 },
        { value: "2", label: "2 vCPU", price: 100000 },
        { value: "4", label: "4 vCPU", price: 200000 },
      ],
      ram: [
        { value: "1", label: "1 GB", price: 30000 },
        { value: "2", label: "2 GB", price: 60000 },
        { value: "4", label: "4 GB", price: 120000 },
        { value: "8", label: "8 GB", price: 240000 },
      ],
      storage: [
        { value: "20", label: "20 GB SSD", price: 20000 },
        { value: "40", label: "40 GB SSD", price: 40000 },
        { value: "80", label: "80 GB SSD", price: 80000 },
        { value: "160", label: "160 GB SSD", price: 160000 },
      ],
      bandwidth: [
        { value: "1", label: "1 TB", price: 0 },
        { value: "2", label: "2 TB", price: 20000 },
        { value: "5", label: "5 TB", price: 50000 },
        { value: "10", label: "10 TB", price: 100000 },
      ],
      network: [
        { value: "shared", label: "Shared (1 Gbps)", price: 0 },
        { value: "dedicated", label: "Dedicated (1 Gbps)", price: 100000 },
      ],
      provider: [
        { value: "viettel", label: "Viettel Cloud", price: 0 },
        { value: "aws", label: "AWS", price: 50000 },
        { value: "digitalocean", label: "Digital Ocean", price: 30000 },
      ],
    },
    ssd: {
      cpu: [
        { value: "2", label: "2 vCPU", price: 100000 },
        { value: "4", label: "4 vCPU", price: 200000 },
        { value: "6", label: "6 vCPU", price: 300000 },
        { value: "8", label: "8 vCPU", price: 400000 },
      ],
      ram: [
        { value: "2", label: "2 GB", price: 60000 },
        { value: "4", label: "4 GB", price: 120000 },
        { value: "8", label: "8 GB", price: 240000 },
        { value: "16", label: "16 GB", price: 480000 },
      ],
      storage: [
        { value: "40", label: "40 GB SSD", price: 40000 },
        { value: "80", label: "80 GB SSD", price: 80000 },
        { value: "160", label: "160 GB SSD", price: 160000 },
        { value: "320", label: "320 GB SSD", price: 320000 },
      ],
      bandwidth: [
        { value: "2", label: "2 TB", price: 20000 },
        { value: "5", label: "5 TB", price: 50000 },
        { value: "10", label: "10 TB", price: 100000 },
        { value: "20", label: "20 TB", price: 200000 },
      ],
      network: [
        { value: "shared", label: "Shared (1 Gbps)", price: 0 },
        { value: "dedicated", label: "Dedicated (1 Gbps)", price: 100000 },
      ],
      provider: [
        { value: "viettel", label: "Viettel Cloud", price: 0 },
        { value: "aws", label: "AWS", price: 50000 },
        { value: "digitalocean", label: "Digital Ocean", price: 30000 },
      ],
    },
    amd: {
      cpu: [
        { value: "1", label: "1 AMD EPYC", price: 150000 },
        { value: "2", label: "2 AMD EPYC", price: 300000 },
        { value: "4", label: "4 AMD EPYC", price: 600000 },
        { value: "8", label: "8 AMD EPYC", price: 1200000 },
      ],
      ram: [
        { value: "2", label: "2 GB", price: 60000 },
        { value: "4", label: "4 GB", price: 120000 },
        { value: "8", label: "8 GB", price: 240000 },
        { value: "16", label: "16 GB", price: 480000 },
        { value: "32", label: "32 GB", price: 960000 },
      ],
      storage: [
        { value: "40", label: "40 GB SSD", price: 40000 },
        { value: "80", label: "80 GB SSD", price: 80000 },
        { value: "160", label: "160 GB SSD", price: 160000 },
        { value: "320", label: "320 GB SSD", price: 320000 },
        { value: "640", label: "640 GB SSD", price: 640000 },
      ],
      bandwidth: [
        { value: "2", label: "2 TB", price: 20000 },
        { value: "5", label: "5 TB", price: 50000 },
        { value: "10", label: "10 TB", price: 100000 },
        { value: "20", label: "20 TB", price: 200000 },
      ],
      network: [
        { value: "shared", label: "Shared (1 Gbps)", price: 0 },
        { value: "dedicated", label: "Dedicated (1 Gbps)", price: 100000 },
        { value: "dedicated10", label: "Dedicated (10 Gbps)", price: 500000 },
      ],
      provider: [
        { value: "viettel", label: "Viettel Cloud", price: 0 },
        { value: "aws", label: "AWS", price: 50000 },
        { value: "digitalocean", label: "Digital Ocean", price: 30000 },
      ],
    },
    nvme: {
      cpu: [
        { value: "2", label: "2 vCPU", price: 100000 },
        { value: "4", label: "4 vCPU", price: 200000 },
        { value: "6", label: "6 vCPU", price: 300000 },
        { value: "8", label: "8 vCPU", price: 400000 },
        { value: "12", label: "12 vCPU", price: 600000 },
      ],
      ram: [
        { value: "4", label: "4 GB", price: 120000 },
        { value: "8", label: "8 GB", price: 240000 },
        { value: "16", label: "16 GB", price: 480000 },
        { value: "32", label: "32 GB", price: 960000 },
        { value: "64", label: "64 GB", price: 1920000 },
      ],
      storage: [
        { value: "80", label: "80 GB NVMe", price: 120000 },
        { value: "160", label: "160 GB NVMe", price: 240000 },
        { value: "320", label: "320 GB NVMe", price: 480000 },
        { value: "640", label: "640 GB NVMe", price: 960000 },
        { value: "1280", label: "1280 GB NVMe", price: 1920000 },
      ],
      bandwidth: [
        { value: "3", label: "3 TB", price: 30000 },
        { value: "5", label: "5 TB", price: 50000 },
        { value: "10", label: "10 TB", price: 100000 },
        { value: "20", label: "20 TB", price: 200000 },
        { value: "50", label: "50 TB", price: 500000 },
      ],
      network: [
        { value: "shared", label: "Shared (1 Gbps)", price: 0 },
        { value: "dedicated", label: "Dedicated (1 Gbps)", price: 100000 },
        { value: "dedicated10", label: "Dedicated (10 Gbps)", price: 500000 },
      ],
      provider: [
        { value: "viettel", label: "Viettel Cloud", price: 0 },
        { value: "aws", label: "AWS", price: 50000 },
        { value: "digitalocean", label: "Digital Ocean", price: 30000 },
      ],
    },
    gpu: {
      cpu: [
        { value: "4", label: "4 vCPU", price: 200000 },
        { value: "8", label: "8 vCPU", price: 400000 },
        { value: "16", label: "16 vCPU", price: 800000 },
        { value: "32", label: "32 vCPU", price: 1600000 },
      ],
      ram: [
        { value: "16", label: "16 GB", price: 480000 },
        { value: "32", label: "32 GB", price: 960000 },
        { value: "64", label: "64 GB", price: 1920000 },
        { value: "128", label: "128 GB", price: 3840000 },
      ],
      storage: [
        { value: "160", label: "160 GB SSD", price: 160000 },
        { value: "320", label: "320 GB SSD", price: 320000 },
        { value: "640", label: "640 GB SSD", price: 640000 },
        { value: "1280", label: "1280 GB SSD", price: 1280000 },
      ],
      bandwidth: [
        { value: "5", label: "5 TB", price: 50000 },
        { value: "10", label: "10 TB", price: 100000 },
        { value: "20", label: "20 TB", price: 200000 },
        { value: "50", label: "50 TB", price: 500000 },
      ],
      network: [
        { value: "dedicated", label: "Dedicated (1 Gbps)", price: 100000 },
        { value: "dedicated10", label: "Dedicated (10 Gbps)", price: 500000 },
      ],
      provider: [{ value: "aws", label: "AWS", price: 50000 }],
      gpu: [
        { value: "t4", label: "1x NVIDIA T4", price: 1000000 },
        { value: "a10g", label: "1x NVIDIA A10G", price: 2500000 },
        { value: "a100", label: "1x NVIDIA A100", price: 5000000 },
        { value: "a100-2", label: "2x NVIDIA A100", price: 10000000 },
      ],
    },
  };

  // State for selected configuration
  const [config, setConfig] = useState({
    budget: {
      cpu: "1",
      ram: "1",
      gpu: "1",
      storage: "20",
      bandwidth: "1",
      network: "shared",
      provider: "viettel",
    },
    ssd: {
      cpu: "2",
      ram: "2",
      gpu: "1",
      storage: "40",
      bandwidth: "2",
      network: "shared",
      provider: "viettel",
    },
    amd: {
      cpu: "1",
      ram: "2",
      gpu: "1",
      storage: "40",
      bandwidth: "2",
      network: "shared",
      provider: "viettel",
    },
    nvme: {
      cpu: "2",
      ram: "4",
      gpu: "1",
      storage: "80",
      bandwidth: "3",
      network: "shared",
      provider: "viettel",
    },
    gpu: {
      cpu: "4",
      ram: "16",
      storage: "160",
      gpu: "1",
      bandwidth: "5",
      network: "dedicated",
      provider: "aws",
    },
  });

  // State for total price
  const [totalPrice, setTotalPrice] = useState({
    budget: 0,
    ssd: 0,
    amd: 0,
    nvme: 0,
    gpu: 0,
  });

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calculate price based on selected configuration
  const calculatePrice = (type: string) => {
    const options = configOptions[type as keyof typeof configOptions];
    const selectedConfig = config[type as keyof typeof config];

    let price = 0;

    // Add CPU price
    price +=
      options.cpu.find((item) => item.value === selectedConfig.cpu)?.price || 0;

    // Add RAM price
    price +=
      options.ram.find((item) => item.value === selectedConfig.ram)?.price || 0;

    // Add storage price
    price +=
      options.storage.find((item) => item.value === selectedConfig.storage)
        ?.price || 0;

    // Add bandwidth price
    price +=
      options.bandwidth.find((item) => item.value === selectedConfig.bandwidth)
        ?.price || 0;

    // Add network price
    price +=
      options.network.find((item) => item.value === selectedConfig.network)
        ?.price || 0;

    // Add provider price
    price +=
      options.provider.find((item) => item.value === selectedConfig.provider)
        ?.price || 0;

    // Apply billing period multiplier
    const period = billingPeriods.find((p) => p.id === selectedPeriod);
    price = Math.round(price * (period?.multiplier || 1));

    return price;
  };

  // Update total price when configuration or billing period changes
  useEffect(() => {
    setTotalPrice({
      budget: calculatePrice("budget"),
      ssd: calculatePrice("ssd"),
      amd: calculatePrice("amd"),
      nvme: calculatePrice("nvme"),
      gpu: calculatePrice("gpu"),
    });
  }, [config, selectedPeriod]);

  // Handle configuration change
  const handleConfigChange = (type: string, option: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [option]: value,
      },
    }));
  };

  // Render configuration form
  const renderConfigForm = (type: string) => {
    const options = configOptions[type as keyof typeof configOptions];
    const selectedConfig = config[type as keyof typeof config];

    return (
      <div className="mt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">CPU</label>
            <Select
              value={selectedConfig.cpu}
              onValueChange={(value) => handleConfigChange(type, "cpu", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn CPU" />
              </SelectTrigger>
              <SelectContent>
                {options.cpu.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">RAM</label>
            <Select
              value={selectedConfig.ram}
              onValueChange={(value) => handleConfigChange(type, "ram", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn RAM" />
              </SelectTrigger>
              <SelectContent>
                {options.ram.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ổ cứng</label>
            <Select
              value={selectedConfig.storage}
              onValueChange={(value) =>
                handleConfigChange(type, "storage", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn ổ cứng" />
              </SelectTrigger>
              <SelectContent>
                {options.storage.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Băng thông</label>
            <Select
              value={selectedConfig.bandwidth}
              onValueChange={(value) =>
                handleConfigChange(type, "bandwidth", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn băng thông" />
              </SelectTrigger>
              <SelectContent>
                {options.bandwidth.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mạng</label>
            <Select
              value={selectedConfig.network}
              onValueChange={(value) =>
                handleConfigChange(type, "network", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại mạng" />
              </SelectTrigger>
              <SelectContent>
                {options.network.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nhà cung cấp</label>
            <Select
              value={selectedConfig.provider}
              onValueChange={(value) =>
                handleConfigChange(type, "provider", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                {options.provider.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} (+{formatPrice(option.price)} VNĐ)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 rounded-lg p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-lg font-medium">Tổng chi phí</h3>
              <p className="text-sm text-gray-500">
                Cho thời hạn{" "}
                {billingPeriods.find((p) => p.id === selectedPeriod)?.label}
                {billingPeriods.find((p) => p.id === selectedPeriod)
                  ?.discount && (
                  <span className="ml-1 text-green-600">
                    (
                    {
                      billingPeriods.find((p) => p.id === selectedPeriod)
                        ?.discount
                    }
                    )
                  </span>
                )}
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary text-3xl font-bold">
                {formatPrice(totalPrice[type as keyof typeof totalPrice])} VNĐ
              </div>
            </div>
            <Button className="bg-primary w-full md:w-auto">
              Đặt hàng ngay
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto space-y-6 py-10">
      <Tabs
        defaultValue="budget"
        className="flex w-full flex-col items-center justify-center"
      >
        <TabsList className="h-16 w-min rounded-full bg-neutral-800">
          {vpsTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className={`h-12 rounded-full text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md ${
                type.active
                  ? "flex-1 md:flex-none md:px-8"
                  : "flex-1 md:flex-none md:px-8"
              }`}
            >
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Budget VPS Plans */}
        <TabsContent value="budget" className="mt-6 w-full">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="flex h-10 w-full justify-between gap-5 rounded-full bg-white p-1 text-black">
              {billingPeriods.map((period) => (
                <TabsTrigger
                  key={period.id}
                  value={period.id}
                  className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-full transition-all data-[state=active]:text-white"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  <span>{period.label}</span>
                  {period.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 px-1.5 py-0.5 text-[10px]">
                      {period.discount}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {renderConfigForm("budget")}
          </Tabs>
        </TabsContent>

        {/* SSD VPS Plans */}
        <TabsContent value="ssd" className="mt-6 w-full">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="flex h-10 w-full justify-between gap-5 rounded-full bg-white p-1 text-black">
              {billingPeriods.map((period) => (
                <TabsTrigger
                  key={period.id}
                  value={period.id}
                  className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-full transition-all data-[state=active]:text-white"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  <span>{period.label}</span>
                  {period.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 px-1.5 py-0.5 text-[10px]">
                      {period.discount}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {renderConfigForm("ssd")}
          </Tabs>
        </TabsContent>

        {/* AMD VPS Plans */}
        <TabsContent value="amd" className="mt-6 w-full">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="flex h-10 w-full justify-between gap-5 rounded-full bg-white p-1 text-black">
              {billingPeriods.map((period) => (
                <TabsTrigger
                  key={period.id}
                  value={period.id}
                  className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-full transition-all data-[state=active]:text-white"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  <span>{period.label}</span>
                  {period.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 px-1.5 py-0.5 text-[10px]">
                      {period.discount}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {renderConfigForm("amd")}
          </Tabs>
        </TabsContent>

        {/* NVMe VPS Plans */}
        <TabsContent value="nvme" className="mt-6 w-full">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="flex h-10 w-full justify-between gap-5 rounded-full bg-white p-1 text-black">
              {billingPeriods.map((period) => (
                <TabsTrigger
                  key={period.id}
                  value={period.id}
                  className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-full transition-all data-[state=active]:text-white"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  <span>{period.label}</span>
                  {period.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 px-1.5 py-0.5 text-[10px]">
                      {period.discount}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {renderConfigForm("nvme")}
          </Tabs>
        </TabsContent>

        {/* GPU VPS Plans */}
        <TabsContent value="gpu" className="mt-6 w-full">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="flex h-10 w-full justify-between gap-5 rounded-full bg-white p-1 text-black">
              {billingPeriods.map((period) => (
                <TabsTrigger
                  key={period.id}
                  value={period.id}
                  className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-full transition-all data-[state=active]:text-white"
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  <span>{period.label}</span>
                  {period.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 px-1.5 py-0.5 text-[10px]">
                      {period.discount}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {renderConfigForm("gpu")}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
