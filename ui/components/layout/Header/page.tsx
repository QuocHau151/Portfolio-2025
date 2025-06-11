"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import DropdownAvatar from "@/components/feature/dropdown-avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency } from "@/libs/utils";
import {
  useCartQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "@/queries/useCart";
import { useAppStore } from "@/stores/app";
import { useCartStore } from "@/stores/cart";
import { useOrderStore } from "@/stores/order";
import {
  AlignRight,
  BookOpen,
  Boxes,
  Check,
  FileText,
  Globe,
  LogIn,
  Mail,
  Minus,
  Plus,
  Server,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";

interface LogoProps {
  theme: string;
  isScroll?: boolean;
  isMobile?: boolean;
}
const menuItems = [
  { label: "VPS", icon: Server, href: "/vps" },
  { label: "Proxy", icon: Globe, href: "/proxy" },
  { label: "VPN", icon: Server, href: "/vpn" },
  { label: "Domain", icon: Server, href: "/domain" },
  { label: "Components", icon: Boxes, href: "/components" },
  { label: "Blog", icon: BookOpen, href: "/blog" },
  { label: "Contact", icon: Mail, href: "/contact" },
  { label: "Portfolio", icon: FileText, href: "/cv" },
];
export const Header = () => {
  const { cart, setCart } = useCartStore();
  const { setOrder } = useOrderStore();
  const { isAuth } = useAppStore();
  const getCart = useCartQuery();
  const updateCart = useUpdateCartMutation();
  const deleteCart = useDeleteCartMutation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isScroll, setIsScroll] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });

  // Reset selected items when cart changes
  useEffect(() => {
    setSelectedItems([]);
    setAllSelected(false);
  }, [cart.length]);

  // Update allSelected state when selectedItems changes
  useEffect(() => {
    setAllSelected(selectedItems.length === cart.length && cart.length > 0);
  }, [selectedItems, cart.length]);

  useEffect(() => {
    if (getCart.data) {
      setCart((getCart.data.payload as any).data.data);
    }
  }, [getCart.data]);

  useEffect(() => {
    setOrder(selectedItems);
  }, [selectedItems]);
  // Handle individual item selection
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
    setAllSelected(!allSelected);
  };

  const router = useRouter();

  const handleAddToCart = (
    cartItemId: number,
    quantity: number,
    skuId: number,
    rentalPeriod: number,
  ) => {
    updateCart
      .mutateAsync({
        id: cartItemId,
        data: { skuId, quantity, rentalPeriod },
      })
      .then(() => {
        // Get current URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        const currentOrder = searchParams.get("order") || "";
        const newOrder = currentOrder
          ? `${currentOrder},${cartItemId}`
          : `${cartItemId}`;

        // Redirect to checkout with updated order parameter
        router.push(`/checkout?order=${newOrder}`);
      });
  };

  const handleUpdateCart = (
    cartItemId: number,
    quantity: number,
    skuId: number,
    rentalPeriod: number,
  ) => {
    updateCart.mutateAsync({
      id: cartItemId,
      data: { skuId, quantity, rentalPeriod },
    });
  };

  const handleDeleteCart = (data: number[]) => {
    deleteCart.mutateAsync(data);
  };
  // Calculate total for selected items
  const selectedTotal = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (total, item) =>
        total + item.sku.price * item.quantity * item.rentalPeriod,
      0,
    );

  // Delete selected items
  const deleteSelected = () => {
    if (selectedItems.length > 0) {
      handleDeleteCart(selectedItems.map((id) => Number(id)));
      setSelectedItems([]);
    }
  };
  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-2 z-50 container mx-auto flex items-center justify-center md:top-5"
    >
      <motion.div
        layout
        animate={{
          backdropFilter: isScroll ? "blur(16px)" : "blur(0px)",
          width:
            isScroll && isMobile
              ? "90%"
              : isScroll && !isMobile
                ? "70%"
                : isMobile
                  ? "100%"
                  : "100%",
          backgroundColor: isScroll ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
          boxShadow: isScroll ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
          y: isScroll ? 8 : 0,
          borderRadius: isScroll ? "24px" : "24px",
        }}
        transition={{
          duration: 1,
          ease: [0.23, 1, 0.32, 1], // Improved easing curve
          width: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          },
          x: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          },
          y: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
        className={`flex items-center justify-between gap-8 px-2 py-1`}
      >
        <div className="hidden items-center justify-center gap-8 lg:flex">
          <Link href={"/vps"} className="flex items-center">
            <span className="text-[16px] font-light text-white">VPS</span>
          </Link>
          <Link href={"/hosting"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Hosting</span>
          </Link>
          <Link href={"/proxy"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Proxy</span>
          </Link>
          <Link href={"/vpn"} className="flex items-center">
            <span className="text-[16px] font-light text-white">VPN</span>
          </Link>
          <Link href={"/domain"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Domain</span>
          </Link>
        </div>
        <Logo theme="dark" isScroll={isScroll} />

        <div className="hidden items-center justify-center gap-8 lg:flex">
          <Link href={"/cv"} className="flex items-center pl-2">
            <span className="text-[16px] font-light text-white">CV</span>
          </Link>
          <Link href={"/components"} className="flex items-center">
            <span className="text-[16px] font-light text-white">
              Components
            </span>
          </Link>
          <Link href={"/blog"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Blog</span>
          </Link>
          <Link href={"/contact"} className="flex items-center">
            <span className="text-[16px] font-light text-white">Contact</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <BsSearch className="text-gray-400" size={20} />
            </SheetTrigger>
            <SheetContent className="bg-black">
              <SheetHeader>
                <SheetTitle>Search</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            {isAuth && (
              <SheetTrigger asChild>
                <div className="relative">
                  <ShoppingCart className="text-gray-400" size={25} />
                  {
                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-[10px] text-white">
                      {cart.length}
                    </span>
                  }
                </div>
              </SheetTrigger>
            )}
            <SheetContent className="w-full border-l bg-black p-0 pt-5 sm:max-w-md">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-border border-b px-6 py-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                      <ShoppingBag className="h-5 w-5" />
                      Your Cart
                    </SheetTitle>
                    {cart.length > 0 && (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="select-all"
                            checked={allSelected}
                            onCheckedChange={toggleSelectAll}
                          />
                          <label
                            htmlFor="select-all"
                            className="cursor-pointer text-sm font-medium"
                          >
                            Select All
                          </label>
                        </div>
                        {selectedItems.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={deleteSelected}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="mr-1 h-4 w-4" />
                            Delete All
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center p-6">
                    <ShoppingBag className="text-muted-foreground mb-4 h-16 w-16" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Add items to your cart to see them here
                    </p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="h-full flex-1 px-6">
                      <div className="space-y-1 py-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className={`group border-border rounded-lg border p-4 transition-colors ${
                              selectedItems.includes(item.id)
                                ? "bg-accent/50"
                                : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() =>
                                  toggleItemSelection(item.id)
                                }
                                className="mt-1"
                              />

                              <div className="flex-1 space-y-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-medium">
                                      {item.sku.value}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                      {item.sku.product.name}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                      {item.rentalPeriod} tháng
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                                    onClick={() => handleDeleteCart([item.id])}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <span className="font-medium">
                                    {formatCurrency(item.sku.price)}
                                  </span>

                                  <div className="border-border flex items-center rounded-lg border">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="border-border h-8 w-8 rounded-none rounded-l-lg border-r"
                                      onClick={() => {
                                        if (item.quantity > 1) {
                                          handleUpdateCart(
                                            item.id,
                                            item.quantity - 1,
                                            item.sku.id,
                                            item.rentalPeriod,
                                          );
                                        } else {
                                          handleDeleteCart([item.id]);
                                        }
                                      }}
                                    >
                                      <Minus className="h-3 w-3" />
                                      <span className="sr-only">Decrease</span>
                                    </Button>

                                    <span className="flex h-8 w-10 items-center justify-center text-sm">
                                      {item.quantity}
                                    </span>

                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="border-border h-8 w-8 rounded-none rounded-r-lg border-l"
                                      onClick={() =>
                                        handleUpdateCart(
                                          item.id,
                                          item.quantity + 1,
                                          item.sku.id,
                                          item.rentalPeriod,
                                        )
                                      }
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span className="sr-only">Increase</span>
                                    </Button>
                                  </div>
                                </div>

                                {item.quantity > 1 && (
                                  <div className="text-muted-foreground text-right text-sm">
                                    {formatCurrency(item.sku.price)} each
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <SheetFooter className="border-border border-t p-6">
                      <div className="w-full space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Subtotal
                            </span>
                            <span>
                              {selectedItems.length > 0
                                ? formatCurrency(
                                    selectedItems.length > 0
                                      ? selectedTotal
                                      : cart.reduce((total, item) => {
                                          console.log(total);
                                        }, 0),
                                  )
                                : "0"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-bold">
                              {selectedItems.length > 0
                                ? formatCurrency(
                                    selectedItems.length > 0
                                      ? selectedTotal
                                      : cart.reduce(
                                          (total, item) =>
                                            total +
                                            item.sku.price *
                                              item.quantity *
                                              item.rentalPeriod,
                                          0,
                                        ),
                                  )
                                : "0"}
                            </span>
                          </div>

                          {selectedItems.length > 0 &&
                            selectedItems.length < cart.length && (
                              <div className="text-muted-foreground text-sm">
                                <span className="flex items-center gap-1">
                                  <Check className="h-4 w-4" />
                                  {selectedItems.length} of {cart.length} items
                                  selected
                                </span>
                              </div>
                            )}
                        </div>
                        {cart.length > 0 && selectedItems.length > 0 ? (
                          <div
                            onClick={() => {
                              if (!isAuth) {
                                router.push("/login");
                                return;
                              }
                              const orderIds = selectedItems
                                .map((item) => Number(item))
                                .join(",");
                              router.push(`/checkout?order=${orderIds}`);
                            }}
                          >
                            <SheetClose className="w-full rounded-lg bg-white py-3 text-[15px] font-medium text-black">
                              {selectedItems.length < cart.length
                                ? `Checkout (${selectedItems.length} items)`
                                : "Checkout"}
                            </SheetClose>
                          </div>
                        ) : (
                          <div>
                            <p className="mb-1 text-red-500">
                              Vui lòng chọn sản phẩm
                            </p>

                            <Button className="w-full" size="lg" disabled>
                              Checkout
                            </Button>
                          </div>
                        )}
                      </div>
                    </SheetFooter>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <DropdownAvatar />
        </div>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <AlignRight />
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ul className="w-full divide-y divide-gray-700 overflow-hidden rounded-xl shadow-xl">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-4 text-white transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{item.label}</p>
                    </div>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${isAuth ? "/logout" : "/login"}`}
                  className="flex items-center gap-3 px-5 py-4 text-white transition-colors"
                >
                  <LogIn className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      {isAuth ? "Log Out" : "Sign In"}
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </motion.div>
    </header>
  );
};
export const Logo: React.FC<LogoProps> = ({ theme, isScroll, isMobile }) => {
  return theme === "dark" ? (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={"/logo/light.png"}
          alt="Logo"
          width={isMobile ? 40 : 50}
          height={isMobile ? 40 : 50}
        />
        {isScroll ? (
          ""
        ) : (
          <span className="text-[20px] font-medium text-white">QuocHau</span>
        )}
      </Link>
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={"/logo/light.png"} alt="Logo" width={30} height={30} />
        {isScroll ? (
          ""
        ) : (
          <span className="text-[20px] font-medium text-white">QuocHau</span>
        )}
      </Link>
    </div>
  );
};
