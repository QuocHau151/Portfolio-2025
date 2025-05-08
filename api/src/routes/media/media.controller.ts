import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import envConfig from 'src/configs/config';
import { MediaService } from './media.service';
import { memoryStorage } from 'multer';

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
        this.mediaService.uploadFile(file, envConfig.MINIO_BUCKET_NAME),
      ),
    );
    return urls;
  }
  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    await this.mediaService.deleteFile(filename, envConfig.MINIO_BUCKET_NAME);
    return { message: 'Xoá File Thành Công' };
  }
}
