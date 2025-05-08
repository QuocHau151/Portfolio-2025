import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class CommonWebsocketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(userId: number) {
    return this.prismaService.websocket.findMany({
      where: {
        userId,
      },
    });
  }
  async create(data: { id: string; userId: number }) {
    // Kiểm tra xem user có tồn tại không
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id: ${data.userId}`);
    }

    // Tạo websocket sau khi đã xác nhận user tồn tại
    return this.prismaService.websocket.create({
      data: {
        id: data.id,
        userId: data.userId,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.websocket.delete({
      where: {
        id,
      },
    });
  }
}
