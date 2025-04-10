import { API } from "https://bsi.cefet-rj.br/masa/front/app/infra/api.ts";
import { Login } from "https://bsi.cefet-rj.br/masa/front/app/modelo/login.ts";


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
            const parsed = JSON.parse(text);
            if (parsed.message) {
                throw new Error(parsed.message);
            }
        }

        return JSON.parse(text);
    }

}