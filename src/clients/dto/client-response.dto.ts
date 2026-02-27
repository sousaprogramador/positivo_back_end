import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({ example: '65f3c0e2abc123' })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ example: '12345678900' })
  document: string;

  @ApiProperty({ example: '2024-01-01T10:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T12:00:00.000Z' })
  updated_at: Date;
}
