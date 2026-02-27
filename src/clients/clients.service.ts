import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
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
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ClientsService.name);
  }

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
    this.logger.info({ email: dto.email }, 'Creating client');

    const existing = await this.repository.findByEmail(dto.email);

    if (existing) {
      this.logger.warn({ email: dto.email }, 'Email already exists');
      throw new ConflictException('Email already exists');
    }

    const client = await this.repository.create(dto);

    this.logger.info({ clientId: client.id }, 'Client created successfully');

    return this.map(client);
  }

  async findAll(page: number, limit: number) {
    this.logger.info({ page, limit }, 'Fetching clients with pagination');

    const { data, total } = await this.repository.findAll(page, limit);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data.map((client) => this.map(client)),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    this.logger.info({ clientId: id }, 'Fetching client');

    const client = await this.repository.findById(id);

    if (!client) {
      this.logger.warn({ clientId: id }, 'Client not found');
      throw new NotFoundException('Client not found');
    }

    return this.map(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<ClientResponseDto> {
    this.logger.info({ clientId: id }, 'Updating client');

    await this.findOne(id);

    if (dto.email) {
      const existing = await this.repository.findByEmail(dto.email);

      if (existing && existing._id.toString() !== id) {
        this.logger.warn(
          { clientId: id, email: dto.email },
          'Email conflict during update',
        );
        throw new ConflictException('Email already exists');
      }
    }

    const updated = await this.repository.update(id, dto);

    if (!updated) {
      this.logger.warn({ clientId: id }, 'Client not found on update');
      throw new NotFoundException('Client not found');
    }

    this.logger.info({ clientId: id }, 'Client updated successfully');

    return this.map(updated);
  }

  async remove(id: string): Promise<void> {
    this.logger.info({ clientId: id }, 'Deleting client');

    await this.findOne(id);
    await this.repository.delete(id);

    this.logger.info({ clientId: id }, 'Client deleted successfully');
  }
}
