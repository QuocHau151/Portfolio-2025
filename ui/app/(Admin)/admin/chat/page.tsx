"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateTimeToHourMinuteString } from "@/libs/utils";
import {
  useCreateChatMutation,
  useGetRoomByIdQuery,
  useGetRoomsQuery,
} from "@/queries/useMessenger";
import { useAppStore } from "@/stores/app";
import {
  MessageSquare,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Users,
  Video,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
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
export default function ChatDashboard() {
  const { socket } = useAppStore();
  const [selectedRoom, setSelectedRoom] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useAppStore();
  const accountId = account?.id;
  const createChat = useCreateChatMutation();

  const getRooms = useGetRoomsQuery();
  const rooms = (getRooms.data?.payload as any)?.data;
  const getRoomById = useGetRoomByIdQuery(selectedRoom.id);
  const room = (getRoomById.data?.payload as any)?.data;

  // Ref để tham chiếu đến div chứa tin nhắn
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // Theo dõi trạng thái vừa gửi tin nhắn
  const justSentMessage = useRef(false);

  // Cập nhật messages khi room thay đổi
  useEffect(() => {
    setMessages(room?.messages || []);
    justSentMessage.current = false; // Reset khi đổi phòng
  }, [room]);

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

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  // Cuộn xuống bottom khi cần
  useEffect(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    // Cuộn xuống bottom nếu:
    // 1. Vào phòng chat mới (messages.length === room?.messages?.length)
    // 2. Vừa gửi tin nhắn (justSentMessage.current)
    // 3. Người dùng đang ở gần bottom (isNearBottom)
    if (
      messages.length === room?.messages?.length ||
      justSentMessage.current ||
      isNearBottom
    ) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, room]);

  const sentMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageContent = input.trim();
    if (!messageContent || !selectedRoom.id) return;

    setIsLoading(true);

    try {
      await createChat.mutateAsync({
        roomId: Number(selectedRoom.id),
        userId: Number(accountId),
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
        justSentMessage.current = false; // Reset sau một khoảng thời gian ngắn
      }, 100);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex w-min flex-col border-r border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5" />
              Chat Manager
            </h2>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 p-2">
            {rooms?.map((room: any) => {
              const otherUser = room.users[0]?.user;

              return (
                <div
                  key={room.id}
                  onClick={() =>
                    setSelectedRoom({
                      id: room.id,
                      name: room.name,
                      users: room.users,
                    })
                  }
                  className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-gray-50 hover:text-black ${
                    selectedRoom.id === room.id ? "border border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={otherUser?.avatar || "/placeholder.svg"}
                          alt={otherUser?.name || room.users[0]?.user.name}
                        />
                        <AvatarFallback className="border">
                          {(otherUser?.name || room.users[0]?.user.name).charAt(
                            0,
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-md mr-2 truncate font-medium">
                          {room.users[0]?.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(room.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs text-gray-500">
                          {room.users[0]?.user.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs text-gray-500">
                          {room.users[0]?.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={room?.users?.[0]?.user?.avatar || "/placeholder.svg"}
                    alt={room?.users?.[0]?.user?.name || ""}
                  />
                  <AvatarFallback>
                    {(room?.users?.[0]?.user?.name || "C").charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h3 className="font-semibold">
                  {room?.users?.[0]?.user?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {room?.users?.length || 0} members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div
          ref={messagesContainerRef}
          className="no-smooth-scroll flex-1 overflow-y-auto p-4"
          style={{ maxHeight: "calc(100vh - 4rem - 64px - 64px)" }}
        >
          <div className="space-y-4">
            {messages?.map((message: any) => (
              <div
                key={message.id}
                className={`flex ${message.userId === accountId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                    message.userId === accountId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${message.userId === accountId ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {formatDateTimeToHourMinuteString(message.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs rounded-lg bg-blue-500 px-4 py-2 text-white lg:max-w-md">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={sentMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="mt-0 pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-1 -translate-y-1/2 transform"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
