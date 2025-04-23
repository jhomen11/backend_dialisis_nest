import { Controller, Get, Query } from '@nestjs/common';
import { DerivacionesService } from './derivaciones.service';
import { BSConsultarDetalleDerivacionResponse, ResultadoFinal } from './interfaces/derivaciones.interface';
import { DerivacionesPendientesDto, DetalleDerivacionesPendientesDto } from './dtos/derivaciones-pendientes.dto';

@Controller()
export class DerivacionesController {
  constructor(private readonly derivacionesService: DerivacionesService) {}

  @Get('Rs_ListarDerivacionesPendientes')
  async listarDerivacionesPendientes(
    @Query('codigoPrestadorPrivado') codigoPrestadorPrivado: string,
  ): Promise<ResultadoFinal> {
    const dto: DerivacionesPendientesDto = { codigoPrestadorPrivado };
    return this.derivacionesService.listarDerivacionesPendientes(dto);
  }

  @Get('Rs_DetalleDerivacion')
  async listarDetalleDerivacionPendiente(
    @Query('codigoDerivacion') codigoDerivacion: string,
  ): Promise<BSConsultarDetalleDerivacionResponse> {
    const dto: DetalleDerivacionesPendientesDto = { codigoDerivacion };
    return this.derivacionesService.obtenerDetalleDerivacionPendiente(dto);
  }
}
