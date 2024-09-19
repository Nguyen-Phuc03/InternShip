import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { CreateUserMongodb1726633993738 } from 'src/migration/1726633993738-Create_User_mongodb';
import { User_mongodb } from 'src/user/entities/UserMongodb.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  database: 'User_mongodb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [User_mongodb],
  migrations: [CreateUserMongodb1726633993738],
  synchronize: false,
});
