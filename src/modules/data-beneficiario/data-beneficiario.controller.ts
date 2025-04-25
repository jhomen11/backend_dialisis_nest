import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DataBeneficiarioService } from './data-beneficiario.service';
import { ConsultarRutBeneficiarioDto } from './dtos/data-beneficiario.dto';
import { ConsultaBeneficiarioResponse } from './interfaces/data-beneficiario.interface';
@ApiTags('DataBeneficiario')
@Controller()
export class DataBeneficiarioController {
  constructor(
    private readonly dataBeneficiarioService: DataBeneficiarioService,
  ) {}

  @Get('Rs_ConsultarRutBeneficiario')
  @ApiQuery({
    name: 'runBeneficiario',
    required: true,
    description: 'RUT del beneficiario en formato 12345678-9',
    type: String,
  })
  async consultaRutBeneficiario(
    @Query('runBeneficiario') runBeneficiario: string,
  ): Promise<ConsultaBeneficiarioResponse> {
    const dto: ConsultarRutBeneficiarioDto = { runBeneficiario };
    const result = await this.dataBeneficiarioService.obtenerDatosBeneficiario(dto.runBeneficiario);
    return { BS_ConsultarRutBeneficiarioOutput: result.BSConsultarRutBeneficiarioOutput };
  }
}
