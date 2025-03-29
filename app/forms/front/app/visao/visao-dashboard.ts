import copy from "copy-to-clipboard";
import { ControladoraDashboard } from "../controladora/controladora-dashboard";
import { DOMINIO } from "../infra/Dominio";
import { Link } from "../modelo/link";
import { Notificacao, TIPOS_NOTIFICACAO } from "../util/notificacao";


export class VisaoDashboard {

  iniciar(): void {

    const controladora = new ControladoraDashboard(this);

    const btn = document.getElementById('gerar-link') as HTMLButtonElement;
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      controladora.gerarLink();
    })

    controladora.listarLinks();

  }


  /****************************/
  /* VisaoDashboard FUNCTIONS */
  /****************************/
  exibirNotificacaoExcecaoErro(): void{
    Notificacao.exibirNotificacao(['Ocorreu um erro grave e não foi possível concluir a ação.'], TIPOS_NOTIFICACAO.ERRO);
  }
  exibirNotificacaoCopiadoComSucesso(): void{
    Notificacao.exibirNotificacao(['Link copiado com sucesso! Você já pode compartilhá-lo.'], TIPOS_NOTIFICACAO.SUCESSO);
  }
  

  /**********************
   *                    *
   *      TABELA       *
   *                    *
   *********************/
  private definirEventos() {

    // Copiar link
    const btnCopy = document.getElementsByClassName('copiar-link');
    if (btnCopy) {
      Array.from(btnCopy).forEach(botao => {
        botao.addEventListener('click', (event) => {
          event.preventDefault();
          // Encontra o elemento pai <tr> mais próximo
          const target = event.target as HTMLElement;
          const row = target ? target.closest('tr') : null;
          if (row) {
            // Obtém o ID do objeto na linha
            const token = row.dataset.id;
            copy(`${DOMINIO}/front/pages/dados.html?token=${token}`);
            this.exibirNotificacaoCopiadoComSucesso();
          }
        });
      });
    }
  
    // Visualizar relatório do link
    const btnChart = document.getElementsByClassName('visualizar-dados-link');
    if(btnChart) {
      Array.from(btnChart).forEach(botao => {
        botao.addEventListener('click', (event => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const row = target ? target.closest('tr') : null;
          if(row) {
            // Obtém o ID do objeto na linha
            const token = row.dataset.id;
            window.open(`${DOMINIO}/front/pages/relatorio.html?token=${token}`, '_blank');
          }
        }));
      });
    }

  }

  listarLinks(links: Link[]): void {
    const tbody = document.querySelector('tbody');
    if(tbody){
      tbody.innerHTML = '';

      const fragmento = document.createDocumentFragment();
      for (const el of links) {
        const linha = this.criarLinha(el);
        fragmento.append(linha);
      }
      tbody.append(fragmento);

      // Adiciona eventos aos botões de ação
      this.definirEventos();
      
    }
  }

  
  criarLinha(el: Link): HTMLTableRowElement {
    const tr = document.createElement('tr');

    const celulaLink = this.criarCelula(`${DOMINIO}/front/pages/dados.html?token=${el.token}`);

    // Cria as ações comuns a toda reserva
    const celulaActions = document.createElement('div');
    celulaActions.innerHTML = 
    `
      <div class="action justify-content-end">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy copiar-link"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <div class="mx-4 vr"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2 visualizar-dados-link"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
      </div>
    `;


    tr.append(
      celulaLink,
      celulaActions
    );

    tr.setAttribute('data-id', el.token.toString()); // Token do link na linha

    return tr;
  }

  /**
   * Cria uma célula para uma linha da tabela e retorna.
   *
   * @param {any} conteudo
   * @returns {HTMLTableCellElement}
   */
  criarCelula(conteudo: any): HTMLTableCellElement {
    const td = document.createElement('td');
    const p = document.createElement('p');
    p.classList.add('text-sm')
    p.innerText = conteudo;
    td.append(p);
    return td;
  }

}