//import copy from "copy-to-clipboard";
import copy from "https://bsi.cefet-rj.br/masa/node_modules/copy-to-clipboard/index";
import { ControladoraDashboard } from "https://bsi.cefet-rj.br/masa/front/app/controladora/controladora-dashboard.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";
import { Link } from "https://bsi.cefet-rj.br/masa/front/app/modelo/link.ts";
import { Notificacao, TIPOS_NOTIFICACAO } from "https://bsi.cefet-rj.br/masa/front/app/util/notificacao.ts";


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
  exibirNotificacaoNaoHaLinks(){
    Notificacao.exibirNotificacao(['Gere o seu primeiro link de pesquisa!'],TIPOS_NOTIFICACAO.INFO);
  }
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
            copy(`${DOMINIO}front/pages/dados.html?token=${token}`);
            this.exibirNotificacaoCopiadoComSucesso();
          }
        });
      });
    }
  
    // Visualizar relatório do link
    const btnChart = document.getElementsByClassName('visualizar-relatorio-link');
    if(btnChart) {
      Array.from(btnChart).forEach(botao => {
        botao.addEventListener('click', (event => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const row = target ? target.closest('tr') : null;
          if(row) {
            // Obtém o ID do objeto na linha
            const token = row.dataset.id;
            window.open(`${DOMINIO}front/pages/relatorio.html?token=${token}`, '_blank');
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

    const celulaLink = this.criarCelula(`${DOMINIO}front/pages/dados.html?token=${el.token}`);
    celulaLink.classList.add("text-truncate","user-select-all");

    const celulaActions = this.criarCelula('');
    celulaActions.innerHTML = 
    `
    <div class="d-flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="feather feather-copy copiar-link">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <div class="mx-3 vr"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="feather feather-bar-chart-2 visualizar-relatorio-link">
        <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    </div>
    `;

    const celulaStatus = this.criarCelulaDeStatus('Ativa'); // TODO

    const celulaDropdown = this.criarCelula('');
    celulaDropdown.innerHTML = 
    `
    <div class="action justify-content-end">
        <button class="more-btn ml-10 dropdown-toggle" id="moreAction1" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <!-- Círculo superior -->
            <circle cx="12" cy="6" r="2" fill="#000"/>
            <!-- Círculo do meio -->
            <circle cx="12" cy="12" r="2" fill="#000"/>
            <!-- Círculo inferior -->
            <circle cx="12" cy="18" r="2" fill="#000"/>
          </svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="moreAction1">
          <li class="dropdown-item">
            <a href="#0" class="text-gray concluir-pesquisa">Concluir</a>
          </li>
          <span class="divider"></span>
          <li class="dropdown-item">
            <a href="#0" class="text-gray reabrir-pesquisa">Reabrir</a>
          </li>
        </ul>
      </div>
    `;


    tr.append(
      celulaActions,
      celulaLink,
      celulaStatus,
      celulaDropdown
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

  /**
   * Cria uma célula de status para uma linha da tabela e retorna.
   *
   * @param {any} status
   * @returns {HTMLTableCellElement}
   */
  criarCelulaDeStatus(status: "Ativa" | "Concluída"): HTMLTableCellElement {
    const td = document.createElement('td');
    const span = document.createElement('span');

    switch(status) {
      case "Ativa":
        span.classList.add('status-btn', 'warning-btn');
        break;
      default: // Concluída
        span.classList.add('status-btn', 'success-btn');
        break;
    }

    span.innerText = status;
    td.append(span);

    return td;
  }

}