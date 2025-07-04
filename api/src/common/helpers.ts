import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { randomInt } from 'crypto';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Type Predicate
export function isUniqueConstraintPrismaError(
  error: any,
): error is PrismaClientKnownRequestError {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
  );
}

export function isNotFoundPrismaError(
  error: any,
): error is PrismaClientKnownRequestError {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
  );
}

export const generateOTP = () => {
  return String(randomInt(100000, 1000000));
};

export function isForeignKeyConstraintPrismaError(
  error: any,
): error is PrismaClientKnownRequestError {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2003'
  );
}

export const generateRandomFilename = (filename: string) => {
  const ext = path.extname(filename);
  return `${uuidv4()}${ext}`;
};
export const generateCancelPaymentJobId = (paymentId: number) => {
  return `paymentId-${paymentId}`;
};

export const generateRoomUserId = (userId: number) => {
  return `room-${userId}`;
};
