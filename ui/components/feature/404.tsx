import React from "react";

import Link from "next/link";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-3">
      <p className="text-[20px] font-bold">Không Tìm Thấy Trang</p>
      <p>Vui lòng quay lại </p>
      <Link href="/">
        <Button>Trang Chủ</Button>
      </Link>
    </div>
  );
}
