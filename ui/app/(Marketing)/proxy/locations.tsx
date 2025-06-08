import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Zap } from "lucide-react";

export default function ProxyLocations() {
  const locations = [
    {
      country: "Việt Nam",
      city: "Hồ Chí Minh",
      flag: "🇻🇳",
      ips: "10,000+",
      type: "Residential + Datacenter",
      speed: "< 10ms",
    },
    {
      country: "USA",
      city: "New York",
      flag: "🇺🇸",
      ips: "50,000+",
      type: "Residential + Mobile",
      speed: "< 20ms",
    },
    {
      country: "UK",
      city: "London",
      flag: "🇬🇧",
      ips: "30,000+",
      type: "Residential + Datacenter",
      speed: "< 25ms",
    },
    {
      country: "Germany",
      city: "Frankfurt",
      flag: "🇩🇪",
      ips: "25,000+",
      type: "Datacenter",
      speed: "< 15ms",
    },
    {
      country: "Japan",
      city: "Tokyo",
      flag: "🇯🇵",
      ips: "20,000+",
      type: "Residential + Mobile",
      speed: "< 30ms",
    },
    {
      country: "Singapore",
      city: "Singapore",
      flag: "🇸🇬",
      ips: "15,000+",
      type: "Datacenter",
      speed: "< 12ms",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Mạng Lưới Proxy Toàn Cầu</h2>
          <p className="text-lg text-neutral-400">
            Hơn 1 triệu IP từ 100+ quốc gia với tốc độ cao và độ ổn định tuyệt
            vời
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <div
              key={index}
              className="rounded-xl bg-neutral-800 p-6 transition-colors hover:bg-neutral-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{location.flag}</span>
                  <div>
                    <h3 className="font-semibold">{location.country}</h3>
                    <p className="text-sm text-neutral-400">{location.city}</p>
                  </div>
                </div>
                <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{location.ips} IP available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{location.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Ping: {location.speed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-400">Và hơn 90+ quốc gia khác...</p>
          <Button className="bg-green-500 font-semibold text-black hover:bg-green-600">
            Xem danh sách đầy đủ
          </Button>
        </div>
      </div>
    </section>
  );
}
