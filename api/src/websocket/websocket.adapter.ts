import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server, Socket } from 'socket.io';
import { CommonWebsocketRepository } from 'src/common/repositories/common-websocket';
import { TokenService } from 'src/common/services/token.service';

export class WebsocketAdapter extends IoAdapter {
  private readonly commonWebsocketRepository: CommonWebsocketRepository;
  private readonly tokenService: TokenService;
  constructor(app: INestApplicationContext) {
    super(app);
    this.commonWebsocketRepository = app.get(CommonWebsocketRepository);
    this.tokenService = app.get(TokenService);
  }
  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, {
      ...options,
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
    const authorization = socket.handshake.auth.Authorization;

    if (!authorization) {
      return next(new Error('Thiếu Authorization header'));
    }
    const accessToken = authorization.split(' ')[1];

    if (!accessToken) {
      return next(new Error('Thiếu access token'));
    }
    try {
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);

      await this.commonWebsocketRepository.create({
        id: socket.id,
        userId,
      });
      socket.on('disconnect', async () => {
        await this.commonWebsocketRepository.delete(socket.id).catch(() => {});
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}
