import { Module } from '@nestjs/common';
import { ClientsController } from './controllers/clients/clients.controller';
import { Service } from './.service';

@Module({
  controllers: [ClientsController],
  providers: [Service]
})
export class ClientsModule {}
