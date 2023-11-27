import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../../../domain/entities/user';
import { Schema as _Schema } from 'mongoose';

@Schema({ timestamps: true })
export class UserSchemaMongo implements User {
  @Prop({ required: true })
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  fullname: string;

  @Prop()
  skillName: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaMongo);
