import { DOMAIN } from "../infra/DOMAIN";
import { Respondente } from "../modelo/respondente";
import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { RepositorioSurvey } from "../repositorio/repositorio-survey";
import { VisaoDados } from "../visao/visao-dados";

export class ControladoraDados{

    private visao: VisaoDados;
    private repoSurvey: RepositorioSurvey;

    constructor(visao: VisaoDados){
        this.visao = visao;
        this.repoSurvey = new RepositorioSurvey;
    }


    async iniciarSurvey() {
        if(this.visao.camposEstaoVazios()){
            this.visao.exibirNotificacaoFavorPreencherOsCampos();
        } else{
            const perfil = this.visao.valorPerfil();
            const idade = this.visao.valorIdade();
            const escolaridade = this.visao.valorEscolaridade();
            const cargo = this.visao.valorCargo();
            const dados = new Respondente(perfil,idade,escolaridade,cargo);
            this.repoSurvey.salvarDadosRespondente(dados);
            window.location.href = `${DOMAIN}/front/pages/survey.html`;
        }
    }
}