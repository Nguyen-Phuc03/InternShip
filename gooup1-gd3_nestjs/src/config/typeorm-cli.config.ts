import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { User } from 'src/user/entities/user.entity';
import { CreateUser1726630234008 } from 'src/migration/1726630234008-Create_User';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'students',
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [User],
  migrations: [CreateUser1726630234008],
});
