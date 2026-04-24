import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './routes/websocket/websocket.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  if (process.env.NODE_ENV === 'production') {
    app.useLogger(app.get(Logger));
  }
  app.enableCors();
  app.use(helmet());

  const websocketAdapter = new WebsocketAdapter(app);
  await websocketAdapter.connectToRedis();
  app.useWebSocketAdapter(websocketAdapter);

  const config = new DocumentBuilder()
    .setTitle(' Quốc Hậu Portfoilo')
    .setDescription('The portfolio API description')
    .setVersion('1.0')
    .addTag('portfolio')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  await app.listen(process.env.PORT as string);
}
bootstrap();
