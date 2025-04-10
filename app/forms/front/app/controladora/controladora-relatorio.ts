import { RepositorioMASA } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-masa.ts";
import { RepositorioSurvey } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-survey.ts";
import { CalculadorResultados } from "https://bsi.cefet-rj.br/masa/front/app/util/calculador-resultados.ts";
import { VisaoRelatorio } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-relatorio.ts";

export class ControladoraRelatorio{

    private visao: VisaoRelatorio;
    private repoMASA: RepositorioMASA;
    private calculador: CalculadorResultados;
    private repoSurvey: RepositorioSurvey;

    constructor(visao: VisaoRelatorio){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
        this.calculador = new CalculadorResultados;
        this.repoSurvey = new RepositorioSurvey;
    }

    calcularMediaPergunta(
        totalDiscordoTotalmente: number, 
        totalDiscordo: number, 
        totalNemConcordoNemDiscordo: number, 
        totalConcordo: number, 
        totalConcordoTotalmente: number
    ) {
        return this.calculador.calcularMediaPergunta(
            totalDiscordoTotalmente,
            totalDiscordo,
            totalNemConcordoNemDiscordo,
            totalConcordo,
            totalConcordoTotalmente
        );
    }

    async carregarTabelaDesempenhoPorPergunta(){
        try{
            const token = this.repoSurvey.pegarTokenUrl();
            const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaIdComToken(1,token); // só tem 1 pesquisa por enquanto, survey de id 1.
            const [
                titulos,
                totaisEmOrdem__DiscordoTotalmente,
                totaisEmOrdem__Discordo,
                totaisEmOrdem__NemConcordoNemDiscordo,
                totaisEmOrdem__Concordo,
                totaisEmOrdem__ConcordoTotalmente
            ] = this.calculador.calcularTotaisGeral(array) as [string[], number[], number[], number[], number[], number[]];
            this.visao.desenharTabelaMediasGeraisRelatorio(
                titulos,
                totaisEmOrdem__DiscordoTotalmente,
                totaisEmOrdem__Discordo,
                totaisEmOrdem__NemConcordoNemDiscordo,
                totaisEmOrdem__Concordo,
                totaisEmOrdem__ConcordoTotalmente
            );
        } catch(error: any){
            this.visao.dadosIndisponiveis();
        }
    }

    async carregarTotaisGrafico(){
        try{
            const token = this.repoSurvey.pegarTokenUrl();
            const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaIdComToken(1,token); // só tem 1 pesquisa por enquanto, survey de id 1.

            const [
                titulos,
                totaisEmOrdem__DiscordoTotalmente,
                totaisEmOrdem__Discordo,
                totaisEmOrdem__NemConcordoNemDiscordo,
                totaisEmOrdem__Concordo,
                totaisEmOrdem__ConcordoTotalmente
            ] = this.calculador.calcularTotaisGeral(array) as [string[], number[], number[], number[], number[], number[]];
    
    
            //console.log(titulos,totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente);
            this.visao.desenharGraficoGeral(titulos,totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente);
        } catch(error: any){
            this.visao.dadosIndisponiveis();
        }
    }


    feedbackSemaforo(maior: number, totais: number[], totalMuitoBom: number, totalBom: number, totalNeutro: number, totalRuim: number, totalMuitoRuim: number) {
        const feedback = this.calculador.calcularFeedbackSemaforo(maior,totais,totalMuitoBom,totalBom,totalNeutro,totalRuim,totalMuitoRuim);
        this.visao.escreverFeedbackNaTelaSemaforo(feedback.key, feedback.value);
    }

}