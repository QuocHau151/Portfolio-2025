import { BadRequestException } from '@nestjs/common';

export const InvalidPasswordException = new BadRequestException(
  'Invalid password',
);
