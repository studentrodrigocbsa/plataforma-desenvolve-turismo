import { API } from "../infra/API";
import { Login } from "../modelo/login";


export class RepositorioUsuario {
    
    async login(user: Login){
        console.log(user);
        return true;
    }

}