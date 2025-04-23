import { Controller, Get, Query } from '@nestjs/common';
import { DataBeneficiarioService } from './data-beneficiario.service';
import { ConsultarRutBeneficiarioDto } from './dtos/data-beneficiario.dto';
import { ConsultaBeneficiarioResponse } from './interfaces/data-beneficiario.interface';

@Controller()
export class DataBeneficiarioController {
  constructor(
    private readonly dataBeneficiarioService: DataBeneficiarioService,
  ) {}

  @Get('Rs_ConsultarRutBeneficiario')
  async consultaRutBeneficiario(
    @Query('runBeneficiario') runBeneficiario: string,
  ): Promise<ConsultaBeneficiarioResponse> {
    const dto: ConsultarRutBeneficiarioDto = { runBeneficiario };
    const result = await this.dataBeneficiarioService.obtenerDatosBeneficiario(dto.runBeneficiario);
    return { BS_ConsultarRutBeneficiarioOutput: result.BSConsultarRutBeneficiarioOutput };
  }
}
