export class Respondente{

    token: string;
    nota: number;
    survey: number;

    constructor(
        token: string,
        nota = 0,
        survey = 1 // só temos 1 survey disponível no momento, vai 1 direto
    ){
        this.token = token;
        this.nota = nota;
        this.survey = survey;
    }
}