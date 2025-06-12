import { Injectable } from '@nestjs/common';
import { generateRoomUserId } from 'src/common/helpers';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateMessageBodyType } from './chat.model';

@Injectable()
export class ChatRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getRooms() {
    return await this.prisma.room.findMany({
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                phone: true,
                email: true,
              },
            },
          },
        },
        messages: true,
      },
    });
  }

  async getRoomByUserId(userId: number) {
    return await this.prisma.room.findUnique({
      where: {
        name: generateRoomUserId(userId),
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        messages: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
  async createMessage(body: CreateMessageBodyType) {
    // First, check if the room exists
    const room = await this.prisma.room.findUnique({
      where: { name: body.roomName },
    });

    if (!room) {
      throw new Error(`Room with ID ${body.roomName} not found`);
    }

    // Check if user is a member of the room
    const roomUser = await this.prisma.roomUser.findUnique({
      where: {
        userId_roomId: {
          userId: body.userId,
          roomId: Number(room.id),
        },
      },
    });

    if (!roomUser) {
      throw new Error(
        `User ${body.userId} is not a member of room-${body.userId}`,
      );
    }

    // Create the message
    const message = await this.prisma.message.create({
      data: {
        content: body.content,
        userId: Number(body.userId),
        roomId: Number(room.id),
      },
    });
    return message;
  }
}
