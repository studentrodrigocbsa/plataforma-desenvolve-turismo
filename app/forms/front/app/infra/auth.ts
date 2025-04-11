import { API } from "https://bsi.cefet-rj.br/masa/front/app/infra/api.ts";

export async function isLogado()
{
    const response = await fetch(`${API}/logado`, { method: 'get', headers:{ 'ngrok-skip-browser-warning': 'skip it'}, credentials:'include' } );
    const text = await response.text();
    console.log("resposta autenticacao",text);
    if(response.status >= 400){
        return false;
    }
    return true;
}