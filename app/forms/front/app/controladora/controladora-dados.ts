import { DOMINIO } from "../infra/Dominio";
import { Respondente } from "../modelo/respondente";
import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { RepositorioSurvey } from "../repositorio/repositorio-survey";
import { VisaoDados } from "../visao/visao-dados";

export class ControladoraDados{

    private visao: VisaoDados;
    private repoSurvey: RepositorioSurvey;
    private repoMasa: RepositorioMASA;

    constructor(visao: VisaoDados){
        this.visao = visao;
        this.repoSurvey = new RepositorioSurvey;
        this.repoMasa = new RepositorioMASA;
    }


    async iniciarSurvey() {
        if(this.visao.camposEstaoVazios()){
            this.visao.exibirNotificacaoFavorPreencherOsCampos();
        } else{
            this.visao.botaoCarregamento();

            // Salvar dados do respondente localmente
            const perfil = this.visao.valorPerfil();
            const idade = this.visao.valorIdade();
            const escolaridade = this.visao.valorEscolaridade();
            const cargo = this.visao.valorCargo();
            const dados = new Respondente(perfil,idade,escolaridade,cargo);
            this.repoSurvey.salvarDadosRespondente(dados);

            // Pegar o survey (só há o de acessibilidade atitudinal)
            const survey = await this.repoMasa.buscarPerguntasAcessibilidadeAtitudinal();
            this.repoSurvey.salvarSurveyLocalmente(survey);

            // Redirecionar para survey com o token
            const token = this.repoSurvey.pegarTokenUrl();
            window.location.href = `${DOMINIO}/front/pages/survey.html?token=${token}`;
        }
    }
}