import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { PaymentAPIKeyGuard } from './guards/payment-api-key.guard';
import { CommonRoleRepository } from './repositories/common-role.repo';
import { CommonUserRepository } from './repositories/common-user.repo';

import { TwoFactorService } from './services/2fa.service';
import { EmailService } from './services/email.service';
import { HashingService } from './services/hasing.service';
import { PrismaService } from './services/prisma.service';
import { TokenService } from './services/token.service';

const commonServices = [
  PrismaService,
  HashingService,
  TokenService,
  CommonUserRepository,
  CommonRoleRepository,
  EmailService,
  TwoFactorService,
];

@Global()
@Module({
  providers: [
    ...commonServices,
    AccessTokenGuard,
    PaymentAPIKeyGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: commonServices,
  imports: [JwtModule],
})
export class CommonModule {}
