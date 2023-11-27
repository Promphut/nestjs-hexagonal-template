import { Injectable } from '@nestjs/common';

export interface IUser {
  id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  skillName: string;
}

@Injectable()
export class User {
  id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  skillName: string;
  constructor(user: IUser) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.fullname = `${user.firstname} ${user.lastname}`;
    this.skillName = user.skillName;
  }
}
