import { ControladoraLogin } from "../controladora/controladora-login";
import { DOMINIO } from "../infra/domain";
import { Notificacao, TIPOS_NOTIFICACAO } from "../util/notificacao";


export class VisaoLogin{

    iniciar(){

        const controladora = new ControladoraLogin(this);

        const botao = document.getElementById('logar') as HTMLButtonElement;
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            if(!this.camposEstaoVazios())
                controladora.acaoDeLogin();
        });

        const cadastrar = document.getElementById('botao-convite-cadastro') as HTMLButtonElement;
        cadastrar.addEventListener('click', (e) => {
            e.preventDefault();
            controladora.carregarControlesDeCadastro();
        });


        // impedir caracteres não alfanuméricos
        const inputUsuario = document.getElementById('usuario') as HTMLInputElement;
        inputUsuario.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
        });
        const inputSenha = document.getElementById('senha') as HTMLInputElement;
        inputSenha.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
        });
    }


    desenharTelaCadastro(){
        const corpo = document.getElementById('conteudo') as HTMLDivElement;
        corpo.innerHTML =
        `
        <div class="container">
            <div class="row mt-6">
                <div class="col-sm-12">
                    <h6>Para criar uma conta é simples: basta inserir um usuário e uma senha!</h6>
                    <form action="">
                        <div class="input-style-1">
                            <input autocomplete="username" id="usuario" name="usuario" type="text" placeholder="Insira aqui o seu usuário..." required/>
                        </div>
                        <div class="input-style-1">
                            <input autocomplete="current-password" id="senha" name="senha" type="password" placeholder="Insira aqui a sua senha..." required/>
                        </div>
                        <div class="button-group d-flex justify-content-center flex-wrap">
                            <button name="Cadastrar" class="btn btn-info btn-hover w-100 text-center" id="cadastrar">
                            Cadastrar
                            </button>
                            <a type="button" class="btn btn-light btn-hover w-100 text-center mt-2" href="${DOMINIO}/front/pages/Login.html">
                            Voltar p/ Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
        document.getElementById('cadastrar')?.addEventListener('click', (e) => {
            e.preventDefault();
            if(!this.camposEstaoVazios()){
                const controladora = new ControladoraLogin(this);
                controladora.acaoDeCadastro();
            }
        });
    }


    /**
     * Dados
     */
    pegarUsuario(): string{
        return (document.getElementById('usuario') as HTMLInputElement).value;
    }
    pegarSenha(): string{
        return (document.getElementById('senha') as HTMLInputElement).value;
    }
    camposEstaoVazios(){
        return ( (document.getElementById('senha') as HTMLInputElement).value == '' || (document.getElementById('usuario') as HTMLInputElement).value == '' );
    }


    /**
     * Notificações
     */
    exibirNotificacaoErroExcecaoMensagem(message: string): void{
        Notificacao.exibirNotificacao([message], TIPOS_NOTIFICACAO.ERRO);
    }
    exibirNotificacaoErroExcecaoLogin(): void{
        Notificacao.exibirNotificacao(["Ocorreu um erro interno grave e não foi possível concluir a ação."], TIPOS_NOTIFICACAO.ERRO);
    }
    exibirNotificacaoSucessoCadastro(mensagem: string): void{
        Notificacao.exibirNotificacao([mensagem], TIPOS_NOTIFICACAO.SUCESSO);
    }
    exibirNotificacaoErroLogin(mensagem: string): void{
        Notificacao.exibirNotificacao([mensagem], TIPOS_NOTIFICACAO.ERRO);
    }

}