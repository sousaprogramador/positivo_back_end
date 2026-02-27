import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    const existing = await this.repository.findByEmail(createClientDto.email);

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    return this.repository.create(createClientDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const client = await this.repository.findById(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.findOne(id);

    if (updateClientDto.email) {
      const existing = await this.repository.findByEmail(updateClientDto.email);

      if (existing && existing._id.toString() !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    return this.repository.update(id, updateClientDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
