import { Chart } from "chart.js/auto";
import { ControladoraRelatorio } from "../controladora/controladora-relatorio";
import { DADOS_RESPONDENTE } from '../modelo/enums-respondente';
import { OPCOES } from "../modelo/enum-opcoes";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoRelatorio{

    iniciar(){
        const controladora = new ControladoraRelatorio(this);

        // this.loadSpinner();
        
        controladora.carregarDadosGenericos(); // Total de escolhas por opção do survey
        controladora.carregarRelatorioGeral(); // Pega todas as escolhas por todos os dados do respondente e detalha anterior

        const selectFiltros = document.getElementById('filtro') as HTMLSelectElement;
        selectFiltros.innerHTML = `<option value="" selected>-- Filtro --</option>`;
        const filtros = Object.values(DADOS_RESPONDENTE);
        filtros.forEach(filtro => {
            selectFiltros.innerHTML += `<option value="${filtro}">${filtro}</option>`;
        });


        const btnFiltro = document.getElementById('filtrar') as HTMLButtonElement;
        btnFiltro.addEventListener('click', () => {
            // this.loadSpinner();
            controladora.filtrarRelatorio(); // Filtra o relatório geral por uma categoria específica
            // this.loadSpinnerDispense();
        });

        // this.loadSpinnerDispense();
    }

    valorFiltro(){
        const el = document.getElementById('filtro') as HTMLSelectElement;
        return el.value ? el.value : '';
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
                    responsive: false,
                    maintainAspectRatio: true,
                    indexAxis: 'y',
                    plugins: {
                        title: {
                          display: true,
                          text: 'Gráfico Geral - Total por escolha dos respondentes'
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

    desenharDesempenhoGeral(mensagem: string, nota: number){
        const texto = document.getElementById('texto-desempenho-geral') as HTMLParagraphElement;
        texto.innerHTML = `${mensagem} (${nota})`;
    }

    desenharTabelaMediasGeraisRelatorio(titulos: string[], totaisDiscordoTotalmente: number[], totaisDiscordo: number[], totaisNemConcordoNemDiscordo: number[], totaisConcordo: number[], totaisConcordoTotalmente: number[]){
        
    }
}