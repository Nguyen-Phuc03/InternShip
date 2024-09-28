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
    const fileEntity = new FileEntity();
    fileEntity.filename = file.originalname;
    fileEntity.type = file.mimetype;
    fileEntity.content = file.buffer;

    return await this.fileRepository.save(fileEntity);
  }
  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file to save');
    }
    const uploadPath = path.join(__dirname, '../Upload/savefile');
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadPath, filename);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}
