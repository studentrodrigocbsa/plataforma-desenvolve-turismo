import { DOMAIN } from "../infra/DOMAIN";
import { COMPRIMENTO_TOKEN, Token } from "../infra/token";
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


    iniciarSurvey() {

        if ( this.visao.campoTokenPreenchido() === false ) {

            this.visao.exibirNotificacaoFavorInserirToken();

        } else {
            const token = this.visao.valorToken();

            if(this.tokenInvalido(token) === false){
                this.visao.botaoCarregamento();

                this.repoSurvey.salvarDadosRespondente(new Respondente(token));
            
                window.location.href = `${DOMAIN}/front/pages/survey.html`;
            }
            else{
                this.visao.exibirNotificacaoErroTokenInvalido();
            }
        }
    }

    gerarToken(){
        try{
            const token = Token.gerarToken();
            this.visao.preencherCampoToken(token);
        } catch(e:any){
            this.visao.exibirNotificacaoErroGerarToken(e.message);
        }
    }

    tokenInvalido(token: string): boolean{
        // verificar se token possui apenas caracteres alfanuméricos e se é inválido
        const regex = /^[a-zA-Z0-9]{30}$/;
        if(regex.test(token) === false){
            console.log('Token inválido');
            return true;
        }
        if(token.length > COMPRIMENTO_TOKEN || token.length < COMPRIMENTO_TOKEN){
            return true;
        }
        return false;
    }

    confirmar(){
        // Validar Token
        if(this.visao.campoTokenPreenchido()) {
            const token = this.visao.valorToken();
            if(this.tokenInvalido(token) === true){
                this.visao.exibirNotificacaoErroTokenInvalido();
                return;
            }
            this.visao.preencherCampoToken(token);
            this.visao.abrirModal();
            return;
        } else{
            this.visao.exibirNotificacaoFavorInserirToken();
        }
    }
}