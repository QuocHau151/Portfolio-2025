import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { UPLOAD_DIR } from 'src/common/constants/other.constant';
import { generateRandomFilename } from 'src/common/helpers';
import { MediaController } from 'src/routes/media/media.controller';
import { MediaService } from './media.service';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const newFilename = generateRandomFilename(file.originalname);
    cb(null, newFilename);
  },
});

@Module({
  providers: [MediaService],
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [MediaController],
})
export class MediaModule {}
