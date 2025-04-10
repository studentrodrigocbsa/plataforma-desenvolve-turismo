import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";
import { Respondente } from "https://bsi.cefet-rj.br/masa/front/app/modelo/respondente.ts";
import { RepositorioMASA } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-masa.ts";
import { RepositorioSurvey } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-survey.ts";
import { VisaoDados } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-dados.ts";

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
            window.location.href = `${DOMINIO}front/pages/survey.html?token=${token}`;
        }
    }
}