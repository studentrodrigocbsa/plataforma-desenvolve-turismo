import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { RepositorioSurvey } from "../repositorio/repositorio-survey";
import { VisaoMenu } from "../visao/visao-menu";

export class ControladoraMenu{

    private visao: VisaoMenu;
    private repoMASA: RepositorioMASA;
    private repoSurvey: RepositorioSurvey;

    constructor(visao: VisaoMenu){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
        this.repoSurvey = new RepositorioSurvey;
    }


    async carregarSurvey() {
        const opcaoPesquisa = this.visao.valorPesquisaSelecionada();
        switch(opcaoPesquisa){
            case 'aav' : 
                const perguntas = await this.repoMASA.buscarPerguntasAcessibilidadeAtitudinal();
                this.repoSurvey.salvarPerguntasLocalmenteParaVisitantes(perguntas);
                window.location.href = 'http://localhost:5173/front/pages/survey.html';
            break;
            default :
                this.visao.exibirNotificacaoSelecioneUmaPesquisa();
            break;
        }
    }
}