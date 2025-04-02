import { OPCOES } from "../modelo/enum-opcoes";

export class CalculadorResultados{

    calcularMediaPergunta(totalDiscordoTotalmente: number, totalDiscordo: number, totalNemConcordoNemDiscordo: number, totalConcordo: number, totalConcordoTotalmente: number) {
        return ((totalDiscordoTotalmente * 1 + totalDiscordo * 2 + totalNemConcordoNemDiscordo * 3 + totalConcordo * 4 + totalConcordoTotalmente * 5) / (totalDiscordoTotalmente + totalDiscordo + totalNemConcordoNemDiscordo + totalConcordo + totalConcordoTotalmente)).toFixed(2);
    }

    calcularDesempenhoGeral(notaGeral: number): string{
        if(notaGeral < 2){
            return "O desempenho geral dos pesquisados foi muito alto! 😀";
        }
        if(notaGeral >= 2 && notaGeral < 3){
            return "O desempenho geral dos pesquisados foi alto! 😊";
        }
        if(notaGeral >= 3 && notaGeral < 4){
            return "O desempenho geral dos pesquisados foi moderado. 😯";
        }
        if(notaGeral >= 4 && notaGeral < 5){
            return "O desempenho geral dos pesquisados foi baixo. 🙁";
        }
        return "O desempenho geral dos pesquisados foi muito baixo. 😢"; // >=5
    }

    calcularTotaisGeral(array: { titulo: string, opcao: string, votos: number, desempenho_geral: number }[]) {
        //console.log(array);
    
        const totaisEmOrdem__DiscordoTotalmente: number[] = [];
        const totaisEmOrdem__Discordo: number[] = [];
        const totaisEmOrdem__NemConcordoNemDiscordo: number[] = [];
        const totaisEmOrdem__Concordo: number[] = [];
        const totaisEmOrdem__ConcordoTotalmente: number[] = [];
    
        // Obtem títulos únicos
        const titulos = Array.from(new Set(array.map(pergunta => pergunta.titulo)));
    
        // Cria um mapa de perguntas <opcao,votos>
        const perguntasMap = new Map<string, Record<string, number>>();
        // preenche com zeros inicialmente
        array.forEach(pergunta => {
            if (!perguntasMap.has(pergunta.titulo)) {
                perguntasMap.set(pergunta.titulo, {
                    [OPCOES.DISCORDO_TOTALMENTE]: 0,
                    [OPCOES.DISCORDO]: 0,
                    [OPCOES.NEMCONCORDO_NEMDISCORDO]: 0,
                    [OPCOES.CONCORDO]: 0,
                    [OPCOES.CONCORDO_TOTALMENTE]: 0
                });
            }
            // Altera naquele que tiver votos
            perguntasMap.get(pergunta.titulo)![pergunta.opcao] = pergunta.votos;
        });
    
        // Preenche os arrays de saída (6 arrays de 15 posições)
        titulos.forEach(titulo => {
            const votos = perguntasMap.get(titulo) || {
                [OPCOES.DISCORDO_TOTALMENTE]: 0,
                [OPCOES.DISCORDO]: 0,
                [OPCOES.NEMCONCORDO_NEMDISCORDO]: 0,
                [OPCOES.CONCORDO]: 0,
                [OPCOES.CONCORDO_TOTALMENTE]: 0
            };
    
            totaisEmOrdem__DiscordoTotalmente.push(votos[OPCOES.DISCORDO_TOTALMENTE]);
            totaisEmOrdem__Discordo.push(votos[OPCOES.DISCORDO]);
            totaisEmOrdem__NemConcordoNemDiscordo.push(votos[OPCOES.NEMCONCORDO_NEMDISCORDO]);
            totaisEmOrdem__Concordo.push(votos[OPCOES.CONCORDO]);
            totaisEmOrdem__ConcordoTotalmente.push(votos[OPCOES.CONCORDO_TOTALMENTE]);
        });
    
        return [
            titulos,
            totaisEmOrdem__DiscordoTotalmente,
            totaisEmOrdem__Discordo,
            totaisEmOrdem__NemConcordoNemDiscordo,
            totaisEmOrdem__Concordo,
            totaisEmOrdem__ConcordoTotalmente
        ];
    }
}