export class Respondente{

    perfil: string;
    faixa_etaria: string;
    escolaridade: string;
    cargo: string;
    nota: number;
    survey: number;

    constructor(
        perfil: string,
        faixa_etaria: string,
        escolaridade: string,
        cargo: string,
        nota = 0,
        survey = 1 // só temos 1 survey disponível no momento, vai 1 direto
    ){
        this.perfil = perfil;
        this.faixa_etaria = faixa_etaria;
        this.escolaridade = escolaridade;
        this.cargo = cargo;
        this.nota = nota;
        this.survey = survey;
    }
}