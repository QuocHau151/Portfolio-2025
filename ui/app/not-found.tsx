import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-[-140px] flex h-[100vh] flex-col items-center justify-center gap-5 bg-black text-white">
      <Image
        src={"/assets/images/not-found.png"}
        alt="404"
        width={500}
        height={500}
      />
      <Link href="/" className="font-bold">
        {"=>"} Return Home
      </Link>
    </div>
  );
}
