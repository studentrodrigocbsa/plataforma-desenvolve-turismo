import { ControladoraLogin } from "../controladora/controladora-login";
import { Notificacao, TIPOS_NOTIFICACAO } from "../util/notificacao";


export class VisaoLogin{

    iniciar(){

        const controladora = new ControladoraLogin(this);

        const botao = document.getElementById('logar') as HTMLButtonElement;
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            if(!this.camposEstaoVazios())
                controladora.acaoDeLogin();
            else
                this.exibirNotificacao(["Aplicativo de demonstração. Preencha os campos com qualquer dado."],TIPOS_NOTIFICACAO.AVISO);
        });

        const cadastrar = document.getElementById('cadastrar') as HTMLButtonElement;
        cadastrar.addEventListener('click', (e) => {
            this.exibirNotificacao(["Aplicativo de demonstração. Cadastro indisponível no momento."],TIPOS_NOTIFICACAO.AVISO);
        });
    }



    pegarUsuario(): string{
        return (document.getElementById('usuario') as HTMLInputElement).value;
    }
    pegarSenha(): string{
        return (document.getElementById('senha') as HTMLInputElement).value;
    }
    exibirNotificacao(mensagens: Array<string>, tipo: TIPOS_NOTIFICACAO): void{
        Notificacao.exibirNotificacao(mensagens, tipo);
    }
    camposEstaoVazios(){
        return ( (document.getElementById('senha') as HTMLInputElement).value == '' || (document.getElementById('usuario') as HTMLInputElement).value == '' );
    }

}