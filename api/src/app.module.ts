import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BullModule } from '@nestjs/bullmq';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import CustomZodValidationPipe from './common/pipes/custom-zod-validation.pipe';
import envConfig from './configs/config';
import { AuthModule } from './routes/auth/auth.module';
import { BlogModule } from './routes/blog/blog.module';
import { BrandModule } from './routes/brand/brand.module';
import { CartModule } from './routes/cart/cart.module';
import { CategoryModule } from './routes/category/category.module';
import { ComponentModule } from './routes/component/component.module';
import { RemoveRefreshTokenCronjob } from './routes/cron/remove-refresh-token';
import { MediaModule } from './routes/media/media.module';
import { OrderModule } from './routes/order/order.module';
import { PaymentModule } from './routes/payment/payment.module';
import { PermissionModule } from './routes/permission/permission.module';
import { ProductModule } from './routes/product/product.module';
import { ProfileModule } from './routes/profile/profile.module';
import { ProxmoxModule } from './routes/proxmox/proxmox.module';
import { RoleModule } from './routes/role/role.module';
import { UserModule } from './routes/user/user.module';

import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { WebsocketModule } from './websocket/websocket.module';
import { ChatModule } from './routes/chat/chat.module';
@Module({
  imports: [
    CommonModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    ProfileModule,
    UserModule,
    MediaModule,
    ChatModule,
    CartModule,
    WebsocketModule,
    BlogModule,
    BrandModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    ProxmoxModule,
    PaymentModule,
    ComponentModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 60, // 1 minute
          limit: 10,
        },
        {
          name: 'long',
          ttl: 60, // 1 minute
          limit: 20,
        },
      ],
    }),
    BullModule.forRoot({
      connection: {
        url: envConfig.REDIS_URL,
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [createKeyv(envConfig.REDIS_URL)],
        };
      },
    }),
    ScheduleModule.forRoot(),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    RemoveRefreshTokenCronjob,
  ],
})
export class AppModule {}
