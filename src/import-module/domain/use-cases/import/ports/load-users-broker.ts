import { ImportFilter } from '../../../models/import-filter';

export interface LoadUsersBroker {
  send(data: ImportFilter): void;
}
