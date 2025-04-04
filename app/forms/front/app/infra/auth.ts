import { API } from "./api";
import { DOMINIO } from "./domain";

export async function isLogado()
{
    const response = await fetch(`${API}/logado`, { method: 'get', headers:{"Origin":DOMINIO}, credentials:'include' } );
    const text = await response.text();
    console.log("resposta autenticacao",text);
    if(response.status >= 400){
        return false;
    }
    return true;
}