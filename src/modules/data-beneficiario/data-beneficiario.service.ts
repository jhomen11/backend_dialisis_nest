import { Injectable } from '@nestjs/common';
import { DataBeneficiarioRepository } from './repositories/data-beneficiario.repository';
import { BSConsultarRutBeneficiarioOutput } from './interfaces/data-beneficiario.interface';
import { OhiRepository } from '../shared/repositories/ohiRepository';
import { ApiClienteService } from '../shared/services/api-cliente/api-cliente.service';
import {
  createEmptyBeneficiario,
  getNombreComuna,
  getNombreRegion,
} from '../shared/utils/utils';

@Injectable()
export class DataBeneficiarioService {
  constructor(
    private readonly dataBeneficiarioRepository: DataBeneficiarioRepository,
    private readonly ohiRepository: OhiRepository,
    private readonly apiClienteService: ApiClienteService,
  ) {}

  async obtenerDatosBeneficiario(rutDv: string): Promise<{
    BSConsultarRutBeneficiarioOutput: BSConsultarRutBeneficiarioOutput[];
  }> {
    try {
      const result =
        await this.dataBeneficiarioRepository.obtenerDatosBeneficiario(rutDv);
      if (!result?.datos?.length) {
        return {
          BSConsultarRutBeneficiarioOutput: [createEmptyBeneficiario()],
        };
      }
      const data = result.datos[0];
      const run = data[7];

      const [
        infoBeneficiario,
        nombreComuna,
        nombreRegion,
        descripcionPrestacion,
      ] = await Promise.all([
        this.apiClienteService.consultaBaseBeneficiario(run || ''),
        getNombreComuna(data[8], data[9], this.apiClienteService),
        getNombreRegion(data[9], this.apiClienteService),
        this.ohiRepository.obtenerNombrePrestacion(data[1]),
      ]);

      const dataBeneficiario: BSConsultarRutBeneficiarioOutput = {
        nombres: infoBeneficiario.infoTitular.nombres || '',
        apellidoPaterno: infoBeneficiario.infoTitular.apellidoPaterno || '',
        apellidoMaterno: infoBeneficiario.infoTitular.apellidoMaterno || '',
        tramo: infoBeneficiario.acreditacion.condicionActual.tramoIngreso || '',
        sexo: infoBeneficiario.infoTitular.genero.codigo || '',
        direccion: data[0] || '',
        codigoPrestacion: data[1] || '',
        codigoPrestacionPU: data[2] || null,
        descripcionPrestacion: descripcionPrestacion,
        diagnostico: data[3] || '',
        email: data[4] || '',
        telefono1: data[5] || null,
        telefono2: data[6] || null,
        fechaNacimiento: infoBeneficiario.infoTitular.fechaNacimiento || '',
        run: run || '',
        codigoComuna: data[8] || null,
        codigoRegion: data[9] || null,
        codigoBeneficiario: data[10] || null,
        nombreComuna: nombreComuna,
        nombreRegion: nombreRegion,
        hepatitisB: data[11] || null,
        fechaIniTratamiento: data[12] || null,
        hipertensionArterial: data[13] || null,
        diabetesTipoII: data[14] || null,
      };
      return { BSConsultarRutBeneficiarioOutput: [dataBeneficiario] };
    } catch (error) {
      console.error('Error al obtener datos del beneficiario:', error);
      throw new Error(`Error en DataBeneficiarioService: ${error.message}`);
    }
  }
}
