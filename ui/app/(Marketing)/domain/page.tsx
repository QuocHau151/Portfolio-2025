"use client";

import type React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Check,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function DomainSalesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tld, setTld] = useState(".com");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularTLDs = [
    { value: ".com", label: ".com", price: "$12.99", originalPrice: "$15.99" },
    { value: ".net", label: ".net", price: "$14.99", originalPrice: "$17.99" },
    { value: ".org", label: ".org", price: "$11.99", originalPrice: "$14.99" },
    { value: ".io", label: ".io", price: "$39.99", originalPrice: "$49.99" },
    { value: ".vn", label: ".vn", price: "$15.99", originalPrice: "$19.99" },
    { value: ".co", label: ".co", price: "$24.99", originalPrice: "$29.99" },
    { value: ".info", label: ".info", price: "$9.99", originalPrice: "$12.99" },
    { value: ".biz", label: ".biz", price: "$13.99", originalPrice: "$16.99" },
  ];

  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "199,000",
      period: "/năm",
      features: [
        "1 tên miền miễn phí",
        "DNS quản lý cơ bản",
        "Chuyển tiếp email (5 địa chỉ)",
        "Hỗ trợ 24/7",
        "SSL miễn phí",
      ],
      popular: false,
    },
    {
      name: "Chuyên nghiệp",
      price: "399,000",
      period: "/năm",
      features: [
        "3 tên miền miễn phí",
        "DNS quản lý nâng cao",
        "Email hosting (50GB)",
        "Hỗ trợ ưu tiên",
        "SSL Wildcard",
        "Bảo vệ WHOIS",
        "Backup tự động",
      ],
      popular: true,
    },
    {
      name: "Doanh nghiệp",
      price: "799,000",
      period: "/năm",
      features: [
        "10 tên miền miễn phí",
        "DNS quản lý cao cấp",
        "Email hosting không giới hạn",
        "Hỗ trợ chuyên dụng",
        "SSL EV Certificate",
        "Bảo vệ thương hiệu",
        "API quản lý",
        "Báo cáo chi tiết",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      company: "Tech Startup",
      content:
        "Dịch vụ tuyệt vời! Tôi đã đăng ký 5 tên miền và quá trình rất đơn giản.",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      company: "E-commerce Store",
      content:
        "Hỗ trợ khách hàng rất tốt, giải quyết vấn đề nhanh chóng và hiệu quả.",
      rating: 5,
    },
    {
      name: "Lê Minh C",
      company: "Digital Agency",
      content:
        "Giá cả hợp lý, tính năng đầy đủ. Đã sử dụng 2 năm và rất hài lòng.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Tên miền là gì?",
      answer:
        "Tên miền là địa chỉ duy nhất của website trên internet, ví dụ như google.com. Nó giúp người dùng dễ dàng truy cập vào website của bạn thay vì phải nhớ địa chỉ IP phức tạp.",
    },
    {
      question: "Tôi có thể chuyển tên miền từ nhà cung cấp khác không?",
      answer:
        "Có, bạn có thể chuyển tên miền từ nhà cung cấp khác. Quá trình chuyển thường mất 5-7 ngày và chúng tôi sẽ hỗ trợ bạn trong suốt quá trình này.",
    },
    {
      question: "Có được hoàn tiền không?",
      answer:
        "Chúng tôi có chính sách hoàn tiền trong vòng 30 ngày đầu tiên nếu bạn không hài lòng với dịch vụ.",
    },
    {
      question: "SSL Certificate có miễn phí không?",
      answer:
        "Có, chúng tôi cung cấp SSL Certificate miễn phí cho tất cả tên miền đăng ký tại hệ thống của chúng tôi.",
    },
    {
      question: "Tôi có thể quản lý DNS như thế nào?",
      answer:
        "Bạn có thể quản lý DNS thông qua bảng điều khiển của chúng tôi với giao diện thân thiện và dễ sử dụng.",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setIsSearching(true);

    setTimeout(() => {
      const results = popularTLDs.map((tldOption) => {
        const domain = `${searchQuery}${tldOption.value}`;
        const isAvailable = Math.random() > 0.4;

        return {
          domain,
          tld: tldOption.value,
          available: isAvailable,
          price: tldOption.price,
          originalPrice: tldOption.originalPrice,
        };
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="">
        <div className="container mx-auto px-4 text-center lg:pt-20">
          <h1 className="mb-4 text-5xl font-bold">Tìm tên miền hoàn hảo</h1>
          <p className="mb-8 text-xl">
            Hơn 2 triệu khách hàng tin tưởng chúng tôi
          </p>

          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-6">
              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <div className="relative flex-grow">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    type="text"
                    placeholder="Nhập tên miền của bạn"
                    className="h-12 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={tld} onValueChange={setTld}>
                  <SelectTrigger className="h-12 w-[120px]">
                    <SelectValue placeholder=".com" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularTLDs.map((tld) => (
                      <SelectItem key={tld.value} value={tld.value}>
                        {tld.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="mt-2 h-12 px-8"
                >
                  {isSearching ? "Đang tìm..." : "Tìm kiếm"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Kết quả tìm kiếm
            </h2>
            <div className="mx-auto grid max-w-4xl gap-4">
              {searchResults.map((result, index) => (
                <Card
                  key={index}
                  className={
                    result.available
                      ? "border-green-200 bg-neutral-800"
                      : "border-gray-200"
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {result.available ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <X className="h-6 w-6 text-red-500" />
                        )}
                        <div>
                          <span className="text-xl font-bold">
                            {result.domain}
                          </span>
                          {result.available && (
                            <Badge className="ml-3 bg-green-500 text-black">
                              Có sẵn
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm line-through">
                              {result.originalPrice}
                            </span>
                            <span className="text-xl font-bold text-green-600">
                              {result.price}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              /năm
                            </span>
                          </div>
                        </div>
                        {result.available ? (
                          <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Đăng ký ngay
                          </Button>
                        ) : (
                          <Button size="lg" variant="outline">
                            Đề nghị mua
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        <section className="mb-16 py-10">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-neutral-800 text-center">
              <CardHeader>
                <Shield className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <CardTitle>Bảo mật cao</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SSL miễn phí và bảo vệ WHOIS cho tất cả tên miền
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 text-center">
              <CardHeader>
                <Zap className="mx-auto mb-4 h-12 w-12 text-yellow-600" />
                <CardTitle>Tốc độ nhanh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  DNS toàn cầu với thời gian phản hồi dưới 50ms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 text-center">
              <CardHeader>
                <Users className="mx-auto mb-4 h-12 w-12 text-green-600" />
                <CardTitle>Hỗ trợ 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn mọi lúc
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 text-center">
              <CardHeader>
                <Award className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <CardTitle>Uy tín</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hơn 10 năm kinh nghiệm và 2 triệu khách hàng
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Dịch vụ của chúng tôi
          </h2>
          <Tabs defaultValue="domains" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-4 bg-neutral-800">
              <TabsTrigger value="domains">Tên miền</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="ssl">SSL</TabsTrigger>
              <TabsTrigger value="dns">DNS</TabsTrigger>
            </TabsList>

            <TabsContent value="domains" className="mt-8 bg-neutral-800">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-6 w-6" />
                    Quản lý tên miền
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• Đăng ký tên miền với hơn 500 phần mở rộng</li>
                    <li>• Chuyển tên miền miễn phí</li>
                    <li>• Gia hạn tự động</li>
                    <li>• Bảo vệ WHOIS miễn phí</li>
                    <li>• Quản lý DNS dễ dàng</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="mt-8 bg-neutral-800">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    Email chuyên nghiệp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• Email với tên miền riêng</li>
                    <li>• Dung lượng lưu trữ lớn</li>
                    <li>• Bảo mật cao với mã hóa</li>
                    <li>• Truy cập từ mọi thiết bị</li>
                    <li>• Lọc spam thông minh</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ssl" className="mt-8 bg-neutral-800">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Chứng chỉ SSL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• SSL miễn phí cho tất cả tên miền</li>
                    <li>• SSL Wildcard cho subdomain</li>
                    <li>• SSL EV cho doanh nghiệp</li>
                    <li>• Cài đặt tự động</li>
                    <li>• Gia hạn tự động</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dns" className="mt-8 bg-neutral-800">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6" />
                    Quản lý DNS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• DNS toàn cầu với tốc độ cao</li>
                    <li>• Giao diện quản lý trực quan</li>
                    <li>• Backup và khôi phục</li>
                    <li>• API cho nhà phát triển</li>
                    <li>• Monitoring 24/7</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-neutral-800">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Câu hỏi thường gặp
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="rounded-lg p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Cần hỗ trợ?</h2>
            <p className="mb-8 text-xl">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng giúp đỡ bạn
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Gọi ngay: 1900-1234
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat trực tuyến
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
