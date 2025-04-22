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

  export interface InfoBeneficiario {
    nombres?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
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