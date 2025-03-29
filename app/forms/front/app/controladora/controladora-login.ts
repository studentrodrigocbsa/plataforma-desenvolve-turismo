import { RepositorioUsuario } from "../repositorio/repositorio-usuario";
import { Login } from "../modelo/login";
import { VisaoLogin } from "../visao/visao-login";
import { TIPOS_NOTIFICACAO } from "../util/notificacao";
import { DOMINIO } from "../infra/Dominio";

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
            if(resposta === true){
                window.location.href = `${DOMINIO}/front/pages/dashboard.html`;
            }
        } catch(error: any){
            console.log(error);
        }
        
    }
}