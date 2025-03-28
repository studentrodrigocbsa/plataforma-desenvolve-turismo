import { API } from '../infra/API';
import { Respondente } from '../modelo/respondente';

export class RepositorioMASA{

    async pegarTotaisPorFiltro(filtro: string): Promise<[{titulo: string, opcao: string, votos: number, desempenho_geral: number}]> {
        const response = await fetch( `${API}/masa/aa/filtro?filtro=${filtro}`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
        const text = await response.text();
        //console.log('RESPOSTA BACKEND raw',text);
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async pegarTotaisPorEscolhaDaPesquisaId(id: number): Promise<[{titulo: string, opcao: string, votos: number, desempenho_geral: number}]> {
        const response = await fetch( `${API}/masa/generic/resultados?id=${id}`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
        const text = await response.text();
        //console.log('RESPOSTA BACKEND raw',text);
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async buscarPerguntasAcessibilidadeAtitudinal() {
        const response = await fetch( `${API}/masa/aa`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
        console.log(response);
        const text = await response.text();
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async enviar(survey: [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}], respondente: Respondente){
        const dados = [survey,respondente];
        const response = await fetch(`${API}/masa/aa`, { method: 'post', body: JSON.stringify(dados), headers: {'Content-Type': 'application/json', 'ngrok-skip-browser-warning':'yoloo'} } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

}