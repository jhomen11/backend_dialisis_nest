import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ColeccionesResponse } from '../interfaces/api-cliente.interface';

interface ColeccionesRquest {
  bodyRequest: {
    codigoTipoColeccion: number;
    codigoItemPadre?: string;
  };
}

@Injectable()
export class ApiClienteService {
  constructor(private readonly httpService: HttpService) {}

  async consultaBaseBeneficiario(run: string): Promise<any> {
    try {
      const urlInfoBeneficiario =
        process.env.URL_CONSULTA_RUT_BASE_BENEFICIARIO;
      const url = `${urlInfoBeneficiario}/${run}`;
      const headers = {
        'Content-Type': 'application/json',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      };

      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data || {};
    } catch (error) {
      console.error(`Error al consultar beneficiario ${run}:`, error);
      return {};
    }
  }

  async listarRegiones(): Promise<ColeccionesResponse> {
    try {
      const url = `${process.env.URL_COLECCIONES}`;
      const apyKey = process.env.API_KEY_COLECCIONES;
      const bodyRequest: ColeccionesRquest = {
        bodyRequest: {
          codigoTipoColeccion: 101,
          codigoItemPadre: '',
        },
      };
      const headers = {
        'Content-Type': 'application/json',
        apikey: apyKey,
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      };
      const response = await firstValueFrom(
        this.httpService.post<ColeccionesResponse>(url, bodyRequest, {
          headers,
        }),
      );
      return response.data || {};
    } catch (error) {
      console.error(`Error al consultar regiones:`, error);
      return {} as ColeccionesResponse;
    }
  }
  async listarComuna(codigoItemPadre: string): Promise<ColeccionesResponse> {
    try {
      const url = `${process.env.URL_COLECCIONES}`;
      const apyKey = process.env.API_KEY_COLECCIONES;
      const bodyRequest: ColeccionesRquest = {
        bodyRequest: {
          codigoTipoColeccion: 103,
          codigoItemPadre,
        },
      };
      const headers = {
        'Content-Type': 'application/json',
        apikey: apyKey,
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      };
      const response = await firstValueFrom(
        this.httpService.post<ColeccionesResponse>(url, bodyRequest, {
          headers,
        }),
      );
      return response.data || {};
    } catch (error) {
      console.error(`Error al consultar comunas:`, error);
      return {} as ColeccionesResponse;
    }
  }
}
