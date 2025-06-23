"use client";

import { Building, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

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
import { formatCurrency } from "@/libs/utils";
import { useGetCartItemByIdQuery } from "@/queries/useCart";
import { useCreateOrderMutation } from "@/queries/useOrder";
import { useAppStore } from "@/stores/app";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "transfer">(
    "online",
  );
  const router = useRouter();
  const param = useSearchParams();
  const order = param.get("order");
  const { account } = useAppStore();

  const createOrder = useCreateOrderMutation();
  const orderItemQueries = order
    ?.split(",")
    .map((id) => useGetCartItemByIdQuery(Number(id)));

  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    if (account) {
      setReceiverInfo({
        name: account.name,
        phone: account.phone,
        email: account.email,
      });
    }
  }, [account]);

  const orderItems = orderItemQueries?.map(
    (query) => (query.data?.payload as any)?.data,
  );

  const subtotal = orderItems?.reduce(
    (sum, item) => sum + item?.sku.price * item?.rentalPeriod * item?.quantity,
    0,
  );
  useEffect(() => {
    if (orderItems?.[0] === null) {
      toast("Giỏ hàng trống");
      router.replace("/");
    }
  }, [orderItems]);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal;
  const handleCreateOrder = async () => {
    try {
      if (!receiverInfo.name || !receiverInfo.phone || !receiverInfo.email) {
        toast.error("Vui lòng nhập thông tin người đặt hàng");
        return;
      }
      const result = await createOrder.mutateAsync({
        receiver: receiverInfo,
        cartItemIds: order?.split(",").map((id) => Number(id)) || [],
      });

      const paymentId = (result.payload as any)?.data.paymentId;
      const orderId = (result.payload as any)?.data.orders.id;
      router.push(
        `/payment?total=${total}&paymentId=${paymentId}&orderId=${orderId}`,
      );
      toast.success("Đặt hàng thành công");
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Đặt hàng thất bại");
    }
  };
  return (
    <div className="container max-w-6xl py-10">
      <h1 className="mb-8 text-3xl font-bold">Thanh toán</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card className="border">
            <CardHeader>
              <CardTitle>Thông tin người nhận</CardTitle>
              <CardDescription>
                Thông tin liên hệ của người nhận dịch vụ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <input
                  type="text"
                  value={receiverInfo?.email}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      email: e.target.value,
                    })
                  }
                  className="bg-muted/50 h-10 rounded-md border p-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Họ tên</Label>
                <input
                  type="text"
                  value={receiverInfo.name}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      name: e.target.value,
                    })
                  }
                  className="bg-muted/50 h-10 rounded-md border p-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <input
                  type="text"
                  value={receiverInfo.phone}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      phone: e.target.value,
                    })
                  }
                  className="bg-muted/50 h-10 rounded-md border p-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>
                Chọn phương thức thanh toán phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as "online" | "transfer")
                }
                className="space-y-4"
              >
                <div className="hover:bg-muted/50 flex cursor-pointer items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="online" id="online" />
                  <Label
                    htmlFor="online"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Thanh toán online</p>
                      <p className="text-muted-foreground text-sm">
                        Thanh toán qua thẻ tín dụng, ví điện tử
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="hover:bg-muted/50 flex cursor-pointer items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label
                    htmlFor="transfer"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Building className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Chuyển khoản ngân hàng</p>
                      <p className="text-muted-foreground text-sm">
                        Chuyển khoản qua tài khoản ngân hàng
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {paymentMethod === "transfer" && (
            <Card className="border">
              <CardHeader>
                <CardTitle>Thông tin chuyển khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 space-y-2 rounded-lg p-4">
                  <p>
                    <span className="font-medium">Ngân hàng:</span> Vietcombank
                  </p>
                  <p>
                    <span className="font-medium">Số tài khoản:</span>{" "}
                    1234567890
                  </p>
                  <p>
                    <span className="font-medium">Chủ tài khoản:</span> CÔNG TY
                    TNHH VPS VIỆT NAM
                  </p>
                  <p>
                    <span className="font-medium">Nội dung chuyển khoản:</span>{" "}
                    [Họ tên] thanh toán VPS
                  </p>
                </div>
                <div className="text-muted-foreground text-sm">
                  <p>
                    Lưu ý: Đơn hàng sẽ được xử lý sau khi chúng tôi nhận được
                    thanh toán của bạn.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-6 border">
            <CardHeader>
              <CardTitle>Đơn hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItemQueries?.some((query) => query.isLoading) ? (
                <div>Loading...</div>
              ) : (
                orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between pb-2">
                    <div>
                      <p className="font-medium">{item?.sku.product.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {item?.sku.value}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item?.rentalPeriod} tháng
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item?.quantity} sản phẩm
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(item?.sku.price)}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
            <CardContent className="space-y-4">
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Tạm tính</p>
                  <p>{subtotal.toLocaleString()}đ</p>
                </div>
                <div className="flex justify-between">
                  <p>Thuế (8%)</p>
                  <p>{tax.toLocaleString()}đ</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <p>Tổng cộng</p>
                  <p>{total.toLocaleString()}đ</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {paymentMethod === "online" ? (
                <Button className="w-full" onClick={handleCreateOrder}>
                  Thanh toán
                </Button>
              ) : (
                <Button className="w-full">Hoàn tất đặt hàng</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
