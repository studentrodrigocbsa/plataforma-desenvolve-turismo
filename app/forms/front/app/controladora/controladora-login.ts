import { RepositorioUsuario } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-usuario.ts";
import { Login } from "https://bsi.cefet-rj.br/masa/front/app/modelo/login.ts";
import { VisaoLogin } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-login.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";

export class ControladoraLogin{

    visao   : VisaoLogin;
    repo    : RepositorioUsuario;

    constructor(visao: VisaoLogin){
        this.visao = visao;
        this.repo = new RepositorioUsuario();
    }

    async acaoDeLogin(){
        try{
            const usuario = this.visao.pegarUsuario();
            const senha = this.visao.pegarSenha();
            
            const login = new Login(0,usuario,senha);
            const resposta = await this.repo.login(login);
            if(resposta.success === false){
                this.visao.exibirNotificacaoErroLogin(resposta.message);
            } else{
                window.location.href = `${DOMINIO}/front/pages/dashboard.html`;
            }
        } catch(error: any){
            console.log(error);
            this.visao.exibirNotificacaoErroExcecaoLogin();
        }
        
    }

    carregarControlesDeCadastro(){
        this.visao.desenharTelaCadastro();
    }

    async acaoDeCadastro(){
        try{
            const usuario = this.visao.pegarUsuario();
            const senha = this.visao.pegarSenha();
            
            const login = new Login(0,usuario,senha);
            const resposta = await this.repo.cadastro(login);
            if(resposta.success === false){
                this.visao.exibirNotificacaoErroLogin(resposta.message);
            } else{
                this.visao.exibirNotificacaoSucessoCadastro(resposta.message);
            }
        } catch(error: any){
            console.log('Mensagem de erro: ',error.message);
            this.visao.exibirNotificacaoErroExcecaoMensagem(error.message);
        }
        
    }
}