import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'List clients with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List of clients' })
  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.service.findAll(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Client found' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Update client completely' })
  @ApiResponse({ status: 200, description: 'Client updated' })
  @Put(':id')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Update client partially' })
  @ApiResponse({ status: 200, description: 'Client updated partially' })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({ status: 204, description: 'Client deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
