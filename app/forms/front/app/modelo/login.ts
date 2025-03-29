export class Login{
    id: number;
    usuario: string;
    senha: string;
    
    constructor( id = 0, usuario = '', senha = ''){
        this.id = id;
        this.usuario = usuario;
        this.senha = senha;
    }
}