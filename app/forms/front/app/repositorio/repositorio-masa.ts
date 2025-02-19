import { API } from '../infra/API';
import { Respondente } from '../modelo/respondente';

export class RepositorioMASA{

    async pegarDadosPesquisaId(id: number) {
        const response = await fetch( `${API}/masa/resultados?id=${id}`, { method: 'get' } );
        const text = await response.text();
        console.log('RESPOSTA BACKEND raw',text);
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async buscarPerguntasAcessibilidadeAtitudinal() {
        const response = await fetch( `${API}/masa/aa`, { method: 'get' } );
        const text = await response.text();
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

    async enviar(survey: [{titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}], respondente: Respondente){
        const dados = [survey,respondente];
        const response = await fetch(`${API}/masa/aa`, { method: 'post', body: JSON.stringify(dados), headers: {'Content-Type': 'application/json'} } );
        const text = await response.text();
        if(response.status >= 400){
            throw new Error(text);
        }
        return JSON.parse(text);
    }

}