import { UserModel } from '../../../models/user-model';

export interface SaveUserBroker {
  send(data: UserModel): Promise<void>;
}
