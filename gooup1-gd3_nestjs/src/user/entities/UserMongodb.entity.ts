import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User_mongodb>;

@Schema()
export class User_mongodb {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const CatSchema = SchemaFactory.createForClass(User_mongodb);
