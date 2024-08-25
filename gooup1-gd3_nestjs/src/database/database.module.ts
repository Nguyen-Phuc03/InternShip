import { Module, DynamicModule } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
          const dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '27052003',
            database: 'student',
            entities: entities,
            synchronize: true,
            ...options,
          });
          await dataSource.initialize();

          return dataSource;
        },
      },
    ];

    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
