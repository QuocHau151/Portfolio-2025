import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Zap } from "lucide-react";

export default function ServerLocations() {
  const locations = [
    {
      country: "Việt Nam",
      city: "Hồ Chí Minh",
      flag: "🇻🇳",
      ping: "< 5ms",
      status: "online",
      specs: "Tier 3 Datacenter",
    },
    {
      country: "Việt Nam",
      city: "Hà Nội",
      flag: "🇻🇳",
      ping: "< 8ms",
      status: "online",
      specs: "Tier 3 Datacenter",
    },
    {
      country: "Singapore",
      city: "Singapore",
      flag: "🇸🇬",
      ping: "< 15ms",
      status: "online",
      specs: "Tier 4 Datacenter",
    },
    {
      country: "Japan",
      city: "Tokyo",
      flag: "🇯🇵",
      ping: "< 25ms",
      status: "online",
      specs: "Tier 4 Datacenter",
    },
    {
      country: "USA",
      city: "Los Angeles",
      flag: "🇺🇸",
      ping: "< 180ms",
      status: "online",
      specs: "Tier 3 Datacenter",
    },
    {
      country: "Germany",
      city: "Frankfurt",
      flag: "🇩🇪",
      ping: "< 200ms",
      status: "online",
      specs: "Tier 4 Datacenter",
    },
  ];

  return (
    <section className="px-4 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-bold">Vị Trí Máy Chủ</h2>
          <p className="text-[15px] text-gray-400">
            Mạng lưới datacenter toàn cầu với độ trễ thấp và hiệu năng cao
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <div
              key={index}
              className="rounded-xl bg-neutral-800 p-6 transition-colors hover:bg-gray-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{location.flag}</span>
                  <div>
                    <h3 className="font-semibold">{location.country}</h3>
                    <p className="text-sm text-gray-400">{location.city}</p>
                  </div>
                </div>
                <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                  Online
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Ping: {location.ping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{location.specs}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Uptime 99.9%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Tất cả datacenter đều được trang bị DDoS protection và monitoring
            24/7
          </p>
        </div>
      </div>
    </section>
  );
}
