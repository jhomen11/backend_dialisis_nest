import { ApiClienteService } from '../services/api-cliente/api-cliente.service';

export async function getNombreRegion(
  codigoRegion: string,
  apiClienteService: ApiClienteService,
): Promise<string> {
  try {
    const dataRegion = await apiClienteService.listarRegiones();

    for (const region of dataRegion.bodyResponse.coleccion.item) {
      if (region.codigoPrincipal === codigoRegion.trim()) {
        return region.descripcion;
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
    const dataComuna = await apiClienteService.listarComuna(codigoRegion.trim());

    for (const comuna of dataComuna.bodyResponse.coleccion.item) {
      if (comuna.codigoPrincipal === codigoComuna.trim()) {
        return comuna.descripcion;
      }
    }
    return 'Sin comuna';
  } catch (error) {
    console.error('Error al obtener el nombre de la comuna:', error);
    return 'Sin comuna';
  }
}