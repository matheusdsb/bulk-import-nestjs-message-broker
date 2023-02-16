import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserMongoModel & Document;

@Schema()
export class UserMongoModel {
  @Prop({ type: Number, default: 0, required: true })
  _id: number;

  @Prop({ type: String })
  login: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Boolean })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoModel);
