"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

import {
  useComponentQuery,
  useGetTypeComponentQuery,
} from "@/queries/useComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ComponentItem {
  id: number;
  typeId: number;
  name: string;
  description: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface TypeItem {
  id: number;
  name: string;
  components: ComponentItem[];
}

export default function Components() {
  const { data: listTypeComponent } = useGetTypeComponentQuery();
  const { data: listComponent } = useComponentQuery();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rawTypes = (listTypeComponent?.payload as any)?.data ?? [];
  const rawComponents = (listComponent?.payload as any)?.data ?? [];

  // Group components by type
  const typesWithComponents: TypeItem[] = useMemo(() => {
    return rawTypes.map((type: any) => ({
      ...type,
      components: rawComponents.filter(
        (c: ComponentItem) => c.typeId === type.id,
      ),
    }));
  }, [rawTypes, rawComponents]);

  // Filter by search and category
  const filteredTypes = useMemo(() => {
    return typesWithComponents
      .map((type) => ({
        ...type,
        components: type.components.filter((c) => {
          const matchesSearch =
            !search ||
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());
          const matchesCategory =
            activeCategory === "all" || type.name === activeCategory;
          return matchesSearch && matchesCategory;
        }),
      }))
      .filter((type) => type.components.length > 0);
  }, [typesWithComponents, search, activeCategory]);

  const allCategories = useMemo(
    () => ["all", ...typesWithComponents.map((t) => t.name)],
    [typesWithComponents],
  );

  const scrollToSection = (typeName: string) => {
    setActiveCategory(typeName);
    setMobileMenuOpen(false);
    if (typeName === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`section-${typeName}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10 text-center md:mb-14">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase backdrop-blur-sm">
          Thư viện
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-gradient">Components</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted md:text-base">
          Bộ sưu tập các UI components tái sử dụng cho dự án của bạn
        </p>
      </div>

      {/* Mobile: Category Sheet + Search */}
      <div className="mb-6 flex items-center gap-3 lg:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Menu className="mr-2 h-4 w-4" />
              Danh mục
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-white/5 bg-surface"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Danh mục</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToSection(cat)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat === "all" ? "Tất cả" : cat}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm component..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — Desktop */}
        <aside className="sticky top-24 hidden h-[calc(100dvh-8rem)] w-64 shrink-0 overflow-y-auto lg:block lg:self-start">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-bold text-white">Danh mục</h2>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm component..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-white/10 bg-white/5 pl-9 text-sm text-white placeholder:text-muted-foreground focus-visible:ring-primary/20"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <nav className="space-y-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToSection(cat)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat === "all" ? "Tất cả" : cat}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {filteredTypes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted">
              <Search className="mb-4 h-12 w-12 opacity-20" />
              <p className="text-lg font-medium">Không tìm thấy component</p>
              <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredTypes.map((type) => (
                <section
                  key={type.id}
                  id={`section-${type.name}`}
                  className="scroll-mt-28"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white md:text-2xl">
                      {type.name}
                    </h2>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground">
                      {type.components.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {type.components.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl"
                      >
                        {/* Glow on hover */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(600px circle at 50% 0%, rgba(40,236,141,0.06), transparent 60%)",
                          }}
                        />

                        {/* Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative p-5">
                          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary">
                            {item.name}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
