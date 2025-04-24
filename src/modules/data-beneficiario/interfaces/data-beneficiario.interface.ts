export interface ConsultaBeneficiarioResponse {
    BS_ConsultarRutBeneficiarioOutput: BSConsultarRutBeneficiarioOutput[];
}

export interface BSConsultarRutBeneficiarioOutput {
    nombres:               string | null;
    apellidoPaterno:       string | null;
    apellidoMaterno:       string | null;
    tramo:                 string | null;
    sexo:                  number | null;
    direccion:             string | null;
    codigoPrestacion:      string | null;
    codigoPrestacionPU:    number | null;
    descripcionPrestacion: string | null;
    diagnostico:           string | null;
    email:                 string | null;
    telefono1:             string | null;
    telefono2:             null;
    fechaNacimiento:       Date | null;
    run:                   string | null;
    codigoComuna:          string | null;
    codigoRegion:          string | null;
    codigoBeneficiario:    string | null;
    nombreComuna:          string | null;
    nombreRegion:          string | null;
    hepatitisB:            number | null;
    fechaIniTratamiento:   Date | null;
    hipertensionArterial:  null;
    diabetesTipoII:        null;
}
