import { Respondente } from "../modelo/respondente";

export class RepositorioSurvey{

    clear() {
        localStorage.clear();
    }

    save(survey: [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}]) {
        localStorage.setItem('survey',JSON.stringify(survey));
    }

    get(): [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}]{
        return JSON.parse(localStorage.getItem('survey') || '[]');
    }

    resetar(){
        const survey = this.get();
        survey.forEach(p => {
            p.respondida = false;
            p.opcoes.forEach(o => o.voto = 0);
        });
        this.save(survey);
    }

    
    salvarDadosRespondente(dados: Respondente) {
        localStorage.setItem('respondente',JSON.stringify(dados));
    }

    getDadosRespondente(): Respondente{
        return JSON.parse(localStorage.getItem('respondente') || '{}');
    }

    getToken(){
        return JSON.parse(localStorage.getItem('respondente') || '{token:"?"}').token;
    }
}