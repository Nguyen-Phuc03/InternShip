import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async handleFile(file: Express.Multer.File) {
    // Tạo đối tượng FileEntity và lưu trữ thông tin vào cơ sở dữ liệu
    const fileEntity = new FileEntity();
    fileEntity.filename = file.originalname;
    fileEntity.type = file.mimetype; // Nếu bạn lưu trữ đường dẫn file vào hệ thống tệp
    fileEntity.content = file.buffer; // Lưu trữ nội dung file dưới dạng nhị phân

    return await this.fileRepository.save(fileEntity);
  }
}
