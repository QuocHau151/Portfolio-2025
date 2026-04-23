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
import {
  useAddToCartMutation,
  useCartQuery,
  useUpdateCartMutation,
} from "@/queries/useCart";
import { useGetCategoryProductsQuery } from "@/queries/useProduct";
import { useEffect, useState } from "react";

interface Variant {
  value: string;
  options: string[];
}

interface Sku {
  id: number;
  value: string;
  price: number;
  stock: number;
  images: any[];
  productId: number;
}

interface Product {
  id: number;
  publishedAt: string;
  name: string;
  basePrice: number;
  virtualPrice: number;
  images: any[];
  variants: Variant[];
  skus: Sku[];
}

const billingPeriods = [
  { id: "1", label: "1 tháng", discount: null, multiplier: 1 },
  { id: "3", label: "3 tháng", discount: "-5%", multiplier: 2.85 },
  { id: "6", label: "6 tháng", discount: "-10%", multiplier: 5.4 },
  { id: "12", label: "1 năm", discount: "-15%", multiplier: 10.2 },
  { id: "24", label: "2 năm", discount: "-20%", multiplier: 19.2 },
  { id: "36", label: "3 năm", discount: "-25%", multiplier: 27 },
];

export default function VpsPlansMain() {
  const [config, setConfig] = useState<Record<string, Record<string, string>>>({});
  const [selectedPeriod, setSelectedPeriod] = useState("1");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<string>("");
  const [sku, setSku] = useState<Sku | null>(null);

  const response = useGetCategoryProductsQuery(1);
  const { data: cartData } = useCartQuery();
  const addToCartMutation = useAddToCartMutation();
  const updateCartMutation = useUpdateCartMutation();

  useEffect(() => {
    if (response.data) {
      const data = (response.data?.payload as any)?.data;
      setProducts(data);
      setActiveTab(data[0].id.toString());

      const initialConfig: Record<string, Record<string, string>> = {};
      const initialPrices: Record<string, number> = {};

      data.forEach((product: any) => {
        const productId = product.id.toString();
        initialConfig[productId] = {};
        product.variants.forEach((variant: any) => {
          initialConfig[productId][variant.value] = variant.options[0];
        });
        initialPrices[productId] = product.basePrice;
      });

      setConfig(initialConfig);
      setTotalPrice(initialPrices);
      setLoading(false);
    }
  }, [response.data]);

  useEffect(() => {
    if (!activeTab) return;
    const product = products.find((p) => p.id.toString() === activeTab);
    if (!product) return;
    const selectedConfig = config[activeTab];
    if (!selectedConfig) return;

    const configString = Object.values(selectedConfig).join("-");
    const matchingSku = product.skus.find((s) => s.value === configString);

    if (matchingSku && sku !== matchingSku) {
      setSku(matchingSku);
    } else if (!matchingSku && sku !== null) {
      setSku(null);
    }
  }, [activeTab, config, products]);

  useEffect(() => {
    Object.keys(config).forEach((productId) => {
      calculatePrice(productId);
    });
  }, [config, selectedPeriod]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleConfigChange = (productId: string, option: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [option]: value,
      },
    }));
  };

  const calculatePrice = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    if (!product) return 0;
    const selectedConfig = config[productId];
    if (!selectedConfig) return 0;

    let price = product.basePrice;
    const configString = Object.values(selectedConfig).join("-");
    const matchingSku = product.skus.find((s) => s.value === configString);

    if (matchingSku) {
      price = matchingSku.price;
    }

    const period = billingPeriods.find((p) => p.id === selectedPeriod);
    price = Math.round(price * (period?.multiplier || 1));

    setTotalPrice((prev) => ({
      ...prev,
      [productId]: price,
    }));

    return price;
  };

  const handleAddToCart = () => {
    if (!sku?.id || !selectedPeriod) return;
    const cartItems = (cartData?.payload as any)?.data?.data || [];
    const existingItem = cartItems.find((item: any) => item.skuId === sku.id);
    const rentalPeriod = Number(selectedPeriod);

    if (existingItem) {
      const newRentalPeriod = existingItem.rentalPeriod + rentalPeriod;
      updateCartMutation.mutateAsync({
        id: existingItem.id,
        data: {
          skuId: sku.id,
          quantity: existingItem.quantity,
          rentalPeriod: newRentalPeriod,
        },
      });
    } else {
      addToCartMutation.mutateAsync({
        skuId: sku.id,
        quantity: 1,
        rentalPeriod,
      });
    }
  };

  const renderConfigForm = (product: Product) => {
    const productId = product.id.toString();
    const selectedConfig = config[productId] || {};

    const configOptions = [
      {
        label: "CPU",
        key: "CPU",
        options: product.variants.find((v) => v.value === "CPU")?.options || [],
        placeholder: "Chọn CPU",
      },
      {
        label: "RAM",
        key: "Ram",
        options: product.variants.find((v) => v.value === "Ram")?.options || [],
        placeholder: "Chọn RAM",
      },
      {
        label: "Ổ cứng",
        key: "Rom",
        options: product.variants.find((v) => v.value === "Rom")?.options || [],
        placeholder: "Chọn ổ cứng",
      },
      {
        label: "Vị trí",
        key: "Location",
        options: product.variants.find((v) => v.value === "Location")?.options || [],
        placeholder: "Chọn vị trí",
      },
      {
        label: "Hệ điều hành",
        key: "OS",
        options: product.variants.find((v) => v.value === "OS")?.options || [],
        placeholder: "Chọn hệ điều hành",
      },
      {
        label: "Băng thông",
        key: "Bandwidth",
        options: product.variants.find((v) => v.value === "Bandwidth")?.options || [],
        placeholder: "Chọn băng thông",
      },
    ];

    return (
      <div className="mt-8 space-y-8">
        {/* Config Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {configOptions.map(({ label, key, options, placeholder }) => (
            <div
              key={key}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-white/10"
            >
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </label>
              <Select
                value={selectedConfig[key] || options[0]}
                onValueChange={(value) => handleConfigChange(productId, key, value)}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white focus:ring-primary/20">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-surface-elevated text-white">
                  {options.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="focus:bg-white/5 focus:text-white"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated p-6 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(600px circle at 80% 50%, rgba(40,236,141,0.05), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white">Tổng chi phí</h3>
              <p className="text-sm text-muted-foreground">
                Cho thời hạn{" "}
                <span className="font-medium text-white">
                  {billingPeriods.find((p) => p.id === selectedPeriod)?.label}
                </span>
                {billingPeriods.find((p) => p.id === selectedPeriod)?.discount && (
                  <span className="ml-2 text-primary">
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
              <div className="text-4xl font-extrabold text-primary md:text-5xl">
                {formatPrice(totalPrice[productId] || 0)}
                <span className="ml-1 text-lg font-medium text-muted">VNĐ</span>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] md:w-auto md:px-8"
            >
              Đặt hàng ngay
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-muted">
        Đang tải...
      </div>
    );
  }

  const vpsTypes = products.map((product) => ({
    id: product.name.toLowerCase().replace(/\s+/g, "-"),
    label: product.name,
    active: product.id.toString() === activeTab,
  }));

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 text-center md:mb-14">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase backdrop-blur-sm">
          Tùy chỉnh
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-gradient">Bảng chọn gói VPS</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted md:text-base">
          Chọn gói VPS phù hợp với nhu cầu của bạn và bắt đầu sử dụng ngay
        </p>
      </div>

      <Tabs
        defaultValue={vpsTypes.find((type) => type.active)?.id || vpsTypes[0]?.id}
        onValueChange={(value) => {
          const product = products.find(
            (p) => p.name.toLowerCase().replace(/\s+/g, "-") === value,
          );
          if (product) {
            setActiveTab(product.id.toString());
            const selectedConfig = config[product.id.toString()];
            if (selectedConfig) {
              const configString = Object.values(selectedConfig).join("-");
              const matchingSku = product.skus.find(
                (s) => s.value === configString,
              );
              setSku(matchingSku || null);
            }
          }
        }}
        className="flex w-full flex-col items-center"
      >
        {/* VPS Type Tabs */}
        <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-2 md:w-auto md:flex-nowrap">
          {vpsTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-none md:px-6"
            >
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Render content for each VPS type */}
        {products.map((product) => {
          const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <TabsContent
              key={product.id}
              value={productSlug}
              className="mt-8 w-full"
            >
              <Tabs
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
                className="w-full"
              >
                {/* Billing Period Tabs */}
                <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-2">
                  {billingPeriods.map((period) => (
                    <TabsTrigger
                      key={period.id}
                      value={period.id}
                      className="relative rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-white/10 data-[state=active]:text-white md:px-5"
                    >
                      <span>{period.label}</span>
                      {period.discount && (
                        <Badge className="absolute -top-2 -right-2 bg-primary px-1.5 py-0.5 text-[10px] font-bold text-black">
                          {period.discount}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {renderConfigForm(product)}
              </Tabs>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
