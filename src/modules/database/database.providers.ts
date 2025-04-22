import { Provider } from '@nestjs/common';
import * as oracledb from 'oracledb';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_DIALISIS',
    useFactory: async () => {
      try {
        const connection = await oracledb.getConnection({
          user: process.env.USUARIO_BD,
          password: process.env.PASS_BD,
          connectString: process.env.TNS_BD,
        });
        console.log('Conexión a DIALISIS establecida');
        return connection;
      } catch (error) {
        console.error('Error al conectar a PRIMARY:', error);
        throw error;
      }
    },
  },
  {
    provide: 'DATA_DIALISIS_OHI',
    useFactory: async () => {
      try {
        const connection = await oracledb.getConnection({
          user: process.env.USUARIO_BD_OHI,
          password: process.env.PASS_BD_OHI,
          connectString: process.env.TNS_BD_OHI,
        });
        console.log('Conexión a OHI establecida');
        return connection;
      } catch (error) {
        console.error('Error al conectar a SECONDARY:', error);
        throw error;
      }
    },
  },
];