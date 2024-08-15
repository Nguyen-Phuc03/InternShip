import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(options: { type: string; url: string }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: createDatabaseConnection(options),
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}

function createDatabaseConnection(options: { type: string; url: string }) {
  console.log(`Connecting to ${options.type} database at ${options.url}`);
  return {};
}
