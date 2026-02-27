import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client, ClientSchema } from './schemas/client.schema';
import { ClientsRepository } from './repositories/clients.repository';
import { CLIENTS_REPOSITORY } from './repositories/clients.repository.token';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: CLIENTS_REPOSITORY,
      useClass: ClientsRepository,
    },
  ],
})
export class ClientsModule {}
