import { ContactForm } from "@/components/layout/contact/contact-form";
import { ContactInfo } from "@/components/layout/contact/contact-info";
import { SocialLinks } from "@/components/layout/contact/contact-link";
import { LocateIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12 flex flex-col items-center lg:pb-20">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Liên Hệ
        </h1>
        <div className="bg-primary mb-6 h-1 w-20 rounded-full"></div>
        <p className="text-muted-foreground max-w-xl text-center">
          Hãy liên hệ với tôi để thảo luận về dự án của bạn. Tôi luôn sẵn sàng
          hỗ trợ bạn xây dựng các giải pháp công nghệ hiệu quả.
        </p>
      </div>

      <div className="relative mb-12 h-[200px] w-full overflow-hidden rounded-xl bg-neutral-800 md:h-[300px]">
        <Image
          src="/assets/images/contact/1.webp"
          alt="Description"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
            Hãy bắt đầu dự án tiếp theo của bạn
          </h2>
        </div>
      </div>

      <div className="space-y-12">
        <ContactInfo />

        <div className="relative lg:pb-20">
          <div className="bg-muted absolute top-1/2 right-0 left-0 -z-10 h-40 -translate-y-1/2 rounded-xl"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="dark:bg-card flex flex-col items-center rounded-xl bg-neutral-800 p-6 text-center shadow-sm">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <Mail />
              </div>
              <h3 className="mb-2 text-lg font-medium">Email</h3>
              <p className="text-muted-foreground">
                tranlequochau.blc@gmail.com
              </p>
            </div>
            <div className="dark:bg-card flex flex-col items-center rounded-xl bg-neutral-800 p-6 text-center shadow-sm">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <Phone />
              </div>
              <h3 className="mb-2 text-lg font-medium">Điện thoại</h3>
              <p className="text-muted-foreground">0399 603 123</p>
            </div>
            <div className="dark:bg-card flex flex-col items-center rounded-xl bg-neutral-800 p-6 text-center shadow-sm">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black">
                <LocateIcon />
              </div>
              <h3 className="mb-2 text-lg font-medium">Địa chỉ</h3>
              <p className="text-muted-foreground">TP HCM, Việt Nam</p>
            </div>
          </div>
        </div>

        <SocialLinks />

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden rounded-xl bg-neutral-800 md:h-full">
            <Image
              src="/assets/images/contact/2.webp"
              alt="Description"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
