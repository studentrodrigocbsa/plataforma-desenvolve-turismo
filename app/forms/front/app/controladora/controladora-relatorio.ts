import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { VisaoRelatorio } from "../visao/visao-relatorio";

export class ControladoraRelatorio{

    private visao: VisaoRelatorio;
    private repoMASA: RepositorioMASA;

    constructor(visao: VisaoRelatorio){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
    }


    async carregarDadosGenericos(){
        // Futuros programadores: podem fazer uma tela de opção p/ escolher a pesquisa p/ o relatório. Estou passando o id 1 porque é o único cadastrado no BD.
        // daí, por óbvio, verifiquem antes se o id existe no BD e é equivalente ao escolhido... então pegar.
        const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaId(1); // só tem 1 pesquisa por enquanto, survey de id 1.
        
    }

    async filtrarRelatorio(){
        ///// aos futuros programadores: aqui é mais interessante criar um gestor de rotas. A ideia é que ao passar o id do "survey" selecionado para gerar o relatório, chamar a rota correspondente no BD com o filtro, praquele survey.
        ///// opção 2: criar rotas genéricas passando o id do survey e deixar o backend se virar. (é uma boa)
        //const filtro = this.visao.valorFiltro();

    }
}