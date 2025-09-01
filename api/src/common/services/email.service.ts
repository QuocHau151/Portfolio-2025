import { Injectable, Logger } from '@nestjs/common';
import React from 'react';
import { Resend } from 'resend';
import OTPEmail from 'src/email/otp';
@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      this.logger.error(
        'RESEND_API_KEY không được tìm thấy trong biến môi trường',
      );
      // Sử dụng một giá trị mặc định hoặc throw error tùy vào yêu cầu
      // Ví dụ: throw new Error('RESEND_API_KEY is required');
    }

    this.resend = new Resend(apiKey);
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
