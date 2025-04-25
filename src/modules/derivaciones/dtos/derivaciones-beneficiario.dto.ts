import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListarDerivacionesDto {
  @ApiProperty({
    description: 'Código de autorización',
    required: false,
    example: '2007561735',
  })
  @IsOptional()
  @IsString()
  codigoAutorizacion?: string;

  @ApiProperty({
    description: 'RUT del beneficiario en formato 12345678-9',
    required: false,
    example: '18632346-7',
  })
  @IsOptional()
  @IsString()
  rutBeneficiario?: string;
}