import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { VisaoRelatorio } from "../visao/visao-relatorio";

export class ControladoraRelatorio{

    private visao: VisaoRelatorio;
    private repoMASA: RepositorioMASA;

    constructor(visao: VisaoRelatorio){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
    }


    async carregarRelatorio(){
        const dados = await this.repoMASA.pegarDadosPesquisaId(1); // só tem 1 pesquisa por enquanto, survey de id 1.
        
    }
}