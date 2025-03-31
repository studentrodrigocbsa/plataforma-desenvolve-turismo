import { API } from "../infra/API";
import { Login } from "../modelo/login";


export class RepositorioUsuario {
    
    async login(user: Login){
        const response = await fetch(`${API}/login`, { method: 'post', body: JSON.stringify(user), headers: {'Content-Type': 'application/json'}, credentials:'include'  } );

        const text = await response.text();
        console.log("Resposta do Backend:",text);

        if (response.status >= 400) {
            throw new Error(text);
        }

        return JSON.parse(text);
    }

}