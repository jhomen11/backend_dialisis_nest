import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { DerivacionesService } from './derivaciones.service';
import { BSConsultarDetalleDerivacionResponse, DerivacionBeneficiarioResponse, ResultadoFinal } from './interfaces/derivaciones.interface';
import { DerivacionesPendientesDto, DetalleDerivacionesPendientesDto } from './dtos/derivaciones-pendientes.dto';
import { ListarDerivacionesDto } from './dtos/derivaciones-beneficiario.dto';

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

  @Post('Rs_ListarDerivacionesBeneficiario')
  @HttpCode(200)
  async listarDerivacionesBeneficiario(
    @Body() listarDerivacionesDto: ListarDerivacionesDto,
  ): Promise<DerivacionBeneficiarioResponse> {
    return this.derivacionesService.obtenerDerivacionesBeneficiario(listarDerivacionesDto);
  }
}
