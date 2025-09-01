import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PaymentAPIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const paymentAPIKey = request.headers['authorization'].split(' ')[1];
    if (paymentAPIKey !== process.env.PAYMENT_API_KEY) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
