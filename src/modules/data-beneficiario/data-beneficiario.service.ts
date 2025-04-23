import { Injectable } from '@nestjs/common';
import { DataBeneficiarioRepository } from './repositories/data-beneficiario.repository';
import { BSConsultarRutBeneficiarioOutput } from './interfaces/data-beneficiario.interface';

@Injectable()
export class DataBeneficiarioService {
  constructor(
    private readonly dataBeneficiarioRepository: DataBeneficiarioRepository,
  ) {}

  async obtenerDatosBeneficiario(rutDv: string): Promise<{
    BSConsultarRutBeneficiarioOutput: BSConsultarRutBeneficiarioOutput[];
  }> {
    try {
      const result =
        await this.dataBeneficiarioRepository.obtenerDatosBeneficiario(rutDv);
      const dataBeneficiario: BSConsultarRutBeneficiarioOutput = {
        nombres: 'JOSÉ ARNOLDO',
        apellidoPaterno: 'RIQUELME',
        apellidoMaterno: 'CATRICHEO',
        tramo: 'D',
        sexo: 1,
        direccion: 'C. Afluente 2419',
        codigoPrestacion: '1901028',
        codigoPrestacionPU: 0,
        descripcionPrestacion:
          'HEMODIALISIS CON BICARBONATO CON INSUMOS (POR SESION)',
        diagnostico: 'IRC',
        email: 'ycardenas@fonasa.cl',
        telefono1: '56942568305',
        telefono2: null,
        fechaNacimiento: new Date('1962-10-16'),
        run: '9622549-0',
        codigoComuna: '13122',
        codigoRegion: '13',
        codigoBeneficiario: '174860',
        nombreComuna: 'PEÑALOLÉN',
        nombreRegion: 'REGIÓN METROPOLITANA DE SANTIAGO',
        hepatitisB: 0,
        fechaIniTratamiento: new Date('2025-04-23T15:26:09'),
        hipertensionArterial: null,
        diabetesTipoII: null,
      };
      return { BSConsultarRutBeneficiarioOutput: [dataBeneficiario] };
    } catch (error) {
      console.error('Error al obtener datos del beneficiario:', error);
      throw new Error(`Error en DataBeneficiarioService: ${error.message}`);
    }
  }
}
