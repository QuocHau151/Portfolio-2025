"use client";

import { Button } from "@/components/ui/button";
import { formatDateTimeToHourMinuteString } from "@/libs/utils";
import {
  useCreateChatMutation,
  useGetRoomByUserIdQuery,
} from "@/queries/useMessenger";
import { useAppStore } from "@/stores/app";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { MessageCircle, Send, Shield, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface Message {
  id: string;
  userId: number;
  roomId: number;
  content: string;
  sender: "user" | "admin";
  createdAt: Date;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
}

export default function ChatWidget() {
  const { socket, account, isAuth } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const accountId = account?.id?.toString();
  const getRoomByUserId = useGetRoomByUserIdQuery(accountId!);
  const room = (getRoomByUserId.data?.payload as any)?.data;
  const createChat = useCreateChatMutation();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const justSentMessage = useRef(false);
  // Cập nhật messages khi room thay đổi
  useEffect(() => {
    if (room?.messages) {
      setMessages((prev) => {
        // Giữ lại các tin nhắn mới từ socket chưa có trong room.messages
        const newMessages = prev.filter(
          (msg: any) =>
            !room.messages.some((roomMsg: any) => roomMsg.id === msg.id),
        );
        return [...room.messages, ...newMessages];
      });
      justSentMessage.current = false; // Reset khi đổi phòng
    }
  }, [room?.messages]);

  // Xử lý tin nhắn từ socket
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [
          ...prev,
          { ...message, createdAt: new Date(message.createdAt || new Date()) },
        ];
      });
    };

    if (room) {
      console.log(`message-${room.name}`);
      socket.on(`message-${room.name}`, handleMessage);
      return () => {
        socket.off(`message-${room.name}`, handleMessage);
      };
    }
  }, [socket, room]);

  // Cuộn xuống bottom khi cần
  useEffect(() => {
    if (!messagesContainerRef.current || !isOpen) return;

    const container = messagesContainerRef.current;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    // Cuộn xuống bottom nếu:
    // 1. Mở chat (isOpen)
    // 2. Vừa gửi tin nhắn (justSentMessage.current)
    // 3. Người dùng ở gần bottom (isNearBottom)
    // 4. Tải messages lần đầu (messages.length === room?.messages?.length)
    if (
      isNearBottom ||
      justSentMessage.current ||
      messages.length === room?.messages?.length
    ) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen, messages, room]);

  const sentMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageContent = input.trim();
    if (!messageContent || !accountId || !room?.id) return;

    setIsLoading(true);

    try {
      await createChat.mutateAsync({
        userId: Number(accountId),
        roomName: room.name,
        content: messageContent,
      });

      setInput("");
      justSentMessage.current = true; // Đánh dấu vừa gửi tin nhắn

      // Cuộn xuống bottom ngay sau khi gửi
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        justSentMessage.current = false; // Reset sau 100ms
      }, 100);
    }
  };

  if (!accountId) return null;
  if (!isAuth)
    return (
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:bg-primary/80 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          {isOpen ? (
            <X className="text-white" />
          ) : (
            <MessageCircle className="text-white" />
          )}
        </Button>
        {isOpen && (
          <div className="fixed right-6 bottom-24 z-50 rounded-lg bg-white p-4 text-center text-sm text-gray-500 shadow-lg">
            Đăng nhập để chat
          </div>
        )}
      </div>
    );
  return (
    <>
      {/* Chat Icon Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:bg-primary/80 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          {isOpen ? (
            <X className="text-white" />
          ) : (
            <MessageCircle className="text-white" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed right-6 bottom-24 z-40 w-80 sm:w-96">
          <Card className="border-0 bg-white shadow-2xl">
            <CardHeader className="bg-primary rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg text-black">
                <Shield className="h-5 w-5" />
                Chat với Quản trị viên
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div
                ref={messagesContainerRef}
                className="no-smooth-scroll messages-container overflow-y-auto p-4"
                style={{ maxHeight: "calc(60vh)" }} // Tăng chiều cao
              >
                <div className="space-y-4">
                  {messages.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.userId === Number(accountId) ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] items-center gap-2 ${msg.userId === Number(accountId) ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={
                              msg.userId === Number(accountId)
                                ? "bg-blue-100"
                                : "bg-gray-100"
                            }
                          >
                            {msg.userId !== Number(accountId) ? (
                              <Shield className="bg-primary h-8 w-8 rounded-full p-2 text-white" />
                            ) : (
                              <Image
                                src={msg?.user?.avatar || "/placeholder.svg"}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="min-w-8 rounded-full"
                              />
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 ${
                            msg.userId === Number(accountId)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <div>
                          <p className={`mt-1 text-xs text-black`}>
                            {formatDateTimeToHourMinuteString(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t p-4">
              <form onSubmit={sentMessage} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="mt-0 flex-1 text-black"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
