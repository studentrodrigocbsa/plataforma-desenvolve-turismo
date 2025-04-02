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
        });

        const cadastrar = document.getElementById('cadastrar') as HTMLButtonElement;
        cadastrar.addEventListener('click', (e) => {
            Notificacao.exibirNotificacao(["Aplicativo de demonstração. Insira o login fornecido."],TIPOS_NOTIFICACAO.AVISO);
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



    pegarUsuario(): string{
        return (document.getElementById('usuario') as HTMLInputElement).value;
    }
    pegarSenha(): string{
        return (document.getElementById('senha') as HTMLInputElement).value;
    }
    
    exibirNotificacaoErroDeLogin(): void{
        Notificacao.exibirNotificacao(["Insira o login de demonstração fornecido."], TIPOS_NOTIFICACAO.ERRO);
    }
    camposEstaoVazios(){
        return ( (document.getElementById('senha') as HTMLInputElement).value == '' || (document.getElementById('usuario') as HTMLInputElement).value == '' );
    }

}