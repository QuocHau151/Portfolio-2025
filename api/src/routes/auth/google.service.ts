import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { GoogleUserInfoError } from 'src/routes/auth/auth.error';
import { GoogleAuthStateType } from 'src/routes/auth/auth.model';
import { AuthRepository } from 'src/routes/auth/auth.repo';
import { AuthService } from 'src/routes/auth/auth.service';

import { CommonRoleRepository } from 'src/common/repositories/common-role.repo';
import { HashingService } from 'src/common/services/hasing.service';
import envConfig from 'src/configs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleService {
  private oauth2Client: OAuth2Client;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashingService: HashingService,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly authService: AuthService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      envConfig.GOOGLE_CLIENT_ID,
      envConfig.GOOGLE_CLIENT_SECRET,
      envConfig.GOOGLE_REDIRECT_URI,
    );
  }
  getAuthorizationUrl({ userAgent, ip }: GoogleAuthStateType) {
    const scope = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
    // Chuyển Object sang string base64 an toàn bỏ lên url
    const stateString = Buffer.from(
      JSON.stringify({
        userAgent,
        ip,
      }),
    ).toString('base64');
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
      include_granted_scopes: true,
      state: stateString,
    });
    return { url };
  }
  async googleCallback({ code, state }: { code: string; state: string }) {
    try {
      let userAgent = 'Unknown';
      let ip = 'Unknown';
      // 1. Lấy state từ url
      try {
        if (state) {
          const clientInfo = JSON.parse(
            Buffer.from(state, 'base64').toString(),
          ) as GoogleAuthStateType;
          userAgent = clientInfo.userAgent;
          ip = clientInfo.ip;
        }
      } catch (error) {
        console.error('Error parsing state', error);
      }
      // 2. Dùng code để lấy token
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // 3. Lấy thông tin google user
      const oauth2 = google.oauth2({
        auth: this.oauth2Client,
        version: 'v2',
      });
      const { data } = await oauth2.userinfo.get();
      if (!data.email) {
        throw GoogleUserInfoError;
      }

      let user = await this.authRepository.findUniqueUserIncludeRole({
        email: data.email,
      });
      // Nếu không có user tức là người mới, vậy nên sẽ tiến hành đăng ký
      if (!user) {
        const clientRoleId = await this.commonRoleRepository.getClientRoleId();
        const randomPassword = uuidv4();
        const hashedPassword = await this.hashingService.hash(randomPassword);
        user = await this.authRepository.createUserInclueRole({
          email: data.email,
          name: data.name ?? '',
          password: hashedPassword,
          roleId: clientRoleId,
          phone: '',
          avatar: data.picture ?? null,
        });
      }
      const device = await this.authRepository.createDevice({
        userId: user.id,
        userAgent,
        ip,
      });
      const authTokens = await this.authService.generateTokens({
        userId: user.id,
        deviceId: device.id,
        roleId: user.roleId,
        roleName: user.role.name,
      });
      return {
        accessToken: authTokens.accessToken,
        refreshToken: authTokens.refreshToken,
        account: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role.name,
          phone: user.phone,
          address: user.address,
        },
      };
    } catch (error) {
      console.error('Error in googleCallback', error);
      throw error;
    }
  }
}
