import { IsNotEmpty, IsString } from 'class-validator';

export class DerivacionesPendientesDto {
  @IsNotEmpty()
  @IsString()
  codigoPrestadorPrivado: string;
}