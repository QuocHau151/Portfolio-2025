import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { PrismaService } from '../services/prisma.service';
import { AccessTokenPayload } from '../types/jwt.types';
import {
  REQUEST_ROLE_PERMISSIONS,
  REQUEST_USER_KEY,
} from '../constants/auth.constant';
import { HTTPMethod } from '../constants/role.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Extract và validate token
    const decodedAccessToken = await this.extractAndValidateToken(request);

    // Check user permission
    await this.validateUserPermission(decodedAccessToken, request);
    return true;
  }

  private async extractAndValidateToken(
    request: any,
  ): Promise<AccessTokenPayload> {
    const accessToken = this.extractAccessTokenFromHeader(request);
    try {
      const decodedAccessToken =
        await this.tokenService.verifyAccessToken(accessToken);
      request[REQUEST_USER_KEY] = decodedAccessToken;
      return decodedAccessToken;
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken');
    }
  }

  private extractAccessTokenFromHeader(request: any): string {
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Error.MissingAccessToken');
    }
    return accessToken;
  }

  private async validateUserPermission(
    decodedAccessToken: AccessTokenPayload,
    request: any,
  ): Promise<void> {
    const roleId: number = decodedAccessToken.roleId;
    const path: string = request.route.path;
    const method = request.method as keyof typeof HTTPMethod;
    const role = await this.prismaService.role
      .findUniqueOrThrow({
        where: {
          id: roleId,
          deletedAt: null,
          isActive: true,
        },
        include: {
          permissions: {
            where: {
              deletedAt: null,
              path,
              method,
            },
          },
        },
      })
      .catch(() => {
        throw new ForbiddenException('Bạn không có quyền truy cập');
      });
    const canAccess = role.permissions.length > 0;
    if (!canAccess) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }
    request[REQUEST_ROLE_PERMISSIONS] = role;
  }
}
