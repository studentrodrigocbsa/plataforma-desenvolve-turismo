import { API } from './API';

export class Redirect{
    static async redirectToRelatorio(){
        await fetch( `${API}/redirect/to/relatorio`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
    }
    static async redirectToSurvey(){
        await fetch( `${API}/redirect/to/survey`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
    }
}