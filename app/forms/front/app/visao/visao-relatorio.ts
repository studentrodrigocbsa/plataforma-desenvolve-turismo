import { Chart } from "chart.js";
import { ControladoraRelatorio } from "../controladora/controladora-relatorio";
import { DADOS_RESPONDENTE } from '../modelo/enums-respondente';

export class VisaoRelatorio{

    iniciar(){
        const controladora = new ControladoraRelatorio(this);
        
        if(document.readyState == 'complete'){
            controladora.carregarDadosGenericos(); // Total de escolhas por opção do survey
        }

        const selectFiltros = document.getElementById('filtro') as HTMLSelectElement;
        selectFiltros.innerHTML = `<option value="" selected>-- Filtro --</option>`;
        const filtros = Object.values(DADOS_RESPONDENTE);
        filtros.forEach(filtro => {
            selectFiltros.innerHTML += `<option value="${filtro}">${filtro}</option>`;
        });


        const btnFiltro = document.getElementById('filtrar') as HTMLButtonElement;
        btnFiltro.addEventListener('click', () => {
            controladora.filtrarRelatorio();
        })
    }


    desenharGraficoGeral(){
        const canva = <HTMLCanvasElement> document.getElementById("grafico-vendas-pagamento");
        const ctx = canva.getContext("2d");
        if(ctx){


            const DATA_COUNT = 15;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const labels = Utils.months({count: 15});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: 2,
      backgroundColor: Utils.CHART_COLORS.red,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: 4,
      backgroundColor: Utils.CHART_COLORS.blue,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 3',
      data: 1,
      backgroundColor: Utils.CHART_COLORS.green,
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 4',
      data: 10,
      backgroundColor: Utils.CHART_COLORS.green,
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 5',
      data: 6,
      backgroundColor: Utils.CHART_COLORS.green,
      stack: 'Stack 1',
    },
  ]
};

            const config = {
                type: 'bar',
                data: data,
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart - Stacked'
                    },
                  },
                  responsive: true,
                  interaction: {
                    intersect: false,
                  },
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  }
                }
            };


            new Chart(ctx, options);
        }
    }
}