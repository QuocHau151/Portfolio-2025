"use client";
import { DotButton, useDotButton } from "@/hooks/useDotCarousel";
import { zodResolver } from "@hookform/resolvers/zod";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowDownToLine,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SiZalo } from "react-icons/si";
import StackIcon from "tech-stack-icons";

import BlurText from "@/components/ui/blurText";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as z from "zod";
export default function CV() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    subject: z.string().min(1),
    note: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <div className="relative container flex h-full w-full flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between 2xl:justify-center">
      <div className="h-[85vh] w-[90%] overflow-hidden rounded-[60px] bg-neutral-800 lg:sticky lg:top-20 lg:h-[85vh] lg:w-[40%] xl:top-[100px] 2xl:top-[150px] 2xl:h-[68vh]">
        <div className="m-6 aspect-square overflow-hidden rounded-[50px] bg-gray-500">
          <Image
            src={"/assets/logo/avt.jpeg"}
            alt="avatar"
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mb-6 flex flex-col items-center justify-center gap-4 text-2xl xl:mb-12">
          <p className="text-primary underline underline-offset-4">
            Fullstack Developer
          </p>
          <p className="font-bold uppercase">trần lê quốc hậu </p>
          <p className="hidden text-lg text-neutral-500 lg:block xl:text-xl">
            tranlequochau.blc@gmail.com
          </p>
        </div>
        <div className="bg-primary flex h-full w-full flex-col items-center gap-5 py-5">
          <p className="font-bold uppercase lg:mt-2">Contact me:</p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href={"https://www.facebook.com/quochau151/"}
              target="_blank"
              className="rounded-full border-2 border-white p-3"
            >
              <Facebook />
            </Link>
            <Link
              href={"zalo:0399603123"}
              className="rounded-full border-2 border-white p-3"
            >
              <SiZalo size={26} />
            </Link>
            <Link href={""} className="rounded-full border-2 border-white p-3">
              <Github />
            </Link>
            <Link href={""} className="rounded-full border-2 border-white p-3">
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center lg:max-w-[73%]">
        <div className="mt-20 flex flex-col items-center gap-3 lg:me-auto lg:mt-10 lg:ml-14 lg:max-w-[70%] lg:items-start">
          <div className="border-primary mb-4 rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
            Introduction
          </div>
          <h1 className="inline px-6 text-center text-[35px] font-bold lg:px-0 lg:text-left">
            <BlurText
              text="Hello, I’m Quoc Hau"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-primary flex items-center justify-center lg:justify-start"
            />
            Developer Web Application All In JS,TS & SEO Marketing
          </h1>
          <p className="mb-4 px-6 text-center text-[16px] text-neutral-500 lg:px-0 lg:text-left">
            I am a web developer with a passion for creating dynamic and
            responsive web applications. I have experience in both front-end and
            back-end development, and I am always eager to learn new
            technologies and improve my skills.
          </p>
          <Link
            href={"mailto:"}
            className="bg-primary mb-4 flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-[13px]"
          >
            <Mail />
            <p className="font-bold uppercase">hire me now</p>
          </Link>
          <Link
            href={""}
            className="t flex items-center justify-center gap-2 font-bold"
          >
            <ArrowDownToLine className="bg-primary rounded-sm p-1" />
            <p className="ext-[14px] underline ring-offset-2">Download CV</p>
          </Link>
        </div>
        <div className="mx-10 mt-16 flex w-[90%] flex-col rounded-2xl border border-neutral-600 bg-neutral-800 lg:flex-row">
          <div className="flex flex-col gap-2 border-b-1 border-neutral-500 p-6 lg:basis-1/3 lg:border-r-1 lg:border-b-0 lg:p-10">
            <h1 className="text-primary text-[18px] font-semibold">Home</h1>
            <p className="text-[22px] font-medium">Thu Duc, Ho Chi Minh Ctiy</p>
          </div>
          <div className="flex flex-col gap-2 border-b-1 border-neutral-500 p-6 lg:basis-1/3 lg:border-r-1 lg:border-b-0 lg:p-10">
            <h1 className="text-primary text-[18px] font-semibold">
              Experience
            </h1>
            <p className="text-[22px] font-medium">+2 Years</p>
          </div>
          <div className="flex flex-col gap-2 p-6 lg:basis-1/3 lg:p-10">
            <h1 className="text-primary text-[18px] font-semibold">Projects</h1>
            <p className="text-[22px] font-medium">+10</p>
          </div>
        </div>
        <div className="mx-4 mt-20 flex flex-col items-center gap-3 lg:ml-14 lg:items-start">
          <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
            About Me
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <div className="min-w-[50%] space-y-4">
              <h1 className="text-center text-[30px] font-medium lg:max-w-[70%] lg:text-left">
                I Have Experience In 3D - Design, Developer, Deploy Web
                Application
              </h1>
              <Link
                href={""}
                className="flex items-center justify-center gap-2 font-bold lg:justify-start"
              >
                <ArrowDownToLine className="bg-primary rounded-sm p-1" />
                <p className="ext-[14px] underline ring-offset-2">
                  Download CV
                </p>
              </Link>
            </div>
            <div className="lg:-ml-[120px]">
              <p className="px-4 text-justify text-[16px] text-neutral-500">
                I have a strong understanding of web development principles and
                best practices, and I am proficient in a variety of programming
                languages and frameworks. I am also experienced in SEO marketing
                and have a good understanding of how to optimize web
                applications for search engines. I am a quick learner and I am
                always looking for new challenges and opportunities to grow my
                skills. I am a team player and I enjoy collaborating with others
                to create high-quality web applications. I am also comfortable
                working independently and managing my own projects. I am excited
                to continue my career in web development and to take on new
                challenges. I am confident that my skills and experience make me
                a valuable asset to any team.
              </p>
              <p className="px-4 text-justify text-[16px] text-neutral-500">
                I am looking forward to the opportunity to work with you and to
                contribute to your projects. I am always open to new
                opportunities and I would love to hearfrom you. If you have any
                questions or if you would like to discuss a potential project,
                please feel free to contact me. I am always open to new
                opportunities and I would love to hear from you. If you have any
                questions or if you would like to discuss a potential project,
                please feel free to contact me. I am always open to new
                opportunities and I would love to hear from you. If you have any
                questions or if you would like to discuss a potential project,
                please feel free to contact me. I am always open to new
                opportunities and I would love to hear from you. If you have any
                questions or if you would like to discuss a potential project,
                please feel free to contact me.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-20 flex w-full flex-col items-center justify-center gap-3 lg:ml-14">
          <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
            My Skills
          </div>
          <h1 className="text-center text-[30px] font-medium">My Advantages</h1>
          <div className="mt-4 flex w-[100%] flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4">
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-4 text-[22px] font-semibold">
                Front End Development
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-[17px]">
                <StackIcon className="size-7" name="html5" />
                <StackIcon className="size-7" name="css3" />
                <StackIcon className="size-7" name="js" />
                <StackIcon className="size-7" name="typescript" />
                <StackIcon className="size-7" name="reactjs" />
                <StackIcon className="size-7" name="nextjs2" />
                <StackIcon className="size-7" name="tailwindcss" />
                <StackIcon className="size-7" name="framer" />
                <StackIcon className="size-7" name="gsap" />
                <StackIcon className="size-7" name="radixui" />
                <StackIcon className="size-7" name="reactquery" />
                <StackIcon className="size-7" name="sass" />
                <StackIcon className="size-7" name="shadcnui" />
                <StackIcon className="size-7" name="threejs" />
              </div>
            </div>
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-4 text-[22px] font-semibold">
                Back End Development
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-[17px]">
                <StackIcon className="size-7" name="typescript" />
                <StackIcon className="size-7" name="nodejs" />
                <StackIcon className="size-7" name="mongodb" />
                <StackIcon className="size-7" name="nestjs" />
                <StackIcon className="size-7" name="nextjs2" />
                <StackIcon className="size-7" name="postgresql" />
                <StackIcon className="size-7" name="postman" />
                <StackIcon className="size-7" name="prisma" />
                <StackIcon className="size-7" name="redis" />
                <StackIcon className="size-7" name="resend" />
                <StackIcon className="size-7" name="supabase" />
                <StackIcon className="size-7" name="swagger" />
                <StackIcon className="size-7" name="zod" />
                <StackIcon className="size-7" name="elastic" />
                <StackIcon className="size-7" name="jest" />
                <StackIcon className="size-7" name="swagger" />
              </div>
            </div>
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-4 text-[22px] font-semibold">
                DevOps Development
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-[17px]">
                <StackIcon className="size-7" name="linux" />
                <StackIcon className="size-7" name="ubuntu" />
                <StackIcon className="size-7" name="docker" />
                <StackIcon className="size-7" name="kubernetes" />
                <StackIcon className="size-7" name="git" />
                <StackIcon className="size-7" name="github" />
                <StackIcon className="size-7" name="cloudflare" />
                <StackIcon className="size-7" name="grafana" />
                <StackIcon className="size-7" name="gcloud" />
                <StackIcon className="size-7" name="kibana" />
              </div>
            </div>
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-4 text-[22px] font-semibold">
                Server Manegerment
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-[17px]">
                <Image
                  src={"/assets/logo/proxmox.png"}
                  width={150}
                  height={50}
                  alt=""
                />
                <StackIcon className="size-7" name="linux" />
                <StackIcon className="size-7" name="ubuntu" />
              </div>
            </div>
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-2 text-[22px] font-semibold">
                Designer
              </h1>
              <div className="mb-6 flex flex-wrap gap-3 text-[17px]">
                <StackIcon className="size-7" name="ps" />
                <StackIcon className="size-7" name="ai" />
                <StackIcon className="size-7" name="figma" />
              </div>
            </div>
            <div className="flex w-[90%] flex-col items-start rounded-2xl bg-neutral-800 p-6 lg:min-h-[250px] lg:w-[30%]">
              <h1 className="text-primary mb-2 text-[22px] font-semibold">
                SEO Marketing
              </h1>
              <div className="mb-6 flex flex-wrap gap-3">
                <Image
                  src={"/assets/logo/n8n.png"}
                  width={120}
                  height={70}
                  alt=""
                />
                <Image
                  src={"/assets/logo/gg.jpg"}
                  width={80}
                  height={50}
                  alt=""
                />
                <Image
                  src={"/assets/logo/ga4.png"}
                  width={100}
                  height={50}
                  alt=""
                />
                <Image
                  src={"/assets/logo/semrush.png"}
                  width={100}
                  height={50}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-4 px-10 text-center text-[16px] text-neutral-500">
              Want to see what i am going to offer? Click here to{" "}
              <Link href={""} className="inline-block">
                <p className="text-primary">View More Services</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 lg:ml-14 lg:flex-row lg:items-start">
          <div className="mx-4 mt-20 flex w-full flex-col items-center justify-center gap-3 lg:mx-0">
            <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
              Companies
            </div>
            <h1 className="text-center text-[30px] font-medium">
              I Worked With Companies
            </h1>
            <div className="mt-4 flex w-[90%] flex-col items-center gap-6 overflow-hidden rounded-2xl border border-neutral-600 bg-neutral-800">
              <div className="flex h-[100px] w-full items-center justify-center rounded-t-2xl border-b-1 border-neutral-600">
                <Image
                  src={"/assets/logo/fpt.png"}
                  alt="company"
                  width={150}
                  height={150}
                />
              </div>
              <div className="-mt-4 flex h-[100px] w-full items-center justify-center rounded-t-2xl border-b-1 border-neutral-600">
                <Image
                  src={"/assets/logo/sikido.png"}
                  alt="company"
                  width={90}
                  height={90}
                />
              </div>
              <div className="-mt-4 flex h-[100px] w-full items-center justify-center rounded-t-2xl">
                <Image
                  src={"/assets/logo/khangminh.png"}
                  alt="company"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="mx-4 mt-20 flex w-full flex-col items-center justify-center gap-3">
            <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
              Knowledge
            </div>
            <h1 className="mb-4 text-center text-[30px] font-medium">
              My Education
            </h1>
            <div className="flex w-full flex-col items-center gap-6">
              <div className="relative flex w-[90%] flex-col items-center overflow-hidden rounded-2xl bg-neutral-800 py-10">
                <h1 className="text-primary mb-2 text-[22px] font-semibold">
                  Cử Nhân Kinh Tế Học
                </h1>
                <p className="font-bold">Đại Học Kinh Tế Luật</p>
                <div className="bg-primary absolute right-0 bottom-0 rounded-tl-2xl px-4 py-2 text-[13px]">
                  2020-2024
                </div>
              </div>
              <div className="relative flex w-[90%] flex-col items-center overflow-hidden rounded-2xl bg-neutral-800 py-10">
                <h1 className="text-primary mb-2 text-[22px] font-semibold">
                  Complete FrontEnd Course
                </h1>
                <p className="font-bold">CFD Circle</p>
                <div className="bg-primary absolute right-0 bottom-0 rounded-tl-2xl px-4 py-2 text-[13px]">
                  2021-2022
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 flex w-full flex-col items-center justify-center gap-3 lg:ml-14">
          <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
            Portfolio
          </div>
          <h1 className="mb-4 text-center text-[30px] font-medium">
            My Recent Projects
          </h1>
          <div className="w-[90%] overflow-hidden lg:w-full" ref={emblaRef}>
            <div className="flex gap-6">
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/fpt.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://www.fpt-smarthome.vn/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">
                    FPT Smart Home
                  </h1>
                  <p>Fullstack app with Nextjs, PostgreSQL</p>
                </Link>
                <Link
                  href={"https://www.fpt-smarthome.vn/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/mepsharing.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://www.mepsharing.com/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">MEPSHARING</h1>
                  <p>Fullstack app with Nextjs, PostgreSQL</p>
                </Link>
                <Link
                  href={"https://www.mepsharing.com/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/khuetuan.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://khuetuan.com/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">
                    Ván Ép Khưe Tuấn
                  </h1>
                  <p>Fullstack app with Nextjs, PostgreSQL</p>
                </Link>
                <Link
                  href={"https://khuetuan.com/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/khangminh.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://khangminhlighting.com/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">
                    Khang Minh Lighting
                  </h1>
                  <p>Fullstack app with Nextjs, PostgreSQL</p>
                </Link>
                <Link
                  href={"https://khangminhlighting.com/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/namanvi.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://namanvi.com/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">Nấm An Vi</h1>
                  <p>Design For Sikido</p>
                </Link>
                <Link
                  href={"https://namanvi.com/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
              <div className="relative flex flex-none basis-full flex-col items-center lg:basis-[31%]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-800">
                  <Image
                    src={"/assets/images/project/sol.png"}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-top"
                  />
                </div>
                <Link
                  href={"https://solmedia.pics/"}
                  target="_blank"
                  className="flex w-full flex-col items-start gap-2 px-3 py-6"
                >
                  <h1 className="text-primary text-xl font-bold">Sol Media</h1>
                  <p>Fullstack app with Nextjs, PostgreSQL</p>
                </Link>
                <Link
                  href={"https://solmedia.pics/"}
                  target="_blank"
                  className="border-primary text-primary absolute right-[1%] bottom-[10%] ml-auto rounded-full border-2 p-2 lg:hidden"
                >
                  <MoveUpRight className="text-primary size-5 lg:size-5" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`border-primary relative flex h-3 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ease-in-out ${
                    index === selectedIndex ? "w-10" : "w-3"
                  }`}
                >
                  {index === selectedIndex && (
                    <div className="bg-primary animate-progress-bar absolute left-0 h-full" />
                  )}
                </DotButton>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20 flex w-full flex-col items-center justify-center gap-3 lg:ml-14">
          <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
            My Blogs
          </div>
          <h1 className="text-center text-[30px] font-medium">
            My Recent Blogs
          </h1>
          <p>Not Found</p>
        </div>
        <div className="mt-20 flex w-[90%] flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-600 bg-neutral-800 p-6 lg:ml-14 lg:flex-row lg:items-center lg:justify-around lg:border-0 lg:p-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-primary text-center text-[25px] font-medium lg:text-left">
              Let's Work Together
            </h1>
            <p className="text-center text-neutral-400">
              Let’s start to capture the wonderful moments of your life.
            </p>
          </div>

          <Link
            href={""}
            className="bg-primary flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold"
          >
            Contact Me
          </Link>
        </div>
        <div className="mt-20 mb-10 flex w-[90%] flex-col items-center justify-center gap-3 rounded-3xl bg-neutral-800 p-6 lg:ml-14 lg:flex-row lg:items-start lg:justify-around lg:gap-10 lg:px-16">
          <div className="flex flex-col items-center gap-2 lg:basis-1/3 lg:items-start lg:py-10">
            <div className="border-primary rounded-4xl border-2 px-6 py-1 text-[14px] font-bold">
              Want to Hire Me?
            </div>
            <h1 className="text-center text-[30px] font-medium lg:text-left">
              Let's Work Together
            </h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto w-full space-y-10 py-8 lg:basis-2/3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 border-b-[1px]"
                        placeholder="Full Name*"
                        type=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 border-b-[1px]"
                        placeholder="Email*"
                        type=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 border-b-[1px]"
                        placeholder="Phone Number*"
                        type=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-0 border-b-[1px]"
                        placeholder="Your Subject*"
                        type=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        className="boder-0 resize-none border-b-[1px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="bg-primary rounded-xl px-6 py-3 text-[15px] font-bold"
              >
                Contact Me
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
