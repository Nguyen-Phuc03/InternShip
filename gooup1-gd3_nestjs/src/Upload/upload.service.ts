import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/upload.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
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
  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file to save');
    }

    // Đường dẫn lưu file
    const uploadPath = path.join(__dirname, '../Upload/savefile');
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadPath, filename);

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Lưu file vào hệ thống tệp
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}
