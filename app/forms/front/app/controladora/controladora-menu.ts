import { DOMAIN } from "../infra/DOMAIN";
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
            case '1' : 
                this.visao.botaoCarregamento();
                const perguntas = await this.repoMASA.buscarPerguntasAcessibilidadeAtitudinal();
                this.repoSurvey.save(perguntas);
                window.location.href = `${DOMAIN}/front/pages/survey.html`;
            break;
            default :
                this.visao.exibirNotificacaoSelecioneUmaPesquisa();
            break;
        }
    }

    async carregarSurveysDisponiveis(){
        //this.visao.desenharPesquisasDisponiveis();
    }
}