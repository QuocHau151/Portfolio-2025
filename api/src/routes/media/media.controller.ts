import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { memoryStorage } from 'multer';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(
    // @UploadedFiles(
    //   new ParseFilePipeWithUnlink({
    //     validators: [
    //       new FileTypeValidator({
    //         fileType: /(jpg|jpeg|png|webp)$/,
    //         skipMagicNumbersValidation: true,
    //       }),
    //     ],
    //   }),
    // )
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    const urls = await Promise.all(
      files.map((file) =>
        this.mediaService.uploadFile(
          file,
          process.env.MINIO_BUCKET_NAME as string,
        ),
      ),
    );
    return urls;
  }
  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    await this.mediaService.deleteFile(
      filename,
      process.env.MINIO_BUCKET_NAME as string,
    );
    return { message: 'Xoá File Thành Công' };
  }
}
