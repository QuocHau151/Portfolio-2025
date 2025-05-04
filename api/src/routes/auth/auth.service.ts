import { AuthRepository } from 'src/routes/auth/auth.repo';

import { HashingService } from 'src/common/services/hasing.service';
import { CommonUserRepository } from 'src/common/repositories/common-user.repo';
import { TokenService } from 'src/common/services/token.service';

import {
  generateOTP,
  isNotFoundPrismaError,
  isUniqueConstraintPrismaError,
} from 'src/common/helpers';
import {
  EmailNotFoundException,
  InvalidTOTPAndCodeException,
  InvalidTOTPException,
  RefreshTokenAlreadyUsedException,
  TOTPAlreadyEnabledException,
  TOTPNotEnabledException,
  UnauthorizedAccessException,
} from './auth.error';
import {
  DisableTwoFactorBodyType,
  ForgotPasswordBodyType,
  LoginBodyType,
  RefreshTokenBodyType,
  RegisterBodyType,
  SendOPTBodyType,
} from './auth.model';

import { addMilliseconds } from 'date-fns';
import envConfig from 'src/configs/config';
import ms from 'ms';
import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  TypeOfVerificationCode,
  TypeOfVerificationCodeType,
} from 'src/common/constants/auth.constant';
import { EmailService } from 'src/common/services/email.service';
import { AccessTokenPayloadCreate } from 'src/common/types/jwt.types';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repo';
import { TwoFactorService } from 'src/common/services/2fa.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly commonRolesService: CommonRoleRepository,
    private readonly authRepository: AuthRepository,
    private readonly commonUserRepository: CommonUserRepository,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly twoFactorService: TwoFactorService,
  ) {}
  async validateVerificationCode({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: TypeOfVerificationCodeType;
  }) {
    const verificationCode =
      await this.authRepository.findUniqueVerificationCode({
        email_code_type: {
          email,
          code,
          type,
        },
      });

    if (!verificationCode) {
      throw new UnprocessableEntityException({
        message: 'Mã xác thực không hợp lệ',
      });
    }
    if (verificationCode.expiresAt < new Date()) {
      throw new UnprocessableEntityException({
        message: 'Mã xác thực đã hết hạn',
      });
    }
    return {
      message: 'Xác Thực Thành Công',
    };
  }
  async register(body: RegisterBodyType) {
    try {
      await this.validateVerificationCode({
        email: body.email,
        code: body.code,
        type: TypeOfVerificationCode.REGISTER,
      });
      const clientRoleId = await this.commonRolesService.getClientRoleId();
      const hashedPassword = await this.hashingService.hash(body.password);
      const [user] = await Promise.all([
        this.authRepository.createUser({
          email: body.email,
          name: body.name,
          phone: body.phone,
          password: hashedPassword,
          roleId: clientRoleId,
        }),
        this.authRepository.deleteVerificationCode({
          email_code_type: {
            email: body.email,
            code: body.code,
            type: TypeOfVerificationCode.REGISTER,
          },
        }),
      ]);

      return user;
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new UnprocessableEntityException({
          message: 'Email đã tồn tại',
          path: 'email',
        });
      }
      throw error;
    }
  }
  async sendOTP(body: SendOPTBodyType) {
    const user = await this.commonUserRepository.findUnique({
      email: body.email,
    });
    if (body.type === TypeOfVerificationCode.REGISTER && user) {
      throw new UnprocessableEntityException({
        message: 'Email đã tồn tại',
        path: 'email',
      });
    }
    if (body.type === TypeOfVerificationCode.FORGOT_PASSWORD && !user) {
      throw new UnprocessableEntityException({
        message: 'Không tìm thấy Email',
        path: 'email',
      });
    }
    const code = generateOTP();
    const { error } = await this.emailService.sendEmail({
      email: body.email,
      code,
    });
    if (error) {
      console.log(error);
      throw new UnprocessableEntityException({
        message: 'Gửi mã OTP thất bại',
        path: 'code',
      });
    }
    await this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: addMilliseconds(
        new Date(),
        ms(envConfig.OTP_EXPIRES_IN as ms.StringValue),
      ),
    });
    return { message: 'Gửi mã OTP thành công', code: code };
  }
  async login(body: LoginBodyType & { userAgent: string; ip: string }) {
    // 1. Lấy thông tin user, kiểm tra user có tồn tại hay không, mật khẩu có đúng không
    const user = await this.authRepository.findUniqueUserIncludeRole({
      email: body.email,
    });
    if (!user) {
      throw new UnprocessableEntityException({
        message: 'Tài khoản không tồn tại',
        path: 'email',
      });
    }

    const isPasswordMatch = await this.hashingService.compare(
      body.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException({
        message: 'Mật khẩu không chính xác',
        path: 'password',
      });
    }
    // // 2. Nếu user đã bật mã 2FA thì kiểm tra mã 2FA TOTP Code hoặc OTP Code (email)
    if (user.totpSecret) {
      // Nếu không có mã TOTP Code và Code thì thông báo cho client biết
      if (!body.totpCode && !body.code) {
        throw InvalidTOTPAndCodeException;
      }

      // Kiểm tra TOTP Code có hợp lệ hay không
      if (body.totpCode) {
        const isValid = this.twoFactorService.verifyTOTP({
          email: user.email,
          secret: user.totpSecret,
          token: body.totpCode,
        });
        if (!isValid) {
          throw InvalidTOTPException;
        }
      } else if (body.code) {
        // Kiểm tra mã OTP có hợp lệ không
        // Đầu tiên, xác thực mã OTP
        await this.validateVerificationCode({
          email: user.email,
          code: body.code,
          type: TypeOfVerificationCode.LOGIN,
        });

        // Sau khi xác thực thành công, mới xóa mã OTP
        await this.authRepository.deleteVerificationCode({
          email_code_type: {
            email: body.email,
            code: body.code,
            type: TypeOfVerificationCode.LOGIN,
          },
        });
      }
    }

    // 3. Tạo mới device
    const device = await this.authRepository.createDevice({
      userId: user.id,
      userAgent: body.userAgent,
      ip: body.ip,
    });

    // 4. Tạo mới accessToken và refreshToken
    const tokens = await this.generateTokens({
      userId: user.id,
      deviceId: device.id,
      roleId: user.roleId,
      roleName: user.role.name,
    });
    const useRes = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
    };
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      account: useRes,
    };
  }
  async generateTokens({
    userId,
    deviceId,
    roleId,
    roleName,
  }: AccessTokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({
        userId,
        deviceId,
        roleId,
        roleName,
      }),
      this.tokenService.signRefreshToken({
        userId,
      }),
    ]);
    const decodedRefreshToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
      deviceId,
    });
    return { accessToken, refreshToken };
  }
  async refreshToken({
    refreshToken,
    userAgent,
    ip,
  }: RefreshTokenBodyType & { userAgent: string; ip: string }) {
    try {
      // 1. Kiểm tra refreshToken có hợp lệ không
      const { userId } =
        await this.tokenService.verifyRefreshToken(refreshToken);
      // 2. Kiểm tra refreshToken có tồn tại trong database không
      const refreshTokenInDb =
        await this.authRepository.findUniqueRefreshTokenIncludeUserRole({
          token: refreshToken,
        });
      if (!refreshTokenInDb) {
        // Trường hợp đã refresh token rồi, hãy thông báo cho user biết
        // refresh token của họ đã bị đánh cắp
        throw RefreshTokenAlreadyUsedException;
      }
      console.log(refreshTokenInDb);
      const {
        deviceId,
        user: {
          roleId,
          role: { name: roleName },
        },
      } = refreshTokenInDb;
      // 3. Cập nhật device
      const $updateDevice = this.authRepository.updateDevice(deviceId, {
        ip,
        userAgent,
      });
      // 4. Xóa refreshToken cũ
      const $deleteRefreshToken = this.authRepository.deleteRefreshToken({
        token: refreshToken,
      });
      // 5. Tạo mới accessToken và refreshToken
      const $tokens = this.generateTokens({
        userId,
        roleId,
        roleName,
        deviceId,
      });
      const [, , tokens] = await Promise.all([
        $updateDevice,
        $deleteRefreshToken,
        $tokens,
      ]);
      return tokens;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw UnauthorizedAccessException;
    }
  }
  async logout(refreshToken: string) {
    try {
      // 1. Kiểm tra refreshToken có hợp lệ không
      await this.tokenService.verifyRefreshToken(refreshToken);
      // 2. Xóa refreshToken trong database
      const deletedRefreshToken = await this.authRepository.deleteRefreshToken({
        token: refreshToken,
      });
      // 3. Cập nhật device là đã logout
      await this.authRepository.updateDevice(deletedRefreshToken.deviceId, {
        isActive: false,
      });
      return { message: 'Đăng xuất thành công' };
    } catch (error) {
      // Trường hợp đã refresh token rồi, hãy thông báo cho user biết
      // refresh token của họ đã bị đánh cắp
      if (isNotFoundPrismaError(error)) {
        throw RefreshTokenAlreadyUsedException;
      }
      throw UnauthorizedAccessException;
    }
  }
  async forgotPassword(body: ForgotPasswordBodyType) {
    const { email, code, newPassword } = body;
    // 1. Kiểm tra email đã tồn tại trong database chưa
    const user = await this.commonUserRepository.findUnique({
      email,
    });
    if (!user) {
      throw EmailNotFoundException;
    }
    //2. Kiểm tra mã OTP có hợp lệ không
    await this.validateVerificationCode({
      email,
      code,
      type: TypeOfVerificationCode.FORGOT_PASSWORD,
    });
    //3. Cập nhật lại mật khẩu mới và xóa đi OTP
    const hashedPassword = await this.hashingService.hash(newPassword);
    await Promise.all([
      this.authRepository.update(
        { id: user.id },
        {
          password: hashedPassword,
          updatedById: user.id,
        },
      ),
      this.authRepository.deleteVerificationCode({
        email_code_type: {
          email: body.email,
          code: body.code,
          type: TypeOfVerificationCode.FORGOT_PASSWORD,
        },
      }),
    ]);
    return {
      message: 'Đổi mật khẩu thành công',
    };
  }
  async setupTwoFactorAuth(userId: number) {
    // 1. Lấy thông tin user, kiểm tra xem user có tồn tại hay không, và xem họ đã bật 2FA chưa
    const user = await this.commonUserRepository.findUnique({
      id: userId,
    });
    if (!user) {
      throw EmailNotFoundException;
    }
    if (user.totpSecret) {
      throw TOTPAlreadyEnabledException;
    }
    // 2. Tạo ra secret và uri
    const { secret, uri } = this.twoFactorService.generateTOTPSecret(
      user.email,
    );
    // 3. Cập nhật secret vào user trong database
    await this.commonUserRepository.update(
      { id: userId },
      { totpSecret: secret, updatedById: userId },
    );
    // 4. Trả về secret và uri
    return {
      secret,
      uri,
    };
  }

  async disableTwoFactorAuth(
    data: DisableTwoFactorBodyType & { userId: number },
  ) {
    const { userId, totpCode, code } = data;
    // 1. Lấy thông tin user, kiểm tra xem user có tồn tại hay không, và xem họ đã bật 2FA chưa
    const user = await this.commonUserRepository.findUnique({ id: userId });
    if (!user) {
      throw EmailNotFoundException;
    }
    if (!user.totpSecret) {
      throw TOTPNotEnabledException;
    }

    // 2. Kiểm tra mã TOTP có hợp lệ hay không
    if (totpCode) {
      const isValid = this.twoFactorService.verifyTOTP({
        email: user.email,
        secret: user.totpSecret,
        token: totpCode,
      });
      if (!isValid) {
        throw InvalidTOTPException;
      }
    } else if (code) {
      // 3. Kiểm tra mã OTP email có hợp lệ hay không
      await this.validateVerificationCode({
        email: user.email,
        code,
        type: TypeOfVerificationCode.DISABLE_2FA,
      });
      // Sau khi xác thực thành công, mới xóa mã OTP
      await this.authRepository.deleteVerificationCode({
        email_code_type: {
          email: user.email,
          code,
          type: TypeOfVerificationCode.DISABLE_2FA,
        },
      });
    }

    // 4. Cập nhật secret thành null
    await this.commonUserRepository.update(
      { id: userId },
      { totpSecret: null, updatedById: userId },
    );

    // 5. Trả về thông báo
    return {
      message: 'Tắt 2FA thành công',
    };
  }
  async checkExitEmail(email: string): Promise<object> {
    const exits = await this.authRepository.checkExitEmail(email);
    if (exits) {
      return { message: true };
    }
    return { message: false };
  }
}
