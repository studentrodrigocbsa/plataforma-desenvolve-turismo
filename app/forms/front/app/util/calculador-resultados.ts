import { OPCOES } from "../modelo/enum-opcoes";

export class CalculadorResultados{

    calcularMediaPergunta(totalDiscordoTotalmente: number, totalDiscordo: number, totalNemConcordoNemDiscordo: number, totalConcordo: number, totalConcordoTotalmente: number) {
        return (totalDiscordoTotalmente * 1 + totalDiscordo * 2 + totalNemConcordoNemDiscordo * 3 + totalConcordo * 4 + totalConcordoTotalmente * 5) / (totalDiscordoTotalmente + totalDiscordo + totalNemConcordoNemDiscordo + totalConcordo + totalConcordoTotalmente);
    }

    calcularDesempenhoGeral(notaGeral: number): string{
        if(notaGeral < 2){
            return "O desempenho geral dos pesquisados foi muito alto! 😊";
        }
        if(notaGeral >= 2 && notaGeral < 3){
            return "O desempenho geral dos pesquisados foi alto! 😀";
        }
        if(notaGeral >= 3 && notaGeral < 4){
            return "O desempenho geral dos pesquisados foi moderado. 😯";
        }
        if(notaGeral >= 4 && notaGeral < 5){
            return "O desempenho geral dos pesquisados foi baixo. 🙁";
        }
        return "O desempenho geral dos pesquisados foi muito baixo. 😢"; // >=5
    }

    calcularTotaisGeral(array: [{titulo: string, opcao: string, votos: number, desempenho_geral: number}]){

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

        return [Array.from(titulos),totaisEmOrdem__DiscordoTotalmente,totaisEmOrdem__Discordo,totaisEmOrdem__NemConcordoNemDiscordo,totaisEmOrdem__Concordo,totaisEmOrdem__ConcordoTotalmente];
    }
}