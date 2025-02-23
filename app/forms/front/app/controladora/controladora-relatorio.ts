import { OPCOES } from "../modelo/enum-opcoes";
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


        const array = await this.repoMASA.pegarTotaisPorEscolhaDaPesquisaId(1); // só tem 1 pesquisa por enquanto, survey de id 1.

        const totaisEmOrdem__DiscordoTotalmente: number[] = [];
        const totaisEmOrdem__Discordo: number[] = [];
        const totaisEmOrdem__NemConcordoNemDiscordo: number[] = [];
        const totaisEmOrdem__Concordo: number[] = [];
        const totaisEmOrdem__ConcordoTotalmente: number[] = [];
        const titulos = new Set<string>();
        array.map(mp => mp.titulo).filter(titulo => {
            if(titulos.has(titulo)){
                return false;
            }
            titulos.add(titulo);
            return true;
        });
        const opcoes = new Set<string>();
        array.map(mp => mp.opcao).filter(opcao => {
            if(opcoes.has(opcao)){
                return false;
            }
            opcoes.add(opcao);
            return true;
        });
        titulos.forEach(titulo => {
            array.forEach(pergunta => {
                opcoes.forEach(opcao => {
                    if(pergunta.titulo === titulo){
                        if(pergunta.opcao === opcao && pergunta.opcao === OPCOES.DISCORDO_TOTALMENTE)
                            totaisEmOrdem__DiscordoTotalmente.push(Number(pergunta.votos));
                        else if(pergunta.opcao === opcao && pergunta.opcao === OPCOES.DISCORDO)
                            totaisEmOrdem__Discordo.push(Number(pergunta.votos));
                        else if(pergunta.opcao === opcao && pergunta.opcao === OPCOES.NEMCONCORDO_NEMDISCORDO)
                            totaisEmOrdem__NemConcordoNemDiscordo.push(Number(pergunta.votos));
                        else if(pergunta.opcao === opcao && pergunta.opcao === OPCOES.CONCORDO)
                            totaisEmOrdem__Concordo.push(Number(pergunta.votos));
                        else if(pergunta.opcao === opcao && pergunta.opcao === OPCOES.CONCORDO_TOTALMENTE)
                            totaisEmOrdem__ConcordoTotalmente.push(Number(pergunta.votos));
                    }
                });
            });
        });
        
        //console.log(Array.from(titulos),totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente);
        this.visao.desenharGraficoGeral(Array.from(titulos),totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente);
    }

    async filtrarRelatorio(){
        //const filtro = this.visao.valorFiltro();

    }
}