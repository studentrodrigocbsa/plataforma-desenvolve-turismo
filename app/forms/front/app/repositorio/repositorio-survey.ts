export class RepositorioSurvey{

    clear() {
        localStorage.clear();
    }

    save(perguntas: [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}]) {
        localStorage.setItem('survey',JSON.stringify(perguntas));
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
}