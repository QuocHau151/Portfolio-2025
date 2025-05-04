"use client";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/stores/app";
import {
  useLoginMutation,
  useRegisterMutation,
  useSendOTP,
  useVerificationCode,
} from "@/queries/useAuth";
import { RegisterBodyType } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSocketInstace } from "@/libs/utils";
import { TypeOfVerificationCodeType } from "@/constants/type";

export default function VerifyAccountForm() {
  const [activeTab, setActiveTab] = useState("email");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const sendOTP = useSendOTP();
  const seachParam = useSearchParams();
  const query = seachParam.get("type");
  // For email verification
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // For phone verification
  const [phoneCode, setPhoneCode] = useState(["", "", "", "", "", ""]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState("");

  const {
    registerForm,
    setAccount,
    setRole,
    setSocket,
    setRegisterForm,
    forgotPasswordForm,
    setCode,
  } = useAppStore();
  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();
  const verificationCode = useVerificationCode();
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle input change for verification code
  const handleCodeChange = (index: number, value: string, isEmail: boolean) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = isEmail ? [...emailCode] : [...phoneCode];
    newCode[index] = value;

    if (isEmail) {
      setEmailCode(newCode);
      // Move to next input if current input is filled
      if (value && index < 5) {
        emailInputRefs.current[index + 1]?.focus();
      }
    } else {
      setPhoneCode(newCode);
      // Move to next input if current input is filled
      if (value && index < 5) {
        phoneInputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down for verification code
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    isEmail: boolean,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      index > 0 &&
      (isEmail ? !emailCode[index] : !phoneCode[index])
    ) {
      if (isEmail) {
        emailInputRefs.current[index - 1]?.focus();
      } else {
        phoneInputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste for verification code
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    isEmail: boolean,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // If pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");

      if (isEmail) {
        setEmailCode(digits);
        // Focus on the last input
        emailInputRefs.current[5]?.focus();
      } else {
        setPhoneCode(digits);
        // Focus on the last input
        phoneInputRefs.current[5]?.focus();
      }
    }
  };
  useEffect(() => {
    if (query === "REGISTER") {
      setEmail(registerForm?.email as string);
    }
    if (query === "FORGOT_PASSWORD") {
      setEmail(forgotPasswordForm?.email as string);
    }
  }, [query]);
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const form = {
        ...registerForm,
        code: activeTab === "email" ? emailCode.join("") : phoneCode.join(""),
      };
      if (query === "REGISTER") {
        const result = await registerMutation.mutateAsync(
          form as RegisterBodyType,
        );
        setIsVerified(true);
        toast.success("Xác thực tài khoản thành công!");

        if (result.status === 200) {
          const login = await loginMutation.mutateAsync({
            email: form.email as string,
            password: form.password as string,
          });
          toast("Đăng nhập thành công");
          setRole(login.payload.data.account.role);
          setAccount(login.payload.data.account);
          setSocket(generateSocketInstace(login.payload.data.accessToken));
          setRegisterForm();
          router.push("/");
        }
      }
      if (query === "FORGOT_PASSWORD") {
        const result = await verificationCode.mutateAsync({
          email: email,
          code: activeTab === "email" ? emailCode.join("") : phoneCode.join(""),
          type: query as TypeOfVerificationCodeType,
        });
        const payload = result.payload as { data: { message: string } };
        toast(payload.data.message);
        setCode({
          code: activeTab === "email" ? emailCode.join("") : phoneCode.join(""),
        });
        router.push("/reset-password");
      }
    } catch (error: any) {
      toast(error.payload.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    await sendOTP.mutateAsync({
      email: email,
      type: query as string,
    });
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60); // Start 60 second countdown
      console.log("Resending verification code");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-white">
          Xác thực tài khoản
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          {!isVerified
            ? "Nhập mã xác thực đã được gửi đến email hoặc số điện thoại của bạn"
            : "Tài khoản của bạn đã được xác thực thành công"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isVerified ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:bg-zinc-700"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="phone"
                  className="data-[state=active]:bg-zinc-700"
                >
                  Số điện thoại
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <div className="">
                  <Label htmlFor="email-code" className="text-zinc-300">
                    Mã xác thực Email
                  </Label>
                  <div className="mt-2 flex justify-between gap-2">
                    {emailCode.map((digit, index) => (
                      <Input
                        key={`email-${index}`}
                        ref={(el) => {
                          emailInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="h-12 w-12 border-zinc-700 bg-zinc-800 text-center text-lg text-white"
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value, true)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e, true)}
                        onPaste={(e) => handlePaste(e, true)}
                        required={activeTab === "email"}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-code" className="text-zinc-300">
                    Mã xác thực SMS
                  </Label>
                  <div className="mt-2 flex justify-between gap-2">
                    {phoneCode.map((digit, index) => (
                      <Input
                        key={`phone-${index}`}
                        ref={(el) => {
                          phoneInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="h-12 w-12 border-zinc-700 bg-zinc-800 text-center text-lg text-white"
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value, false)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e, false)}
                        onPaste={(e) => handlePaste(e, false)}
                        required={activeTab === "phone"}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-primary hover:text-primary/80"
                onClick={handleResend}
                disabled={isResending || countdown > 0}
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi lại...
                  </>
                ) : countdown > 0 ? (
                  `Gửi lại mã sau ${countdown}s`
                ) : (
                  "Gửi lại mã xác thực"
                )}
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xác thực...
                </>
              ) : (
                "Xác thực"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>

            <Button className="w-full" asChild>
              <Link href="/">
                <p className="text-black">Về trang chủ</p>
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      {!isVerified && (
        <CardFooter className="flex justify-center">
          <Link
            href="/"
            className="text-primary flex items-center text-sm font-medium hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
