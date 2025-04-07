import { API } from "../infra/api";
import { Login } from "../modelo/login";


export class RepositorioUsuario {
    
    async login(user: Login){
        const response = await fetch(`${API}/api/login`, { method: 'post', body: JSON.stringify(user), headers: {'Content-Type': 'application/json', 'ngrok-skip-browser-warning':'skip it'}, credentials:'include'  } );

        const text = await response.text();
        console.log("Resposta do Backend:",text);

        if (response.status >= 400) {
            throw new Error(text);
        }

        return JSON.parse(text);
    }

    async cadastro(user: Login){
        const response = await fetch(`${API}/api/cadastro/usuario`, { method: 'post', body: JSON.stringify(user), headers: {'Content-Type': 'application/json', 'ngrok-skip-browser-warning':'skip it'}, credentials:'include'  } );

        const text = await response.text();
        console.log("Resposta do Backend:",text);

        if (response.status >= 400) {
            throw new Error(text);
        }

        return JSON.parse(text);
    }

}