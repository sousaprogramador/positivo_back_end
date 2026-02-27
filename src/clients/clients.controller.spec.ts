import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a client', async () => {
    mockService.create.mockResolvedValue({ id: '1', name: 'Mateus' });

    const result = await controller.create({
      name: 'Mateus',
      email: 'mateus@email.com',
    } as any);

    expect(result).toEqual({ id: '1', name: 'Mateus' });
    expect(mockService.create).toHaveBeenCalled();
  });

  it('should return all clients with pagination', async () => {
    mockService.findAll.mockResolvedValue([{ id: '1' }]);

    const result = await controller.findAll('1', '10');

    expect(result).toEqual([{ id: '1' }]);
    expect(mockService.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should return one client', async () => {
    mockService.findOne.mockResolvedValue({ id: '1' });

    const result = await controller.findOne('1');

    expect(result).toEqual({ id: '1' });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update client', async () => {
    mockService.update.mockResolvedValue({ id: '1', name: 'Updated' });

    const result = await controller.update('1', { name: 'Updated' } as any);

    expect(result).toEqual({ id: '1', name: 'Updated' });
    expect(mockService.update).toHaveBeenCalledWith('1', { name: 'Updated' });
  });

  it('should delete client', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
