import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/upload.entity';

@Module({
  imports: [
    MulterModule.register({
      // storage: diskStorage({
      //   destination: path.join(__dirname, '../Upload/savefile'), // Đường dẫn lưu trữ file
      //   filename: (req, file, cb) => {
      //     const filename = `${Date.now()}-${file.originalname}`;
      //     cb(null, filename);
      //   },
      // }),
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
