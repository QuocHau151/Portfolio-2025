import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server, ServerOptions, Socket } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers';
import { TokenService } from 'src/common/services/token.service';
import envConfig from 'src/configs/config';

export class WebsocketAdapter extends IoAdapter {
  private readonly tokenService: TokenService;
  private adapterConstructor: ReturnType<typeof createAdapter>;
  constructor(app: INestApplicationContext) {
    super(app);
    this.tokenService = app.get(TokenService);
  }
  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: envConfig.REDIS_URL });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

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
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);
      await socket.join(generateRoomUserId(userId));
      next();
    } catch (error) {
      next(error);
    }
  }
}
