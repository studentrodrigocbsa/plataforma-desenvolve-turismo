import { API } from "./api";

export async function isLogado()
{
    const response = await fetch(`${API}/logado`, { method: 'get', credentials:'include' } );
    const text = await response.text();
    console.log("resposta autenticacao",text);
    if(response.status >= 400){
        return false;
    }
    return true;
}