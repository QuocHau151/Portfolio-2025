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

// Define types for our data structure
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

export default function VpsPlansMain() {
  const [config, setConfig] = useState<Record<string, Record<string, string>>>(
    {},
  );
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

  const billingPeriods = [
    { id: "1", label: "1 tháng", discount: null, multiplier: 1 },
    { id: "3", label: "3 tháng", discount: "-5%", multiplier: 2.85 }, // 3 * 0.95
    { id: "6", label: "6 tháng", discount: "-10%", multiplier: 5.4 }, // 6 * 0.9
    { id: "12", label: "1 năm", discount: "-15%", multiplier: 10.2 }, // 12 * 0.85
    { id: "24", label: "2 năm", discount: "-20%", multiplier: 19.2 }, // 24 * 0.8
    { id: "36", label: "3 năm", discount: "-25%", multiplier: 27 }, // 36 * 0.75
  ];

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
      setActiveTab(data[0].id.toString());
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
    const matchingSku = product.skus.find((sku) => sku.value === configString);

    if (matchingSku && sku !== matchingSku) {
      setSku(matchingSku);
    } else if (!matchingSku && sku !== null) {
      setSku(null);
    }
  }, [activeTab, config, products]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleConfigChange = (
    productId: string,
    option: string,
    value: string,
  ) => {
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
    const matchingSku = product.skus.find((sku) => sku.value === configString);

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

  // Update prices when billing period changes
  useEffect(() => {
    Object.keys(config).forEach((productId) => {
      calculatePrice(productId);
    });
  }, [config, selectedPeriod]);

  const renderConfigForm = (product: Product) => {
    const productId = product.id.toString();
    const selectedConfig = config[productId] || {};
    const cpuOptions =
      product.variants.find((v) => v.value === "CPU")?.options || [];
    const ramOptions =
      product.variants.find((v) => v.value === "Ram")?.options || [];
    const storageOptions =
      product.variants.find((v) => v.value === "Rom")?.options || [];
    const locationOptions =
      product.variants.find((v) => v.value === "Location")?.options || [];
    const osOptions =
      product.variants.find((v) => v.value === "OS")?.options || [];
    const bandwidthOptions =
      product.variants.find((v) => v.value === "Bandwidth")?.options || [];
    const handleAddToCart = () => {
      if (!sku?.id || !selectedPeriod) return;

      const cartItems = (cartData?.payload as any)?.data?.data || [];
      const existingItem = cartItems.find((item: any) => item.skuId === sku.id);

      const rentalPeriod = Number(selectedPeriod);

      if (existingItem) {
        const newRentalPeriod = existingItem.rentalPeriod + rentalPeriod;
        console.log(sku);
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
    const configOptions = [
      {
        label: "CPU",
        key: "CPU",
        options: cpuOptions,
        placeholder: "Chọn CPU",
      },
      {
        label: "RAM",
        key: "Ram",
        options: ramOptions,
        placeholder: "Chọn RAM",
      },
      {
        label: "Ổ cứng",
        key: "Rom",
        options: storageOptions,
        placeholder: "Chọn ổ cứng",
      },
      {
        label: "Vị trí",
        key: "Location",
        options: locationOptions,
        placeholder: "Chọn vị trí",
      },
      {
        label: "Hệ điều hành",
        key: "OS",
        options: osOptions,
        placeholder: "Chọn hệ điều hành",
      },
      {
        label: "Băng thông",
        key: "Bandwidth",
        options: bandwidthOptions,
        placeholder: "Chọn băng thông",
      },
    ];
    return (
      <div className="mt-8">
        <div className="grid gap-6 rounded-2xl border px-6 pt-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
          {configOptions.map(({ label, key, options, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <Select
                value={selectedConfig[key] || options[0]}
                onValueChange={(value) =>
                  handleConfigChange(productId, key, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border p-6">
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
                {formatPrice(totalPrice[productId] || 0)} VNĐ
              </div>
            </div>
            <Button
              className="bg-primary w-full md:w-auto"
              onClick={() => handleAddToCart()}
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
      <div className="container mx-auto py-10 text-center">Đang tải...</div>
    );
  }

  const vpsTypes = products.map((product) => ({
    id: product.name.toLowerCase().replace(/\s+/g, "-"),
    label: product.name,
    active: product.id.toString() === activeTab,
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 lg:py-20">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Bảng chọn gói VPS</h1>
        <p className="text-[13px] text-gray-500">
          Chọn gói VPS phù hợp với nhu cầu của bạn và bắt đầu sử dụng ngay
        </p>
      </div>
      <Tabs
        defaultValue={
          vpsTypes.find((type) => type.active)?.id || vpsTypes[0]?.id
        }
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
                (sku) => sku.value === configString,
              );
              setSku(matchingSku || null);
            }
          }
        }}
        className="flex w-full flex-col items-center justify-center"
      >
        <TabsList className="h-16 w-full overflow-x-auto rounded-3xl bg-neutral-800 px-4">
          <div className="flex min-w-0 flex-nowrap">
            {vpsTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className={`h-12 rounded-3xl text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md ${
                  type.active
                    ? "flex-1 md:flex-none md:px-8"
                    : "flex-1 md:flex-none md:px-8"
                }`}
              >
                {type.label}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>

        {/* Render content for each VPS type */}
        {products.map((product) => {
          const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <TabsContent
              key={product.id}
              value={productSlug}
              className="mt-6 w-full"
            >
              <Tabs
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
                className="w-full"
              >
                <TabsList className="flex h-10 w-full justify-between gap-5 overflow-x-auto rounded-3xl bg-white p-1.5 text-black">
                  {billingPeriods.map((period) => (
                    <TabsTrigger
                      key={period.id}
                      value={period.id}
                      className="data-[state=active]:bg-primary relative h-8 flex-1 rounded-3xl transition-all data-[state=active]:text-white"
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

                {renderConfigForm(product)}
              </Tabs>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
