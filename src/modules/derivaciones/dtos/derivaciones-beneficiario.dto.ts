// src/autorizaciones/dto/listar-geo-autorizaciones.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListarDerivacionesDto {
//   @ApiProperty({
//     description: 'Código de autorización',
//     required: false,
//     example: 'AUT123456',
//   })
  @IsOptional()
  @IsString()
  codigoAutorizacion?: string;

//   @ApiProperty({
//     description: 'RUT del beneficiario en formato 12345678-9',
//     required: false,
//     example: '12345678-9',
//   })
  @IsOptional()
  @IsString()
  rutBeneficiario?: string;
}