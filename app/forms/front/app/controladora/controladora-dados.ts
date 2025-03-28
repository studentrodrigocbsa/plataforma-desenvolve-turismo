import { DOMINIO } from "../infra/Dominio";
import { Respondente } from "../modelo/respondente";
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
            this.visao.botaoCarregamento();
            const perfil = this.visao.valorPerfil();
            const idade = this.visao.valorIdade();
            const escolaridade = this.visao.valorEscolaridade();
            const cargo = this.visao.valorCargo();
            const dados = new Respondente(perfil,idade,escolaridade,cargo);
            this.repoSurvey.salvarDadosRespondente(dados);
            window.location.href = `${DOMINIO}/front/pages/survey.html`;
        }
    }
}