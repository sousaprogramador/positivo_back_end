import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientDocument } from '../schemas/client.schema';

export interface IClientsRepository {
  create(data: CreateClientDto): Promise<ClientDocument>;
  findAll(
    page: number,
    limit: number,
  ): Promise<{ data: ClientDocument[]; total: number }>;
  findById(id: string): Promise<ClientDocument | null>;
  findByEmail(email: string): Promise<ClientDocument | null>;
  update(id: string, data: UpdateClientDto): Promise<ClientDocument | null>;
  delete(id: string): Promise<void>;
}
