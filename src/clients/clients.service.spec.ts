import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { IClientsRepository } from './repositories/clients.repository.interface';
import { ClientDocument } from './schemas/client.schema';
import { CLIENTS_REPOSITORY } from './repositories/clients.repository.token';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: jest.Mocked<IClientsRepository>;

  const mockClient = (): ClientDocument =>
    ({
      _id: { toString: () => '1' },
      id: '1',
      name: 'John',
      email: 'john@mail.com',
      document: '123',
      created_at: new Date(),
      updated_at: new Date(),
    }) as unknown as ClientDocument;

  const mockRepository: jest.Mocked<IClientsRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: CLIENTS_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get(CLIENTS_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a client when email does not exist', async () => {
    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockResolvedValue(mockClient());

    const result = await service.create({
      name: 'John',
      email: 'john@mail.com',
      document: '123',
    });

    expect(repository.findByEmail).toHaveBeenCalledWith('john@mail.com');
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(result.email).toBe('john@mail.com');
  });

  it('should throw ConflictException if email already exists', async () => {
    repository.findByEmail.mockResolvedValue(mockClient());

    await expect(
      service.create({
        name: 'John',
        email: 'john@mail.com',
        document: '123',
      }),
    ).rejects.toThrow(ConflictException);

    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should return paginated clients', async () => {
    repository.findAll.mockResolvedValue({
      data: [mockClient()],
      total: 1,
    });

    const result = await service.findAll(1, 10);

    expect(repository.findAll).toHaveBeenCalledWith(1, 10);

    expect(result.data.length).toBe(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.total).toBe(1);
    expect(result.meta.totalPages).toBe(1);
  });

  it('should return a client when found', async () => {
    repository.findById.mockResolvedValue(mockClient());

    const result = await service.findOne('1');

    expect(repository.findById).toHaveBeenCalledWith('1');
    expect(result.id).toBe('1');
  });

  it('should throw NotFoundException if client not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a client successfully', async () => {
    repository.findById.mockResolvedValue(mockClient());
    repository.findByEmail.mockResolvedValue(null);
    repository.update.mockResolvedValue(mockClient());

    const result = await service.update('1', {
      name: 'Updated',
    });

    expect(repository.update).toHaveBeenCalledWith('1', {
      name: 'Updated',
    });

    expect(result.id).toBe('1');
  });

  it('should throw ConflictException if updating with existing email', async () => {
    const existingClient = mockClient();

    repository.findById.mockResolvedValue(existingClient);
    repository.findByEmail.mockResolvedValue({
      ...existingClient,
      _id: { toString: () => '2' },
    } as unknown as ClientDocument);

    await expect(
      service.update('1', { email: 'john@mail.com' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should delete a client successfully', async () => {
    repository.findById.mockResolvedValue(mockClient());
    repository.delete.mockResolvedValue();

    await service.remove('1');

    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when deleting non-existing client', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});
