import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { Service } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientsController],
  providers: [Service],
})
export class ClientsModule {}
