import { Respondente } from "https://bsi.cefet-rj.br/masa/front/app/modelo/respondente.ts";

export class RepositorioSurvey{

    clear() {
        localStorage.clear();
    }

    pegarTokenUrl(){
        const url = window.location.href;
        const params = new URLSearchParams(new URL(url).search);
        const token = params.get('token');
        return token ? token : '';
    }

    salvarSurveyLocalmente(perguntas: [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}]) {
        localStorage.setItem('survey',JSON.stringify(perguntas));
    }

    get(): [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}]{
        return JSON.parse(localStorage.getItem('survey') || '[]');
    }

    
    salvarDadosRespondente(dados: Respondente) {
        localStorage.setItem('respondente',JSON.stringify(dados));
    }

    getDadosRespondente(): Respondente{
        return JSON.parse(localStorage.getItem('respondente') || '{}');
    }
    
    resetar(){
        const survey = this.get();
        survey.forEach(p => {
            p.respondida = false;
            p.opcoes.forEach(o => o.voto = 0);
        });
        this.salvarSurveyLocalmente(survey);
    }
}