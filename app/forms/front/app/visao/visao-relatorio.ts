//import { Chart } from "chart.js/auto";
import { Chart } from "https://bsi.cefet-rj.br/masa/node_modules/.pnpm/chart.js@4.4.8/node_modules/chart.js/auto/auto";
import { ControladoraRelatorio } from "https://bsi.cefet-rj.br/masa/front/app/controladora/controladora-relatorio.ts";
import { OPCOES } from "https://bsi.cefet-rj.br/masa/front/app/modelo/enum-opcoes.ts";
import { Notificacao, TIPOS_NOTIFICACAO } from "https://bsi.cefet-rj.br/masa/front/app/util/notificacao.ts";

export class VisaoRelatorio{

    iniciar(){
        const controladora = new ControladoraRelatorio(this);

        // this.loadSpinner();
        
        controladora.carregarTotaisGrafico();
        controladora.carregarTabelaDesempenhoPorPergunta();

        // this.loadSpinnerDispense();
    }

    dadosIndisponiveis(){
        const body = document.querySelector('body');
        if(body)
            body.innerHTML = `Não há dados associados a este link.`;
    }

    exibirNotificacaoExcecaoErro(msg: string){
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.ERRO);
    }


    desenharGraficoGeral(titulos: string[], totaisDiscordoTotalmente: number[], totaisDiscordo: number[], totaisNemConcordoNemDiscordo: number[], totaisConcordo: number[], totaisConcordoTotalmente: number[]){
        const canvas = document.getElementById('grafico-total-geral') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if(ctx){

            /*
            const doubleLabels = {
                id: 'doubleLabels',
                afterDatasetsDraw(chart: any,args: any,plugins: any){
                    console.log('called!');
                    const {ctx, data} = chart;

                    ctx.save();

                    const totalSum = data.datasets[0].data.reduce((sum: number,currentValue: number) => {
                        return sum + currentValue
                    }, 0);

                    chart.getDatasetMeta(0).data.forEach((dataPoint: any, index: number) => {
                        ctx.textAlign = 'right';
                        ctx.font = 'bold 12px sans-serif';
                        ctx.fillStyle = 'black';
                        ctx.fillText(data.datasets[0].data[index] as string, dataPoint.x, dataPoint.y);

                        const percentage = data.dataset[0].data[index] / totalSum * 100;
                        ctx.textAlign = 'left';
                        ctx.font = 'bold 15px sans-serif';
                        ctx.fillStyle = data.datasets[0].borderColor[index];
                        ctx.fillText(`${percentage.toFixed(2)}`,dataPoint.x,dataPoint.y);
                    });
                }
            }
            */

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: titulos,
                    datasets: [
                        {
                            label: OPCOES.DISCORDO_TOTALMENTE,
                            data: totaisDiscordoTotalmente,
                            backgroundColor: 'rgba(111, 255, 0, 0.59)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.DISCORDO,
                            data: totaisDiscordo,
                            backgroundColor: 'rgba(0, 255, 234, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.NEMCONCORDO_NEMDISCORDO,
                            data: totaisNemConcordoNemDiscordo,
                            backgroundColor: 'rgba(255, 234, 0, 0.69)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.CONCORDO,
                            data: totaisConcordo,
                            backgroundColor: 'rgba(255, 115, 0, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.CONCORDO_TOTALMENTE,
                            data: totaisConcordoTotalmente,
                            backgroundColor: 'rgba(255, 4, 4, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    devicePixelRatio: 4,
                    responsive: false,
                    maintainAspectRatio: true,
                    indexAxis: 'y',
                    plugins: {
                        title: {
                          display: true,
                          text: 'Gráfico Geral - Escolhas por pergunta'
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        },
                        y: {
                          stacked: true,
                          ticks: {
                            font:{
                                
                            }
                          }
                        }
                    }
                },
                //plugins: [doubleLabels]
            });


        }
    }



    /*********************
     *                  *
     *      feedbacks   *
     *                  -
     ********************/
    escreverFeedbackNaTelaSemaforo(key: string, value: string) {
        const div = document.getElementById('semaforo') as HTMLElement;
        div.innerHTML =
        `
        <div class="alert alert-${key} d-flex align-items-center" role="alert" >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle m-4"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>             
            <p>${value}</p>
        </div>
        
        `;
    }



    /****************************************************
     *                                                  *
     * 
     *          TABELA DE DESEMPENHO POR PERGUNTA       *
     * 
     *                                                  *
     ***************************************************/
    desenharTabelaMediasGeraisRelatorio(titulos: string[], totaisDiscordoTotalmente: number[], totaisDiscordo: number[], totaisNemConcordoNemDiscordo: number[], totaisConcordo: number[], totaisConcordoTotalmente: number[]){
        const tbody = document.querySelector('tbody');
        if(tbody){
            tbody.innerHTML = '';

            const fragmento = document.createDocumentFragment();
            for(let i = 0; i < titulos.length; i++){
                const controladora = new ControladoraRelatorio(this);
                const media = controladora.calcularMediaPergunta(
                    totaisDiscordoTotalmente[i] ?? 0,
                    totaisDiscordo[i] ?? 0,
                    totaisNemConcordoNemDiscordo[i] ?? 0,
                    totaisConcordo[i] ?? 0,
                    totaisConcordoTotalmente[i] ?? 0);
                const linha = this.criarLinha(
                    titulos[i],
                    totaisDiscordoTotalmente[i] ?? 0,
                    totaisDiscordo[i] ?? 0,
                    totaisNemConcordoNemDiscordo[i] ?? 0,
                    totaisConcordo[i] ?? 0,
                    totaisConcordoTotalmente[i] ?? 0,
                    media.toFixed(2));
                fragmento.append(linha);
            }
            tbody.append(fragmento);
            this.criarLinhaTotaltfoot();
        }
    }


    /**
     * 
     * Retorna um ponto flutuante representando o total numa coluna dado o seletor
     */
    calcularTotalColuna(seletor: string){
        const a = document.querySelectorAll(seletor) as NodeListOf<HTMLTableCellElement>;
        let t = 0;
    
        a.forEach(celula => {
            t += parseFloat(celula.textContent ?? '0');
        });

        return t;
    }


    /**
     * 
     * Cria uma linha no tfoot com a soma dos totais por classe e retorna.
     * 
     * Chama criarCelula, calcularTotaisMedia e calcularTotais.
     * 
     */
    criarLinhaTotaltfoot(){
        const tfoot = document.querySelector('tfoot');
        if(tfoot){
            const tr = document.createElement('tr');
            const celulaTotal = this.criarCelula('Total', 'table-destaque-cinza');
            const totais = [];
            const totalMuitoBom = this.calcularTotalColuna('.qtd1');
            const totalBom = this.calcularTotalColuna('.qtd2');
            const totalNeutro = this.calcularTotalColuna('.qtd3');
            const totalRuim = this.calcularTotalColuna('.qtd4');
            const totalMuitoRuim = this.calcularTotalColuna('.qtd5');
            totais.push(totalMuitoBom,totalBom,totalNeutro,totalRuim,totalMuitoRuim);
            

            const celulaTotal1 = this.criarCelula(totalMuitoBom);
            const celulaTotal2 = this.criarCelula(totalBom);
            celulaTotal1.style.borderBottom = '8px solid green';
            celulaTotal2.style.borderBottom = '8px solid green';
            const celulaTotal3 = this.criarCelula(totalNeutro);
            celulaTotal3.style.borderBottom = '8px solid yellow';
            const celulaTotal4 = this.criarCelula(totalRuim);
            const celulaTotal5 = this.criarCelula(totalMuitoRuim);
            celulaTotal4.style.borderBottom = '8px solid red';
            celulaTotal5.style.borderBottom = '8px solid red';

            // Verificar qual é maior para definir a cor da célula
            const maior = Math.max(...totais);
            if(maior === totalMuitoBom){
                celulaTotal1.classList.add('table-muito-bom-titulo');
            } else{
                celulaTotal1.classList.add('table-destaque-cinza');
            } if(maior === totalBom){
                celulaTotal2.classList.add('table-bom-titulo');
            } else{
                celulaTotal2.classList.add('table-destaque-cinza');
            } if(maior === totalNeutro){
                celulaTotal3.classList.add('table-neutro-titulo');
            } else{
                celulaTotal3.classList.add('table-destaque-cinza');
            } if(maior === totalRuim){
                celulaTotal4.classList.add('table-ruim-titulo');
            } else{
                celulaTotal4.classList.add('table-destaque-cinza');
            } if(maior === totalMuitoRuim){
                celulaTotal5.classList.add('table-muito-ruim-titulo');
            } else{
                celulaTotal5.classList.add('table-destaque-cinza');
            }

            const controladora = new ControladoraRelatorio(this);
            controladora.feedbackSemaforo(maior, totais, totalMuitoBom, totalBom, totalNeutro, totalRuim, totalMuitoRuim);

            
            const celulaTotal6 = this.criarCelula(this.calcularTotalColuna('.qtd6').toFixed(2), 'table-destaque-cinza-titulo');

            tr.append(celulaTotal,celulaTotal1,celulaTotal2,celulaTotal3,celulaTotal4,celulaTotal5,celulaTotal6);
            tfoot.append(tr);
        }
    }


    /**
     * 
     * Cria uma linha com os totais por opção e retorna. 
     * 
     * Chama criarCelula.
     * 
     */
    criarLinha(titulo: string, totalDiscordoTotalmente: number, totalDiscordo: number, totalNemConcordoNemDiscordo: number, totalConcordo: number, totalConcordoTotalmente: number, media: string): HTMLTableRowElement {
        const tr = document.createElement('tr');

        const celulaTituloPergunta = this.criarCelula(titulo);
        celulaTituloPergunta.classList.add("p-3");
        const celulaTotal1 = this.criarCelula(totalDiscordoTotalmente,'table-muito-bom');
        const celulaTotal2 = this.criarCelula(totalDiscordo, 'table-bom');
        const celulaTotal3 = this.criarCelula(totalNemConcordoNemDiscordo, 'table-neutro');
        const celulaTotal4 = this.criarCelula(totalConcordo, 'table-ruim');
        const celulaTotal5 = this.criarCelula(totalConcordoTotalmente, 'table-muito-ruim');
        const celulaMedia = this.criarCelula(media, 'table-destaque-cinza');

        celulaTotal1.classList.add('qtd1');
        celulaTotal2.classList.add('qtd2');
        celulaTotal3.classList.add('qtd3');
        celulaTotal4.classList.add('qtd4');
        celulaTotal5.classList.add('qtd5');
        celulaMedia.classList.add('qtd6');


        tr.append(
            celulaTituloPergunta,
            celulaTotal1,
            celulaTotal2,
            celulaTotal3,
            celulaTotal4,
            celulaTotal5,
            celulaMedia
        );

        return tr;
    }
    

    /**
     * Cria uma célula com qualquer conteúdo com seletor de cor opcional e retorna
     */
    criarCelula(conteudo: any, cor = ""): HTMLTableCellElement {
        const td = document.createElement('td');
        td.innerText = conteudo;
        if(cor != ""){
            td.classList.add(cor);
        }
        return td;
    }
    //$end

}