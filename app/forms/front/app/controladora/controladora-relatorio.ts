import { OPCOES } from "../modelo/enum-opcoes";
import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { CalculadorResultados } from "../util/calculador-resultados";
import { VisaoRelatorio } from "../visao/visao-relatorio";

export class ControladoraRelatorio{

    private visao: VisaoRelatorio;
    private repoMASA: RepositorioMASA;
    private calculador: CalculadorResultados;

    constructor(visao: VisaoRelatorio){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
        this.calculador = new CalculadorResultados;
    }

    async carregarRelatorioGeral(){
        try{
            const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaId(1);
            
        } catch(error: any){
            this.visao.exibirNotificacaoExcecaoErro(error.message);
        }
    }

    async carregarDadosGenericos(){
        try{
            const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaId(1); // só tem 1 pesquisa por enquanto, survey de id 1.

            const [
                titulos,
                totaisEmOrdem__DiscordoTotalmente,
                totaisEmOrdem__Discordo,
                totaisEmOrdem__NemConcordoNemDiscordo,
                totaisEmOrdem__Concordo,
                totaisEmOrdem__ConcordoTotalmente
            ] = this.calculador.calcularTotaisGeral(array) as [string[], number[], number[], number[], number[], number[]];
    
    
            const desempenhoNota = array[0].desempenho_geral;
            const desempenho = this.calculador.calcularDesempenhoGeral(desempenhoNota);
            
            this.visao.desenharGraficoGeral(titulos,totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente);
            this.visao.desenharDesempenhoGeral(desempenho,desempenhoNota);
        } catch(error: any){
            this.visao.exibirNotificacaoExcecaoErro(error.message);
        }
    }

    async filtrarRelatorio(){
        const filtro = this.visao.valorFiltro();
        this.repoMASA.pegarTotaisPorFiltro(filtro);
        //
    }
}