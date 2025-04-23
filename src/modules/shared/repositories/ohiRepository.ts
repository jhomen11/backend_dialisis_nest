// src/derivaciones/repositories/derivaciones.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import * as oracledb from 'oracledb';

export class OhiRepository {
  constructor(
    @Inject('DATA_DIALISIS_OHI')
    private readonly connection: oracledb.Connection,
  ) {}
  async obtenerNombrePrestacion(codigoPrestacion: string): Promise<string> {
    try {
      const result = await this.connection.execute(
        `BEGIN :result := F_NOMBRE_PRESTACION(:codigo); END;`,
        {
          codigo: codigoPrestacion,
          result: {
            dir: oracledb.BIND_OUT,
            type: oracledb.STRING,
            maxSize: 200,
          },
        },
      );

      return (result.outBinds as { result: string }).result;
    } catch (error) {
      console.error('Error al ejecutar función Oracle:', error);
      throw new Error('Error al obtener nombre de prestación');
    }
  }
}
