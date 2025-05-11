import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import CustomZodValidationPipe from './common/pipes/custom-zod-validation.pipe';
import { AuthModule } from './routes/auth/auth.module';
import { BlogModule } from './routes/blog/blog.module';
import { ComponentModule } from './routes/component/component.module';
import { LanguageModule } from './routes/language/language.module';
import { MediaModule } from './routes/media/media.module';
import { PermissionModule } from './routes/permission/permission.module';
import { ProfileModule } from './routes/profile/profile.module';
import { RoleModule } from './routes/role/role.module';
import { UserModule } from './routes/user/user.module';
import { WebsocketModule } from './websocket/websocket.module';

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
    ComponentModule,
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
