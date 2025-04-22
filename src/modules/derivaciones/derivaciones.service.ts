import { Injectable, Inject } from '@nestjs/common';
import * as oracledb from 'oracledb';
import { DerivacionesPendientesDto } from './dtos/derivaciones-pendientes.dto';
import {
  DerivacionCompleta,
  DerivacionPendiente,
  InfoBeneficiario,
  ResultadoFinal,
  ResultadoProcedimiento,
} from './interfaces/derivaciones.interface';
import {} from './dtos/derivaciones-pendientes.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DerivacionesService {
  constructor(
    @Inject('DATA_DIALISIS')
    private readonly connection: oracledb.Connection,
    private readonly httpService: HttpService,
  ) {}

  private async consultaBaseBeneficiario(
    run: string,
  ): Promise<InfoBeneficiario> {
    try {
      const urlInfoBeneficiario =
        process.env.URL_CONSULTA_RUT_BASE_BENEFICIARIO;
      const url = `${urlInfoBeneficiario}/${run}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data.InfoBeneficiario || {};
    } catch (error) {
      console.error(`Error al consultar beneficiario ${run}:`, error);
      return {};
    }
  }

  private async procesarDerivacion(
    derivacion: DerivacionPendiente,
  ): Promise<DerivacionCompleta> {
    try {
      const infoBeneficiario = await this.consultaBaseBeneficiario(
        derivacion.RUN || '',
      );

      return {
        codigoDerivacion: derivacion.CODIGODERIVACION?.toString(),
        nombres: infoBeneficiario.nombres,
        apellidoPaterno: infoBeneficiario.apellidoPaterno,
        apellidoMaterno: infoBeneficiario.apellidoMaterno,
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
    // Aquí llamas a tu procedimiento almacenado ya implementado
    const derivacionesPendientes = await this.obtenerDerivacionesPendientes(
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

  async obtenerDerivacionesPendientes(
    dto: DerivacionesPendientesDto,
  ): Promise<ResultadoProcedimiento> {
    try {
      const result = await this.connection.execute(
        `BEGIN INTEGRACION.P_GEO_DERIVACIONES_PENDIENTES(:pkPrestador, :cursorDatos, :codigoMensaje, :mensaje); END;`,
        {
          pkPrestador: dto.codigoPrestadorPrivado,
          cursorDatos: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
          codigoMensaje: {
            dir: oracledb.BIND_OUT,
            type: oracledb.STRING,
            maxSize: 100,
          },
          mensaje: {
            dir: oracledb.BIND_OUT,
            type: oracledb.STRING,
            maxSize: 4000,
          },
        },
      );

      const outBinds = result.outBinds as unknown as {
        cursorDatos: oracledb.ResultSet<DerivacionPendiente>;
        codigoMensaje: string;
        mensaje: string;
      };
      const outCursor = outBinds.cursorDatos;
      const rows = await outCursor.getRows();
      await outCursor.close();

      return {
        datos: rows as DerivacionPendiente[],
        codigoMensaje: outBinds.codigoMensaje,
        mensaje: outBinds.mensaje,
      };
    } catch (error) {
      console.error('Error al ejecutar procedimiento:', error);
      throw new Error(
        `Error al obtener derivaciones pendientes: ${error.message}`,
      );
    }
  }
}
