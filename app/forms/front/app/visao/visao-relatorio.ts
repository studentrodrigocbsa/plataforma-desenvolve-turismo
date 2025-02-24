import { Chart } from "chart.js/auto";
import { ControladoraRelatorio } from "../controladora/controladora-relatorio";
import { DADOS_RESPONDENTE } from '../modelo/enums-respondente';
import { OPCOES } from "../modelo/enum-opcoes";

export class VisaoRelatorio{

    iniciar(){
        const controladora = new ControladoraRelatorio(this);

        // this.loadSpinner();
        
        controladora.carregarDadosGenericos(); // Total de escolhas por opção do survey

        const selectFiltros = document.getElementById('filtro') as HTMLSelectElement;
        selectFiltros.innerHTML = `<option value="" selected>-- Filtro --</option>`;
        const filtros = Object.values(DADOS_RESPONDENTE);
        filtros.forEach(filtro => {
            selectFiltros.innerHTML += `<option value="${filtro}">${filtro}</option>`;
        });


        const btnFiltro = document.getElementById('filtrar') as HTMLButtonElement;
        btnFiltro.addEventListener('click', () => {
            // this.loadSpinner();
            controladora.filtrarRelatorio();
            // this.loadSpinnerDispense();
        });


        // this.loadSpinnerDispense();
    }

    valorFiltro(){
        const el = document.getElementById('filtro') as HTMLSelectElement;
        return el.value ? el.value : '';
    }


    desenharGraficoGeral(titulos: string[], totaisDiscordoTotalmente: number[], totaisDiscordo: number[], totaisNemConcordoNemDiscordo: number[], totaisConcordo: number[], totaisConcordoTotalmente: number[]){
        const canvas = document.getElementById('grafico-total-geral') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if(ctx){


            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: titulos,
                    datasets: [
                        {
                            label: OPCOES.DISCORDO_TOTALMENTE,
                            data: totaisDiscordoTotalmente,
                            backgroundColor: 'rgba(0, 0, 255, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.DISCORDO,
                            data: totaisDiscordo,
                            backgroundColor: 'rgba(0, 255, 0, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.NEMCONCORDO_NEMDISCORDO,
                            data: totaisNemConcordoNemDiscordo,
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.CONCORDO,
                            data: totaisConcordo,
                            backgroundColor: 'rgba(255, 255, 0, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: OPCOES.CONCORDO_TOTALMENTE,
                            data: totaisConcordoTotalmente,
                            backgroundColor: 'rgba(4, 255, 255, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                          display: true,
                          text: 'Chart.js Bar Chart - Stacked'
                        },
                    },
                    responsive: true,
                    scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true
                        }
                    }
                }
            });


        }
    }
    

    desenharDesempenhoGeral(mensagem: string, nota: number){
        const texto = document.getElementById('texto-desempenho-geral') as HTMLParagraphElement;
        texto.innerHTML = `${mensagem} (${nota})`;
    }
}