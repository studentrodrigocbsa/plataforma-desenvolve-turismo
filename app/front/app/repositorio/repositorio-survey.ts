export class RepositorioSurvey{

    salvarPerguntasLocalmenteParaVisitantes(perguntas: void) {
        localStorage.setItem('tipo','Visitante');
        localStorage.setItem('survey',JSON.stringify(perguntas));
    }

}