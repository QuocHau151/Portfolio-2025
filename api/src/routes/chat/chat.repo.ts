import { Injectable } from '@nestjs/common';
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
  async getRoom(roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId || 1,
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
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  }
  async getRoomByUserId(userId: number) {
    return await this.prisma.room.findFirst({
      where: {
        users: {
          some: {
            userId: Number(userId) || 0,
          },
        },
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
      where: { id: body.roomId },
    });

    if (!room) {
      throw new Error(`Room with ID ${body.roomId} not found`);
    }

    // Check if user is a member of the room
    const roomUser = await this.prisma.roomUser.findUnique({
      where: {
        userId_roomId: {
          userId: body.userId,
          roomId: body.roomId,
        },
      },
    });

    if (!roomUser) {
      throw new Error(
        `User ${body.userId} is not a member of room ${body.roomId}`,
      );
    }

    // Create the message
    const message = await this.prisma.message.create({
      data: {
        content: body.content,
        userId: body.userId,
        roomId: body.roomId,
      },
    });
    return message;
  }
}
