import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schemas/client.schema';

export interface IClientsRepository {
  create(data: CreateClientDto): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  update(id: string, data: UpdateClientDto): Promise<Client | null>;
  delete(id: string): Promise<void>;
}
