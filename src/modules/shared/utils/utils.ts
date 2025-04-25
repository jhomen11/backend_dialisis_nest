import { BSConsultarRutBeneficiarioOutput } from 'src/modules/data-beneficiario/interfaces/data-beneficiario.interface';
import { ApiClienteService } from '../services/api-cliente/api-cliente.service';

export async function getNombreRegion(
  codigoRegion: string,
  apiClienteService: ApiClienteService,
): Promise<string> {
  try {
    const dataRegion = await apiClienteService.listarRegiones();

    if (dataRegion.bodyResponse.coleccion.item) {
      for (const region of dataRegion.bodyResponse.coleccion.item) {
        if (region.codigoPrincipal === codigoRegion.trim()) {
          return region.descripcion;
        }
      }
    }
    return 'Sin Región';
  } catch (error) {
    console.error('Error al obtener el nombre de la región:', error);
    return 'Sin Región';
  }
}

export async function getNombreComuna(
  codigoComuna: string,
  codigoRegion: string,
  apiClienteService: ApiClienteService,
): Promise<string> {
  try {
    const dataComuna = await apiClienteService.listarComuna(
      codigoRegion.trim(),
    );

    if (dataComuna.bodyResponse.coleccion.item) {
      for (const comuna of dataComuna.bodyResponse.coleccion.item) {
        if (comuna.codigoPrincipal === codigoComuna.trim()) {
          return comuna.descripcion;
        }
      }
    }
    return 'Sin comuna';
  } catch (error) {
    console.error('Error al obtener el nombre de la comuna:', error);
    return 'Sin comuna';
  }
}

export const getNombreBeneficiario = async (
  rut: string,
  apiClienteService: ApiClienteService,
): Promise<string> => {
  try {
    const resp = await apiClienteService.consultaBaseBeneficiario(rut);
    const nombreBeneficiario = `${resp.infoTitular?.nombres} ${resp.infoTitular?.apellidoPaterno} ${resp.infoTitular?.apellidoMaterno}`;
    return nombreBeneficiario.trim() || 'Sin nombre';
  } catch (error) {
    console.error('Error al obtener el nombre del beneficiario:', error);
    return Promise.resolve('Sin nombre');
  }
};

export const createEmptyBeneficiario = (): BSConsultarRutBeneficiarioOutput => {
  return {
    nombres: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    tramo: null,
    sexo: null,
    direccion: null,
    codigoPrestacion: null,
    codigoPrestacionPU: null,
    descripcionPrestacion: null,
    diagnostico: null,
    email: null,
    telefono1: null,
    telefono2: null,
    fechaNacimiento: null,
    run: null,
    codigoComuna: null,
    codigoRegion: null,
    codigoBeneficiario: null,
    nombreComuna: null,
    nombreRegion: null,
    hepatitisB: null,
    fechaIniTratamiento: null,
    hipertensionArterial: null,
    diabetesTipoII: null,
  };
};
