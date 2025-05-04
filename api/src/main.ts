import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WebsocketAdapter } from './websocket/websocket.adapter';
import envConfig from './configs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new WebsocketAdapter(app));
  await app.listen(envConfig.PORT);
}
bootstrap();
