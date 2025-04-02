export class Respondente{

    perfil: string;
    faixa_etaria: string;
    escolaridade: string;
    cargo: string;
    nota: number;

    constructor(
        perfil: string,
        faixa_etaria: string,
        escolaridade: string,
        cargo: string,
        nota = 0
    ){
        this.perfil = perfil;
        this.faixa_etaria = faixa_etaria;
        this.escolaridade = escolaridade;
        this.cargo = cargo;
        this.nota = nota;
    }
}