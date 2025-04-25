import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DerivacionesService } from './derivaciones.service';
import {
  BSConsultarDetalleDerivacionResponse,
  BSListarDerivacionesManualesOutput,
  DerivacionBeneficiarioResponse,
  ResultadoFinal,
} from './interfaces/derivaciones.interface';
import {
  DerivacionesPendientesDto,
  DetalleDerivacionesPendientesDto,
  ListarDerivacionesDzDto,
} from './dtos/derivaciones-pendientes.dto';
import { ListarDerivacionesDto } from './dtos/derivaciones-beneficiario.dto';

@ApiTags('Derivaciones')
@Controller()
export class DerivacionesController {
  constructor(private readonly derivacionesService: DerivacionesService) {}

  @Get('Rs_ListarDerivacionesPendientes')
  @ApiQuery({
    name: 'codigoPrestadorPrivado',
    required: true,
    description: 'Código del prestador privado, Ejem: 77022430-6',
  })
  async listarDerivacionesPendientes(
    @Query('codigoPrestadorPrivado') codigoPrestadorPrivado: string,
  ): Promise<ResultadoFinal> {
    const dto: DerivacionesPendientesDto = { codigoPrestadorPrivado };
    return this.derivacionesService.listarDerivacionesPendientes(dto);
  }

  @Get('Rs_DetalleDerivacion')
  @ApiQuery({
    name: 'codigoDerivacion',
    required: true,
    description: 'Código de la derivación, Ejem: 295367',
  })
  async listarDetalleDerivacionPendiente(
    @Query('codigoDerivacion') codigoDerivacion: string,
  ): Promise<BSConsultarDetalleDerivacionResponse> {
    const dto: DetalleDerivacionesPendientesDto = { codigoDerivacion };
    return this.derivacionesService.obtenerDetalleDerivacionPendiente(dto);
  }

  @Get('Rs_ListarDerivaciones')
  @ApiQuery({
    name: 'codigoDZ',
    required: true,
    description: 'Código de la dirección zonal',
  })
  async listarDerivaciones(
    @Query('codigoDZ') codigoDZ: string,
  ): Promise<BSListarDerivacionesManualesOutput[]> {
    const dto: ListarDerivacionesDzDto = { codigoDZ };
    return this.derivacionesService.listarDerivacionesDz(dto);
  }

  @Post('Rs_ListarDerivacionesBeneficiario')
  @HttpCode(200)
  async listarDerivacionesBeneficiario(
    @Body() listarDerivacionesDto: ListarDerivacionesDto,
  ): Promise<DerivacionBeneficiarioResponse> {
    return this.derivacionesService.obtenerDerivacionesBeneficiario(
      listarDerivacionesDto,
    );
  }
}
