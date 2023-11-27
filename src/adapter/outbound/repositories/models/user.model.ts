import { Types } from 'mongoose';

export interface UserModel {
  _id?: Types.ObjectId;
  email: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  skillName: string;
}
