import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UPLOAD_DIR } from './common/constants/other.constant';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(UPLOAD_DIR, {
    prefix: '/static/images/',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
