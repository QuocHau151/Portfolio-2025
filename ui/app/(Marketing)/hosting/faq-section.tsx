import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HostingFAQSection() {
  const faqs = [
    {
      question: "Hosting là gì và khác gì với VPS?",
      answer:
        "Hosting (Shared Hosting) là dịch vụ lưu trữ website trên máy chủ chia sẻ với nhiều website khác. Khác với VPS, hosting có giá rẻ hơn, dễ sử dụng hơn nhưng tài nguyên bị giới hạn và chia sẻ với người khác.",
    },
    {
      question: "Tôi có được tên miền miễn phí không?",
      answer:
        "Có, tất cả gói hosting từ Starter trở lên đều được tặng miễn phí tên miền .com hoặc .net trong năm đầu tiên. Từ năm thứ 2, bạn sẽ trả phí gia hạn tên miền theo giá thị trường.",
    },
    {
      question: "Hosting có hỗ trợ WordPress không?",
      answer:
        "Có, hosting của chúng tôi được tối ưu hóa đặc biệt cho WordPress với LiteSpeed Web Server, caching tích hợp, auto-update và cài đặt WordPress chỉ với 1 click.",
    },
    {
      question: "Thời gian setup hosting là bao lâu?",
      answer:
        "Hosting sẽ được kích hoạt tự động ngay sau khi thanh toán thành công. Thông tin đăng nhập cPanel và FTP sẽ được gửi qua email trong vòng 5-10 phút.",
    },
    {
      question: "Tôi có thể nâng cấp gói hosting không?",
      answer:
        "Có, bạn có thể nâng cấp lên gói cao hơn bất cứ lúc nào. Phí nâng cấp sẽ được tính theo tỷ lệ thời gian còn lại và chỉ cần thanh toán phần chênh lệch.",
    },
    {
      question: "Có hỗ trợ backup dữ liệu không?",
      answer:
        "Có, gói Business trở lên có backup tự động hàng ngày, lưu trữ 30 ngày. Bạn có thể khôi phục website về bất kỳ thời điểm nào trong 30 ngày qua chỉ với 1 click.",
    },
    {
      question: "SSL certificate có miễn phí không?",
      answer:
        "Có, tất cả gói hosting đều được tích hợp SSL certificate miễn phí từ Let's Encrypt. SSL sẽ được cài đặt tự động và gia hạn tự động mà không cần bạn làm gì.",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer:
        "Chúng tôi có chính sách hoàn tiền 100% trong vòng 30 ngày đầu nếu bạn không hài lòng với dịch vụ. Sau thời gian này, hoàn tiền sẽ được tính theo tỷ lệ thời gian sử dụng.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Câu Hỏi Thường Gặp</h2>
          <p className="text-lg text-neutral-400">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ Hosting
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border-neutral-700 bg-neutral-800 px-6"
            >
              <AccordionTrigger className="text-left transition-colors hover:text-green-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-400">
            Không tìm thấy câu trả lời bạn cần?
          </p>
          <a
            href="#contact"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            Liên hệ với chúng tôi →
          </a>
        </div>
      </div>
    </section>
  );
}
