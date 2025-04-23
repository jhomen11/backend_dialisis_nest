export interface ConsultaBeneficiarioResponse {
    BS_ConsultarRutBeneficiarioOutput: BSConsultarRutBeneficiarioOutput[];
}

export interface BSConsultarRutBeneficiarioOutput {
    nombres:               string;
    apellidoPaterno:       string;
    apellidoMaterno:       string;
    tramo:                 string;
    sexo:                  number;
    direccion:             string;
    codigoPrestacion:      string;
    codigoPrestacionPU:    number;
    descripcionPrestacion: string;
    diagnostico:           string;
    email:                 string;
    telefono1:             string;
    telefono2:             null;
    fechaNacimiento:       Date;
    run:                   string;
    codigoComuna:          string;
    codigoRegion:          string;
    codigoBeneficiario:    string;
    nombreComuna:          string;
    nombreRegion:          string;
    hepatitisB:            number;
    fechaIniTratamiento:   Date;
    hipertensionArterial:  null;
    diabetesTipoII:        null;
}
