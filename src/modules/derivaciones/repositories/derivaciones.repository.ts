import { Injectable, Inject } from '@nestjs/common';
import * as oracledb from 'oracledb';
import { DerivacionesPendientesDto, DetalleDerivacionesPendientesDto } from '../dtos/derivaciones-pendientes.dto';
import { ResultadoDetalleDerivacion, ResultadoProcedimiento } from '../interfaces/derivaciones.interface';

@Injectable()
export class DerivacionesRepository {
  constructor(
    @Inject('DATA_DIALISIS') private readonly connection: oracledb.Connection,
  ) {}

    /**
     * Obtiene las derivaciones pendientes de un prestador privado.
     * @param codigoPrestadorPrivado - Objeto que contiene el código del prestador privado.
     * @returns Un objeto ResultadoProcedimiento con los datos de las derivaciones y mensajes de error o éxito.
     */
  async obtenerDerivacionesPendientes(
    codigoPrestadorPrivado: DerivacionesPendientesDto,
  ): Promise<ResultadoProcedimiento> {
    try {
      const result = await this.connection.execute(
        `BEGIN INTEGRACION.P_GEO_DERIVACIONES_PENDIENTES(:pkPrestador, :cursorDatos, :codigoMensaje, :mensaje); END;`,
        {
          pkPrestador: codigoPrestadorPrivado.codigoPrestadorPrivado,
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
        cursorDatos: oracledb.ResultSet<any>;
        codigoMensaje: string;
        mensaje: string;
      };

      const outCursor = outBinds.cursorDatos;
      const rows = await outCursor.getRows();
      await outCursor.close();

      return {
        datos: rows,
        codigoMensaje: outBinds.codigoMensaje,
        mensaje: outBinds.mensaje,
      };
    } catch (error) {
      console.error('Error al obtener derivaciones pendientes:', error);
      throw new Error(
        `Error en DerivacionesRepository: ${error.message}`,
      );
    }
  }

    /**
     * Obtiene el detalle de una derivación pendiente.
     * @param codigoDerivacion - Objeto que contiene el código de la derivación.
     * @returns Un objeto ResultadoProcedimiento con los datos de la derivación y mensajes de error o éxito.
     */
  async obtenerDetalleDerivacionPendiente(
    codigoDerivacion: DetalleDerivacionesPendientesDto,
  ): Promise<ResultadoDetalleDerivacion> {
    try {
      const result = await this.connection.execute(
        `BEGIN INTEGRACION.P_LISTAR_DET_GEO_DERIVACIONES(:pkDerivacion, :cursorDatos, :codigoMensaje, :mensaje); END;`,
        {
          pkDerivacion: codigoDerivacion.codigoDerivacion,
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
        cursorDatos: oracledb.ResultSet<any>;
        codigoMensaje: string;
        mensaje: string;
      };

      const outCursor = outBinds.cursorDatos;
      const rows = await outCursor.getRows();
      await outCursor.close();

      return {
        datos: rows,
        codigoMensaje: outBinds.codigoMensaje,
        mensaje: outBinds.mensaje,
      };
    } catch (error) {
      console.error('Error al obtener detalle de la derivacion:', error);
      throw new Error(
        `Error en DerivacionesRepository: ${error.message}`,
      );
    }
  }
}