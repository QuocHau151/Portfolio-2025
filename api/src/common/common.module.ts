import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from './services/hasing.service';
import { TokenService } from './services/token.service';
import { CommonUserRepository } from './repositories/common-user.repo';
import { AccessTokenGuard } from './guards/access-token.guard';
import { APIKeyGuard } from './guards/api-key.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication.guard';
import { EmailService } from './services/email.service';
import { CommonRoleRepository } from './repositories/common-role.repo';
import { TwoFactorService } from './services/2fa.service';
import { CommonWebsocketRepository } from './repositories/common-websocket';

const commonServices = [
  PrismaService,
  HashingService,
  TokenService,
  CommonUserRepository,
  CommonRoleRepository,
  EmailService,
  TwoFactorService,
  CommonWebsocketRepository,
];

@Global()
@Module({
  providers: [
    ...commonServices,
    AccessTokenGuard,
    APIKeyGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: commonServices,
  imports: [JwtModule],
})
export class CommonModule {}
