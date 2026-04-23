import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import {
  GetPaymentTransactionListResSchema,
  WebhookPaymentBodySchema,
} from 'src/routes/payment/payment.model';

export class WebhookPaymentBodyDTO extends createZodDto(
  WebhookPaymentBodySchema,
) {}

export class GetPaymentTransactionListResDTO extends createZodDto(
  z.object({
    data: GetPaymentTransactionListResSchema,
  }),
) {}
