import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Wifi, Zap } from "lucide-react";

export default function VPNServerLocations() {
  const regions = [
    {
      region: "Châu Á - Thái Bình Dương",
      countries: [
        {
          country: "Việt Nam",
          city: "Hồ Chí Minh",
          flag: "🇻🇳",
          servers: "50+",
          ping: "< 5ms",
          load: "12%",
        },
        {
          country: "Singapore",
          city: "Singapore",
          flag: "🇸🇬",
          servers: "100+",
          ping: "< 15ms",
          load: "25%",
        },
        {
          country: "Japan",
          city: "Tokyo",
          flag: "🇯🇵",
          servers: "200+",
          ping: "< 30ms",
          load: "18%",
        },
        {
          country: "South Korea",
          city: "Seoul",
          flag: "🇰🇷",
          servers: "80+",
          ping: "< 35ms",
          load: "22%",
        },
      ],
    },
    {
      region: "Bắc Mỹ",
      countries: [
        {
          country: "USA",
          city: "New York",
          flag: "🇺🇸",
          servers: "500+",
          ping: "< 180ms",
          load: "15%",
        },
        {
          country: "USA",
          city: "Los Angeles",
          flag: "🇺🇸",
          servers: "400+",
          ping: "< 170ms",
          load: "20%",
        },
        {
          country: "Canada",
          city: "Toronto",
          flag: "🇨🇦",
          servers: "150+",
          ping: "< 190ms",
          load: "18%",
        },
      ],
    },
    {
      region: "Châu Âu",
      countries: [
        {
          country: "UK",
          city: "London",
          flag: "🇬🇧",
          servers: "300+",
          ping: "< 200ms",
          load: "16%",
        },
        {
          country: "Germany",
          city: "Frankfurt",
          flag: "🇩🇪",
          servers: "250+",
          ping: "< 210ms",
          load: "14%",
        },
        {
          country: "Netherlands",
          city: "Amsterdam",
          flag: "🇳🇱",
          servers: "200+",
          ping: "< 205ms",
          load: "19%",
        },
      ],
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Mạng Lưới Servers Toàn Cầu
          </h2>
          <p className="text-lg text-neutral-400">
            5000+ servers tại 60+ quốc gia với tốc độ 10Gbps và uptime 99.9%
          </p>
        </div>

        <div className="space-y-12">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex}>
              <h3 className="mb-6 text-2xl font-bold text-green-400">
                {region.region}
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {region.countries.map((location, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-neutral-800 p-6 transition-colors hover:bg-neutral-700"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{location.flag}</span>
                        <div>
                          <h4 className="font-semibold">{location.country}</h4>
                          <p className="text-sm text-neutral-400">
                            {location.city}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          Number.parseInt(location.load) < 20
                            ? "border-green-500/30 bg-green-500/20 text-green-400"
                            : "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {location.load} load
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-400" />
                        <span className="text-sm">
                          {location.servers} servers
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Ping: {location.ping}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-green-400" />
                        <span className="text-sm">10Gbps bandwidth</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-400">
            Và hơn 50+ quốc gia khác với 5000+ servers...
          </p>
          <Button className="bg-green-500 font-semibold text-black hover:bg-green-600">
            Xem danh sách đầy đủ
          </Button>
        </div>
      </div>
    </section>
  );
}
