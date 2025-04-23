export interface ColeccionesResponse {
    bodyResponse: BodyResponse;
}

export interface BodyResponse {
    coleccion: Coleccion;
}

export interface Coleccion {
    item: Item[];
}

export interface Item {
    codigoPrincipal:  string;
    codigoSecundario: null;
    descripcion:      string;
    codigoItemPadre:  null;
    tipoCodigo:       number;
    tipoDescripcion:  string;
}

