import { BSConsultarRutBeneficiarioOutput } from 'src/modules/data-beneficiario/interfaces/data-beneficiario.interface';
import { ApiClienteService } from '../services/api-cliente/api-cliente.service';


const regionesCache = new Map<string, string>();

setInterval(() => regionesCache.clear(), 1800000);

export async function getNombreRegion(
  codigoRegion: string,
  apiClienteService: ApiClienteService,
): Promise<string> {

  if (!codigoRegion?.trim()) return 'Sin Región';

  const codigo = codigoRegion.trim();

  // 1. Primero verificar si está en cache
  if (regionesCache.has(codigo)) {
    return regionesCache.get(codigo) || 'Sin Región';
  }

  try {
    // 2. Si no está en cache, obtener datos de la API
    const dataRegion = await apiClienteService.listarRegiones();

    // 3. Procesar y cachear todas las regiones
    if (dataRegion.bodyResponse.coleccion.item) {
      // Llenar el cache con todas las regiones obtenidas
      dataRegion.bodyResponse.coleccion.item.forEach(region => {
        regionesCache.set(region.codigoPrincipal, region.descripcion);
      });
    }

    // 4. Devolver la región solicitada (o 'Sin Región' si no existe)
    return regionesCache.get(codigo) || 'Sin Región';
  } catch (error) {
    console.error('Error al obtener el nombre de la región:', error);
    return 'Sin Región';
  }
}

const comunasCache = new Map<string, string>();

// Limpieza automática cada 30 minutos
setInterval(() => comunasCache.clear(), 1800000);

export async function getNombreComuna(
  codigoComuna: string,
  codigoRegion: string,
  apiClienteService: ApiClienteService,
): Promise<string> {
  if (!codigoComuna?.trim() || !codigoRegion?.trim()) return 'Sin comuna';

  const codigoCom = codigoComuna.trim();
  const codigoReg = codigoRegion.trim();
  
  // Creamos una clave compuesta para el cache (región + comuna)
  const cacheKey = `${codigoReg}_${codigoCom}`;

  // Verificar cache
  if (comunasCache.has(cacheKey)) {
    return comunasCache.get(cacheKey)!;
  }

  try {
    const dataComuna = await apiClienteService.listarComuna(codigoReg);
    
    if (dataComuna.bodyResponse.coleccion.item) {
      // Poblar cache con todas las comunas de esta región
      dataComuna.bodyResponse.coleccion.item.forEach(comuna => {
        const key = `${codigoReg}_${comuna.codigoPrincipal.trim()}`;
        comunasCache.set(key, comuna.descripcion);
      });
    }

    return comunasCache.get(cacheKey) || 'Sin comuna';
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
