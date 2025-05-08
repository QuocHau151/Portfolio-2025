import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import CustomZodValidationPipe from './common/pipes/custom-zod-validation.pipe';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './routes/auth/auth.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { PermissionModule } from './routes/permission/permission.module';
import { RoleModule } from './routes/role/role.module';
import { LanguageModule } from './routes/language/language.module';
import { ProfileModule } from './routes/profile/profile.module';
import { UserModule } from './routes/user/user.module';
import { MediaModule } from './routes/media/media.module';
import { WebsocketModule } from './websocket/websocket.module';
import { BlogModule } from './routes/blog/blog.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    LanguageModule,
    ProfileModule,
    UserModule,
    MediaModule,
    WebsocketModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
