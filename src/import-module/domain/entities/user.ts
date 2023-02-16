import { Entity } from './entity';
export class User extends Entity<number> {
  login: string;
  avatar: string;
  isAdmin: boolean;
}
