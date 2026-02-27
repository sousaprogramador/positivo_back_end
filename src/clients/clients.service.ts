import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CLIENTS_REPOSITORY } from './repositories/clients.repository.token';
import * as clientsRepositoryInterface from './repositories/clients.repository.interface';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private readonly repository: clientsRepositoryInterface.IClientsRepository,
  ) {}

  private map(client: ClientDocument): ClientResponseDto {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      document: client.document,
      created_at: client.created_at,
      updated_at: client.updated_at,
    };
  }

  async create(dto: CreateClientDto): Promise<ClientResponseDto> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already exists');

    const client = await this.repository.create(dto);
    return this.map(client);
  }

  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.repository.findAll();
    return clients.map((client) => this.map(client));
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    const client = await this.repository.findById(id);
    if (!client) throw new NotFoundException('Client not found');

    return this.map(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<ClientResponseDto> {
    await this.findOne(id);

    if (dto.email) {
      const existing = await this.repository.findByEmail(dto.email);
      if (existing && existing._id.toString() !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    const updated = await this.repository.update(id, dto);

    if (!updated) {
      throw new NotFoundException('Client not found');
    }

    return this.map(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
