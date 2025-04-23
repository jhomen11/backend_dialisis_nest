import { IsNotEmpty, IsString } from "class-validator";

export class ConsultarRutBeneficiarioDto{
    @IsNotEmpty()
    @IsString()
    runBeneficiario:string;
}