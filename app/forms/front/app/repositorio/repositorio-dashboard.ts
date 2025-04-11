import { API } from "https://bsi.cefet-rj.br/masa/front/app/infra/api.ts";
import { Link } from "https://bsi.cefet-rj.br/masa/front/app/modelo/link.ts";


export class RepositorioDashboard{
    
    async gerarToken(): Promise<{token: string}> {
        const response = await fetch(`${API}/dashboard/novo/token`, { method: 'get', headers:{'ngrok-skip-browser-warning':'skip it'}  } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async todosTokensLinks(): Promise<Array<Link>> {
        const response = await fetch(`${API}/dashboard/tokens`, { method: 'get',headers:{'ngrok-skip-browser-warning':'skip it'}  } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

}