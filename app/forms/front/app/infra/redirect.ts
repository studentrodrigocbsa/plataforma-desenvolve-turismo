import { API } from './api';

export class Redirect{
    static async redirectToRelatorio(){
        await fetch( `${API}/api/redirect/to/relatorio`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
    }
    static async redirectToSurvey(){
        await fetch( `${API}/api/redirect/to/survey`, { method: 'get', headers: {'ngrok-skip-browser-warning':'skip it'} } );
    }
}