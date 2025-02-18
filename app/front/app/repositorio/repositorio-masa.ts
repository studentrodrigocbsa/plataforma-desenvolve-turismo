import { API } from '../infra/API';

export class RepositorioMASA{

    async buscarPerguntasAcessibilidadeAtitudinal() {
        const response = await fetch( `${API}/masa/aa`, { method: 'get' } );
        const text = await response.text();
        console.log('RESPOSTA BACKEND raw',text);
        if(response.status >= 400){
            console.log(text);
            throw new Error(text);
        }
        return JSON.parse(text);
    }

}