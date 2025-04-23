export interface DerivacionPendiente {
  CODIGODERIVACION?: string;
  RUN?: string;
  CODIGOBENEFICIARIO?: string;
  FECHADERIVACION?: Date;
  FECHAINICIODERIVACION?: Date;
  FECHATERMINODERIVACION?: Date;
  TIPODERIVACION?: string;
}
export interface ResultadoProcedimiento {
  datos: DerivacionPendiente[];
  codigoMensaje: string;
  mensaje: string;
}




export interface DerivacionCompleta {
  codigoDerivacion?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  run?: string;
  codigoBeneficiario?: string;
  fechaDerivacion?: Date;
  fechaInicioDerivacion?: Date;
  fechaTerminoDerivacion?: Date;
  tipoDerivacion?: string;
}

export interface ResultadoFinal {
  BS_ListarDerivacionesPendientesOutput: DerivacionCompleta[];
}


export interface ResultadoDetalleDerivacion {
  datos: DetalleDerivacion[];
  codigoMensaje: string;
  mensaje: string;
}
export interface DetalleDerivacion {
  direccion: string;
  codigoPrestacion: string;
  codigoBeneficiario: string;
  diagnostico: string;
  email: string;
  telefono1: string;
  telefono2: string;
  run: string;
  codigoComuna: number;
  codigoRegion: number;
  hepatitisB: number;
  cuartoTurno: string;
  tipoDerivacion: string;
  FK_INFORMACION_BENEFICIARIO: string;
  PK_INFORMACION_BENEFICIARIO: string;
}


export interface BSConsultarDetalleDerivacionOutput {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tramo: string;
  sexo: number;
  direccion: string;
  codigoPrestacion: string;
  descripcionPrestacion: string;
  diagnostico: string;
  email: string;
  telefono1: string;
  telefono2: null;
  fechaNacimiento: Date;
  run: string;
  codigoComuna: string;
  codigoRegion: string;
  codigoBeneficiario: number;
  nombreComuna: string;
  nombreRegion: string;
  hepatitisB: number;
  cuartoTurno: null;
  tipoDerivacion: string;
}

export interface BSConsultarDetalleDerivacionResponse {
  BS_ConsultarDetalleDerivacionOutput: BSConsultarDetalleDerivacionOutput[];
}
