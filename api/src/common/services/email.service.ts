import { Injectable } from '@nestjs/common';
import React from 'react';
import { Resend } from 'resend';
import envConfig from 'src/configs/config';
import OTPEmail from 'src/email/otp';
@Injectable()
export class EmailService {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY);
  }
  sendEmail(payload: { email: string; code: string }) {
    const subject = 'Mã OTP';
    return this.resend.emails.send({
      from: 'XÁC THỰC OTP <admin@quochau.com>',
      to: [payload.email],
      subject,
      react: React.createElement(OTPEmail, {
        otpCode: payload.code,
        title: subject,
      }),
    });
  }
}
