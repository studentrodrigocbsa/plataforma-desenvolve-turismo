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

        // this.loadSpinnerDispense();
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
        const tbody = document.querySelector('tbody');
        if(tbody){
            tbody.innerHTML = '';

            const fragmento = document.createDocumentFragment();
            for(let i = 0; i < titulos.length; i++){
                const controladora = new ControladoraRelatorio(this);
                const media = controladora.calcularMediaPergunta(totaisDiscordoTotalmente[i] ?? 0,totaisDiscordo[i] ?? 0,totaisNemConcordoNemDiscordo[i] ?? 0,totaisConcordo[i] ?? 0,totaisConcordoTotalmente[i] ?? 0);
                const linha = this.criarLinha(titulos[i],totaisDiscordoTotalmente[i] ?? 0,totaisDiscordo[i] ?? 0,totaisNemConcordoNemDiscordo[i] ?? 0,totaisConcordo[i] ?? 0,totaisConcordoTotalmente[i] ?? 0,Number(media));
                fragmento.append(linha);
            }
            tbody.append(fragmento);
            this.criarLinhaTotal();
        }
    }

    calcularTotais(seletor: string){
        const a = document.querySelectorAll(seletor) as NodeListOf<HTMLTableCellElement>;
        let t = 0;
    
        a.forEach(celula => {
            t += parseInt(celula.textContent ?? '0');
            console.log(t);
        });

        return t;
    }

    calcularTotaisMedia(seletor: string){
        const a = document.querySelectorAll(seletor) as NodeListOf<HTMLTableCellElement>;
        let t = 0;
    
        a.forEach(celula => {
            t += parseFloat(celula.textContent ?? '0');
            console.log(t);
        });

        return t.toFixed(2);
    }

    criarLinhaTotal(){
        const tfoot = document.querySelector('tfoot');
        if(tfoot){
            const tr = document.createElement('tr');
            const celulaTotal = this.criarCelula('Total');
            const celulaTotal1 = this.criarCelula(this.calcularTotais('.qtd1'));
            const celulaTotal2 = this.criarCelula(this.calcularTotais('.qtd2'));
            const celulaTotal3 = this.criarCelula(this.calcularTotais('.qtd3'));
            const celulaTotal4 = this.criarCelula(this.calcularTotais('.qtd4'));
            const celulaTotal5 = this.criarCelula(this.calcularTotais('.qtd5'));
            const celulaTotal6 = this.criarCelula(this.calcularTotaisMedia('.qtd6'));

            tr.append(celulaTotal,celulaTotal1,celulaTotal2,celulaTotal3,celulaTotal4,celulaTotal5,celulaTotal6);
            tfoot.append(tr);
        }
    }

    criarLinha(titulo: string, totalDiscordoTotalmente: number, totalDiscordo: number, totalNemConcordoNemDiscordo: number, totalConcordo: number, totalConcordoTotalmente: number, media: number): HTMLTableRowElement {
        const tr = document.createElement('tr');

        const celulaTituloPergunta = this.criarCelula(titulo);
        celulaTituloPergunta.classList.add("p-3");
        const celulaTotal1 = this.criarCelula(totalDiscordoTotalmente);
        const celulaTotal2 = this.criarCelula(totalDiscordo);
        const celulaTotal3 = this.criarCelula(totalNemConcordoNemDiscordo);
        const celulaTotal4 = this.criarCelula(totalConcordo);
        const celulaTotal5 = this.criarCelula(totalConcordoTotalmente);
        const celulaMedia = this.criarCelula(media);

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
    
    criarCelula(conteudo: any): HTMLTableCellElement {
        const td = document.createElement('td');
        td.innerText = conteudo;
        return td;
    }
}