export const COMPRIMENTO_TOKEN = 30;

export class Token{

    static gerarToken(): string{
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for(let i = 0; i < COMPRIMENTO_TOKEN; i++){
            token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return token;
    }
}