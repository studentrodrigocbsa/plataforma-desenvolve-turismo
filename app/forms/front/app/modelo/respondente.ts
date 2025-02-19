export class Respondente{

    tipo: string;
    faixa_etaria: string;
    escolaridade: string;
    cargo: string;
    nota: number;
    survey: number;

    constructor(
        tipo: string,
        faixa_etaria: string,
        escolaridade: string,
        cargo: string,
        nota = 0,
        survey = 1
    ){
        this.tipo = tipo;
        this.faixa_etaria = faixa_etaria;
        this.escolaridade = escolaridade;
        this.cargo = cargo;
        this.nota = nota;
        this.survey = survey;
    }
}