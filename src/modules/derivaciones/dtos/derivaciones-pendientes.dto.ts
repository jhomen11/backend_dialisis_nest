import { IsNotEmpty, IsString } from 'class-validator';

export class DerivacionesPendientesDto {
  @IsNotEmpty()
  @IsString()
  codigoPrestadorPrivado: string;
}
export class DetalleDerivacionesPendientesDto {
  @IsNotEmpty()
  @IsString()
  codigoDerivacion: string;
}

export class ListarDerivacionesDzDto {
  @IsNotEmpty()
  @IsString()
  codigoDZ: string;
}