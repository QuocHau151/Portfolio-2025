import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as Minio from 'minio';
import { PinoLogger } from 'nestjs-pino';
import * as path from 'path';
import { PrismaService } from 'src/common/services/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private minioClient: Minio.Client;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MediaService.name);
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT as string,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY as string,
      secretKey: process.env.MINIO_SECRET_KEY as string,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<object> {
    try {
      const ext = path.extname(file.originalname);
      const objectName = `${uuidv4()}${ext}`;
      const bucketExists = await this.minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        try {
          await this.minioClient.makeBucket(bucketName);
          // Set bucket policy to public read if needed
          await this.minioClient.setBucketPolicy(
            bucketName,
            JSON.stringify({
              Version: '2012-10-17',
              Statement: [
                {
                  Effect: 'Allow',
                  Principal: { AWS: ['*'] },
                  Action: ['s3:GetObject'],
                  Resource: [`arn:aws:s3:::${bucketName}/*`],
                },
              ],
            }),
          );
          this.logger.info({ bucketName }, 'Bucket created');
        } catch (error) {
          this.logger.error({ err: error, bucketName }, 'Create bucket failed');
          throw new UnauthorizedException('Invalid MinIO credentials');
        }
      }

      await this.minioClient.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
          'Original-Name': file.originalname,
        },
      );
      const fileUrl = `https://${process.env.MINIO_ENDPOINT}/${bucketName}/${objectName}`;
      return {
        url: fileUrl,
      };
    } catch (error) {
      // Lỗi tạo bucket đã được ghi ở trên
      if (!(error instanceof HttpException)) {
        this.logger.error({ err: error, bucketName }, 'Upload file failed');
      }
      throw new UnauthorizedException('Đã Xảy Ra Lỗi');
    }
  }

  async deleteFile(filename: string, bucketName: string): Promise<void> {
    try {
      // Check if bucket exists
      const bucketExists = await this.minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        throw new NotFoundException(`Bucket ${bucketName} not found`);
      }

      // Check if object exists before deleting
      try {
        await this.minioClient.statObject(bucketName, filename);
      } catch (error) {
        throw new NotFoundException(
          `File ${filename} not found in bucket ${bucketName} - ${error.message}`,
        );
      }

      // Delete the object
      await this.minioClient.removeObject(bucketName, filename);
      this.logger.info({ bucketName, filename }, 'File deleted');
    } catch (error) {
      // 404 (bucket / file không tồn tại) là lỗi của người gọi, access log đã ghi WARN
      if (!(error instanceof HttpException)) {
        this.logger.error(
          { err: error, bucketName, filename },
          'Delete file failed',
        );
      }
      throw error;
    }
  }
}
