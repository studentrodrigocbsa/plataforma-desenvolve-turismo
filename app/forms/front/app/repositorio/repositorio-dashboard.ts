import { API } from "../infra/api";
import { Link } from "../modelo/link";


export class RepositorioDashboard{
    
    async gerarToken(): Promise<{token: string}> {
        const response = await fetch(`${API}/dashboard/novo/token`, { method: 'get', credentials:'include' } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async todosTokensLinks(): Promise<Array<Link>> {
        const response = await fetch(`${API}/dashboard/tokens`, { method: 'get', credentials:'include' } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

}