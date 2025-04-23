import { Injectable, Inject } from '@nestjs/common';
import * as oracledb from 'oracledb';

@Injectable()
export class DataBeneficiarioRepository {
  constructor(
    @Inject('DATA_DIALISIS') private readonly connection: oracledb.Connection,
  ) {}
  /**
    * Obtiene los datos de un beneficiario a partir de su número de rut.
    * @param rutDv - Número de documento del beneficiario.
    * @returns Los datos del beneficiario y mensajes de error o éxito.
    */
  async obtenerDatosBeneficiario(rutDv: string): Promise<any> {
    try {
    const result = await this.connection.execute(
        `BEGIN INTEGRACION.P_LISTA_GEO_INFOPERSONA(:pkrutDv, :cursorDatos, :codigoMensaje, :mensaje); END;`,
        {
        pkrutDv: rutDv,
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
    console.error('Error al obtener datos del beneficiario:', error);
    throw new Error(
        `Error en DataBeneficiarioRepository: ${error.message}`,
    );
    }
}
}
    
    