import { Provider } from '@nestjs/common';
import { CLIENTS_REPOSITORY } from './clients.repository.token';
import { ClientsRepository } from './clients.repository';

export const ClientsRepositoryProvider: Provider = {
  provide: CLIENTS_REPOSITORY,
  useClass: ClientsRepository,
};
