import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IClientsRepository } from './clients.repository.interface';
import { Client, ClientDocument } from '../schemas/client.schema';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly model: Model<Client>,
  ) {}

  async create(data: CreateClientDto): Promise<ClientDocument> {
    return this.model.create(data);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: ClientDocument[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.find().skip(skip).limit(limit),
      this.model.countDocuments(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<ClientDocument | null> {
    return this.model.findById(id);
  }

  async findByEmail(email: string): Promise<ClientDocument | null> {
    return this.model.findOne({ email });
  }

  async update(
    id: string,
    data: UpdateClientDto,
  ): Promise<ClientDocument | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
