import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server, ServerOptions, Socket } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers';
import { PrismaService } from 'src/common/services/prisma.service';
import { TokenService } from 'src/common/services/token.service';
import envConfig from 'src/configs/config';

export class WebsocketAdapter extends IoAdapter {
  private readonly tokenService: TokenService;
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private readonly prismaService: PrismaService;
  app: INestApplicationContext;
  constructor(app: INestApplicationContext) {
    super(app);
    this.tokenService = app.get(TokenService);
    this.prismaService = app.get(PrismaService);
  }
  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: envConfig.REDIS_URL,
      socket: {
        reconnectStrategy: (attempts: number) => {
          return Math.min(1000 * Math.pow(2, attempts), 10000);
        },
        keepAlive: true,
      },
    });
    const subClient = pubClient.duplicate();

    try {
      await Promise.all([pubClient.connect(), subClient.connect()]);
    } catch (error) {
      console.error('Redis connection failed:', error);
      throw new Error('Failed to connect to Redis');
    }

    // Add error handling
    pubClient.on('error', (error) => {
      console.error('Redis pub client error:', error);
    });

    subClient.on('error', (error) => {
      console.error('Redis sub client error:', error);
    });

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }
  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        credentials: true,
      },
    });

    server.use((socket, next) => {
      this.authMiddleware(socket, next)
        .then(() => {})
        .catch(() => {});
    });
    server.of(/.*/).use((socket, next) => {
      this.authMiddleware(socket, next)
        .then(() => {})
        .catch(() => {});
    });

    return server;
  }

  async authMiddleware(socket: Socket, next: (err?: any) => void) {
    const { authorization } = socket.handshake.headers;

    if (!authorization) {
      return next(new Error('Thiếu Authorization header'));
    }
    const accessToken = authorization.split(' ')[1];

    if (!accessToken) {
      return next(new Error('Thiếu access token'));
    }
    try {
      const { userId, roleName } =
        await this.tokenService.verifyAccessToken(accessToken);

      if (roleName === 'ADMIN') {
        const rooms = await this.prismaService.room.findMany({
          include: {
            users: true,
          },
        });

        for (const room of rooms) {
          const existingRoomUser = await this.prismaService.roomUser.findUnique(
            {
              where: {
                userId_roomId: {
                  userId: Number(userId),
                  roomId: Number(room.id),
                },
              },
            },
          );
          if (!existingRoomUser) {
            await this.prismaService.roomUser.create({
              data: {
                userId: Number(userId),
                roomId: Number(room.id),
              },
            });
          }
          await socket.join(
            generateRoomUserId(Number(room.name.split('-')[1])),
          );
        }
      } else {
        const existRoom = await this.prismaService.room.findFirst({
          where: {
            users: {
              some: {
                userId: Number(userId),
              },
            },
          },
        });

        if (!existRoom) {
          await this.prismaService.room.create({
            data: {
              name: generateRoomUserId(userId),
              users: {
                create: {
                  userId: Number(userId),
                  joinedAt: new Date(),
                },
              },
            },
          });
          await socket.join(generateRoomUserId(Number(userId)));
        } else {
          await socket.join(generateRoomUserId(Number(userId)));
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
