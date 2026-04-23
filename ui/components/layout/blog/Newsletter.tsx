"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="my-16 overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-3">
          <Mail size={24} className="text-primary" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          Đăng ký nhận bài viết mới
        </h2>

        <p className="mb-8 text-sm text-muted-foreground">
          Nhận thông báo khi có bài viết mới về lập trình, công nghệ và kinh nghiệm phát triển phần mềm.
        </p>

        <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary/30 focus:bg-white/[0.07] focus:ring-1 focus:ring-primary/30 focus:outline-none"
          />

          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98]">
            <Send size={16} />
            Đăng ký
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
