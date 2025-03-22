import { ControladoraDados } from "../controladora/controladora-dados";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";
import { CARGO, ESCOLARIDADE, FAIXA_ETARIA, PERFIL } from "../modelo/enums-respondente";

export class VisaoDados{

    iniciar() {
        const controladora = new ControladoraDados(this);

        const botaoConfirmar = document.getElementById('confirmar') as HTMLButtonElement;
        botaoConfirmar.addEventListener('click', (event) => {
            event.preventDefault();
            controladora.confirmar();
        })

        const botaoIniciar = document.getElementById('iniciar') as HTMLButtonElement;
        botaoIniciar.addEventListener('click', (event) => {
            event.preventDefault();
            controladora.iniciarSurvey();
        });

        const gerador = document.getElementById('gerar-token') as HTMLLinkElement;
        gerador.addEventListener('click', (event) => {
            event.preventDefault();
            controladora.gerarToken();
        });

        // Permitir apenas caracteres alfanuméricos no campo
        const inputToken = document.getElementById('token') as HTMLSelectElement;
        inputToken.addEventListener('input', () => {
            inputToken.value = inputToken.value.replace(/[^a-zA-Z0-9]/g, '');
        });

    }


    /*********
     * Modal *
     *********/
    abrirModal(){
        const botaoConfirmacao = document.getElementById('confirmar') as HTMLButtonElement;
        botaoConfirmacao.setAttribute('data-bs-toggle','modal');
        botaoConfirmacao.setAttribute('data-bs-target','#modalConfirmacao');
        botaoConfirmacao.click();
        this.confirmacaoCheckBox();
    }
    confirmacaoCheckBox(){
        const botaoIniciar = document.getElementById('iniciar') as HTMLButtonElement;
        const check = document.getElementById('confirmacao') as HTMLInputElement;
        check.addEventListener('click',() => {
        if(check.checked == true){
            botaoIniciar.removeAttribute('disabled');
        }
        else{
            botaoIniciar.setAttribute('disabled','true');
        }
        
        });
    }
    //$end



    /*******************
     * Efeitos visuais *
     ******************/
    botaoCarregamento(){
        const botaoIniciar = document.getElementById('iniciar') as HTMLButtonElement;
        botaoIniciar.setAttribute('disabled','true');
        botaoIniciar.innerHTML = 
        `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Carregando...</span>
        `;
    }
    //$end



    /****************
     * Notificações *
     ***************/
    exibirNotificacaoTokenCopiado() {
        Notificacao.exibirNotificacao(['Token copiado!'],TIPOS_NOTIFICACAO.SUCESSO);
    }
    exibirNotificacaoFavorInserirToken() {
        Notificacao.exibirNotificacao(['Favor inserir token no campo.'],TIPOS_NOTIFICACAO.INFO);
    }
    exibirNotificacaoErroGerarToken(msg: string) {
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.ERRO);
    }
    exibirNotificacaoErroTokenInvalido() {
        Notificacao.exibirNotificacao(['Token inválido. Favor inserir token válido.'],TIPOS_NOTIFICACAO.AVISO);
    }
    //$end


    /***************
     * Input Token *
     **************/
    preencherCampoToken(token: string){
        const input = document.getElementById('token') as HTMLSelectElement;
        input.value = token;
        const span = document.getElementById('token-gerado') as HTMLSpanElement;
        span.innerHTML = token;
    }
    valorToken(){
        const el = document.getElementById('token') as HTMLSelectElement;
        return el.value;
    }
    campoTokenPreenchido(): boolean{
        const s1 = document.getElementById('token') as HTMLSelectElement;
        return  (s1.value   === '' ) ? false : true;
    }
    //$end

}