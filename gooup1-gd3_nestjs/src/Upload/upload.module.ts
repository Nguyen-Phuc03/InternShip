import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/upload.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
