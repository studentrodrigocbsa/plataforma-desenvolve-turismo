export class Link{
    id: number;
    token: string;
    
    constructor( id = 0, link = ''){
        this.id = id;
        this.token = link;
    }
}