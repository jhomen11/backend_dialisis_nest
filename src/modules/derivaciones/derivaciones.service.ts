import { Injectable, Inject } from '@nestjs/common';
import { DerivacionesPendientesDto, DetalleDerivacionesPendientesDto } from './dtos/derivaciones-pendientes.dto';
import {
  BSConsultarDetalleDerivacionOutput,
  DerivacionCompleta,
  DerivacionPendiente,
  ResultadoFinal,
} from './interfaces/derivaciones.interface';
import { DerivacionesRepository } from './repositories/derivaciones.repository';
import { ApiClienteService } from '../shared/services/api-cliente/api-cliente.service';
import { getNombreComuna, getNombreRegion } from '../shared/utils/utils';
import { OhiRepository } from '../shared/repositories/ohiRepository';

@Injectable()
export class DerivacionesService {
  constructor(
    private readonly derivacionesRepository: DerivacionesRepository,
    private readonly ohiRepository: OhiRepository,
    private readonly apiClienteService: ApiClienteService,
  ) {}


  private async procesarDerivacion(derivacion: DerivacionPendiente): Promise<DerivacionCompleta> {
    try {
      
      const infoBeneficiario = await this.apiClienteService.consultaBaseBeneficiario(
        derivacion.RUN || '',
      );

      return {
        codigoDerivacion: derivacion.CODIGODERIVACION?.toString(),
        nombres: infoBeneficiario.infoTitular?.nombres,
        apellidoPaterno: infoBeneficiario.infoTitular?.apellidoPaterno,
        apellidoMaterno: infoBeneficiario.infoTitular?.apellidoMaterno,
        run: derivacion.RUN,
        codigoBeneficiario: derivacion.CODIGOBENEFICIARIO?.toString(),
        fechaDerivacion: derivacion.FECHADERIVACION,
        fechaInicioDerivacion: derivacion.FECHAINICIODERIVACION,
        fechaTerminoDerivacion: derivacion.FECHATERMINODERIVACION,
        tipoDerivacion: derivacion.TIPODERIVACION,
      };
    } catch (error) {
      console.error(
        `Error procesando derivación ${derivacion.CODIGODERIVACION}:`,
        error,
      );
      return {};
    }
  }

  async listarDerivacionesPendientes(
    codigoPrestadorPrivado: DerivacionesPendientesDto,
  ): Promise<ResultadoFinal> {
    // Llamar procedimiento almacenado
    const derivacionesPendientes = await this.derivacionesRepository.obtenerDerivacionesPendientes(
      codigoPrestadorPrivado,
    );

    // Procesar todas las derivaciones concurrentemente
    const derivacionesProcesadas = await Promise.all(
      derivacionesPendientes.datos.map((d) => {
        return this.procesarDerivacion({
          CODIGODERIVACION: d[0],
          RUN: d[1],
          CODIGOBENEFICIARIO: d[2],
          FECHADERIVACION: d[3],
          FECHAINICIODERIVACION: d[4],
          FECHATERMINODERIVACION: d[5],
          TIPODERIVACION: d[6],
        });
      }),
    );

    // Filtrar resultados nulos
    const resultadoFinal = derivacionesProcesadas.filter((d) => d !== null);

    return {
      BS_ListarDerivacionesPendientesOutput: resultadoFinal,
    };
  }

  async obtenerDetalleDerivacionPendiente(
    codigoDerivacion: DetalleDerivacionesPendientesDto,
  ): Promise<{ BS_ConsultarDetalleDerivacionOutput: BSConsultarDetalleDerivacionOutput[] }> {
    try {
      const detalleDerivacion = await this.derivacionesRepository.obtenerDetalleDerivacionPendiente(
        codigoDerivacion,
      );

      const data = detalleDerivacion.datos[0]
      const run = data[7]
      
      const [infoBeneficiario, nombreComuna, nombreRegion, descripcionPrestacion] = await Promise.all([
        this.apiClienteService.consultaBaseBeneficiario(run || ''),
        getNombreComuna(data[8], data[9], this.apiClienteService),
        getNombreRegion(data[9], this.apiClienteService),
        this.ohiRepository.obtenerNombrePrestacion(data[1]),
      ]);
      
  
      const detalleDerivacionPendiente: BSConsultarDetalleDerivacionOutput = {
        nombres: infoBeneficiario.infoTitular.nombres || '',
        apellidoPaterno: infoBeneficiario.infoTitular.apellidoPaterno || '',
        apellidoMaterno: infoBeneficiario.infoTitular.apellidoMaterno || '',
        tramo: infoBeneficiario.acreditacion.condicionActual.tramoIngreso || '',
        sexo: infoBeneficiario.infoTitular.sexo || '',
        direccion: data[0] || '',
        codigoPrestacion: data[1] || '',
        descripcionPrestacion: descripcionPrestacion,
        diagnostico: data[3] || '',
        email: data[4] || '',
        telefono1: data[5] || null,
        telefono2: data[6] || null,
        fechaNacimiento: infoBeneficiario.infoTitular.fechaNacimiento || '',
        run: run || '',
        codigoComuna: data[8] || null,
        codigoRegion: data[9] || null,
        codigoBeneficiario: data[2] || null,
        nombreComuna: nombreComuna,
        nombreRegion: nombreRegion,
        hepatitisB: data[10] || null,
        cuartoTurno: data[11] || null,
        tipoDerivacion: data[12] || null,
      };
  
      return {
        BS_ConsultarDetalleDerivacionOutput: [detalleDerivacionPendiente],
      };
    } catch (error) {
      console.error(`Error al obtener detalle de derivación:`, error);
      throw new Error(`Error en DerivacionesService: ${error.message}`);
    }
  }

}
