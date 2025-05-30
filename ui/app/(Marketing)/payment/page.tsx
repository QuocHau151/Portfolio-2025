"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/libs/utils";
import {
  useCancelOrderMutation,
  useConfirmOrderMutation,
} from "@/queries/useOrder";
import { useAppStore } from "@/stores/app";
import {
  BanknoteIcon as Bank,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function QrCodePayment() {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  const confirmOrder = useConfirmOrderMutation();
  const cancelOrder = useCancelOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();
  const hasCancelled = useRef(false); // để ngăn gọi lại
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 phút = 900 giây
  const { socket } = useAppStore();
  useEffect(() => {
    if (socket && orderId) {
      const paymentHandler = (data: any) => {
        if (data.status === "success") {
          setIsPaid(true);
          setIsProcessing(false);
          confirmOrder.mutateAsync(Number(orderId));
          toast("Thanh toán thành công");
        }
      };

      socket.on("payment", paymentHandler);

      // Add cleanup to remove the event listener
      return () => {
        socket.off("payment", paymentHandler);
      };
    }
  }, [socket, orderId, paymentId, router]);

  const cancelOrderTimeOut = async () => {
    try {
      await cancelOrder.mutateAsync(Number(orderId));
      toast("Đơn hàng đã được hủy");
    } catch (error) {
      console.log(error);
      toast("Hủy đơn hàng thất bại");
    }
  };

  useEffect(() => {
    const storageKey = `payment-${paymentId}-start`;
    let timer: NodeJS.Timeout;

    const startTime = localStorage.getItem(storageKey);
    if (!startTime) {
      localStorage.setItem(storageKey, Date.now().toString());
    }

    const start = parseInt(startTime || Date.now().toString(), 10);
    const now = Date.now();
    const remainingTime = Math.max(
      0,
      15 * 60 - Math.floor((now - start) / 1000),
    );

    setTimeLeft(remainingTime);

    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!hasCancelled.current) {
            hasCancelled.current = true;
            clearInterval(timer);
            cancelOrderTimeOut();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      hasCancelled.current = false; // reset nếu paymentId thay đổi
    };
  }, [paymentId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const paymentInfo = {
    amount: total,
    orderId: paymentId,
    accountNumber: "0123456789",
    accountName: "NGUYEN VAN A",
    bankName: "Vietcombank",
    content: `DH${paymentId}`,
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container grid gap-6 py-10 md:grid-cols-2">
      {!isPaid ? (
        <Card className="h-min border md:col-span-1">
          <CardHeader>
            <CardTitle>Mã QR Thanh Toán</CardTitle>
            <CardDescription>
              Quét mã QR bằng ứng dụng ngân hàng để thanh toán
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-4 rounded-lg bg-white shadow-sm">
              <div className="relative h-64 w-64 border border-gray-200 bg-white">
                <Image
                  src={`https://qr.sepay.vn/img?acc=96247KR7CN&bank=BIDV&amount=${total}&des=DH${paymentId}&template=qronly&download=DOWNLOAD`}
                  alt="QR Code"
                  fill
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <Badge variant="outline" className="mb-2">
              Hết hạn sau: {formatTime(timeLeft)}
            </Badge>
            <p className="text-center text-sm text-gray-500">
              Vui lòng hoàn tất thanh toán trước thời gian hết hạn
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Tải mã QR</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="h-min border md:col-span-1">
          <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Thanh toán thành công
            </CardTitle>
            <CardDescription>
              Đơn hàng của bạn đã được xử lý thành công
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/order")}>
              Xem đơn hàng
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-6">
        <Card className="border">
          <CardHeader>
            <CardTitle>Thông Tin Thanh Toán</CardTitle>
            <CardDescription>Chi tiết giao dịch của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Số tiền:</span>
              <span className="font-bold">{formatCurrency(Number(total))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Mã đơn hàng:</span>
              <div className="flex items-center">
                <span className="mr-2 text-sm">{paymentInfo.orderId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() =>
                    copyToClipboard(paymentInfo.orderId || "", "orderId")
                  }
                >
                  {copied === "orderId" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Số tài khoản:</span>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">
                    {paymentInfo.accountNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() =>
                      copyToClipboard(
                        paymentInfo.accountNumber,
                        "accountNumber",
                      )
                    }
                  >
                    {copied === "accountNumber" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tên tài khoản:</span>
                <span className="text-sm">{paymentInfo.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Ngân hàng:</span>
                <span className="text-sm">{paymentInfo.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Nội dung CK:</span>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">{paymentInfo.content}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() =>
                      copyToClipboard(paymentInfo.content, "content")
                    }
                  >
                    {copied === "content" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle>Phương Thức Thanh Toán</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="banking">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="banking">Chuyển khoản qua QR</TabsTrigger>
                <TabsTrigger value="card">Thẻ tín dụng</TabsTrigger>
                <TabsTrigger value="ewallet">Ví điện tử</TabsTrigger>
              </TabsList>
              <TabsContent value="banking" className="pt-4">
                <RadioGroup defaultValue="bidv">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bidv" id="bidv" />
                    <Label htmlFor="bidv" className="flex items-center">
                      <Bank className="mr-2 h-4 w-4" />
                      BIDV
                    </Label>
                  </div>
                </RadioGroup>
              </TabsContent>
              <TabsContent value="card" className="pt-4">
                <RadioGroup defaultValue="visa">
                  <div className="mb-3 flex items-center space-x-2">
                    <RadioGroupItem value="visa" id="visa" />
                    <Label htmlFor="visa" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Visa
                    </Label>
                  </div>
                  <div className="mb-3 flex items-center space-x-2">
                    <RadioGroupItem value="mastercard" id="mastercard" />
                    <Label htmlFor="mastercard" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Mastercard
                    </Label>
                  </div>
                </RadioGroup>
              </TabsContent>
              <TabsContent value="ewallet" className="pt-4">
                <RadioGroup defaultValue="momo">
                  <div className="mb-3 flex items-center space-x-2">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      MoMo
                    </Label>
                  </div>
                  <div className="mb-3 flex items-center space-x-2">
                    <RadioGroupItem value="zalopay" id="zalopay" />
                    <Label htmlFor="zalopay" className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      ZaloPay
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <Label htmlFor="vnpay" className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      VNPay
                    </Label>
                  </div>
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Xác Nhận Đã Thanh Toán</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
