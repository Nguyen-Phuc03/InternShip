import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class CreateUserMongodb1726633993738 implements MigrationInterface {
  async up(queryRunner: MongoQueryRunner): Promise<void> {
    console.log('Creating students collection by inserting a document');

    const collection = queryRunner.databaseConnection
      .db()
      .collection('Students');

    await collection.insertOne({
      name: 'Phuc',
      mail: 'phuc305072@gmail.com',
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  async down(queryRunner: MongoQueryRunner): Promise<void> {
    console.log('Dropping students collection if it exists');

    const collection = queryRunner.databaseConnection
      .db()
      .collection('Students');
    const exists = (await collection.countDocuments()) > 0;

    if (exists) {
      await collection.drop();
      console.log('Collection "students" dropped successfully');
    } else {
      console.log('Collection "students" does not exist');
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
