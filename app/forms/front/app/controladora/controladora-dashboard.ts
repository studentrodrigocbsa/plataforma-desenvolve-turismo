import { RepositorioDashboard } from "https://bsi.cefet-rj.br/masa/front/app/repositorio/repositorio-dashboard.ts";
import { VisaoDashboard } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-dashboard.ts";

export class ControladoraDashboard {

  private visao       : VisaoDashboard;
  private repo        : RepositorioDashboard;


  constructor(visao: VisaoDashboard) {
    this.visao        = visao;
    this.repo         = new RepositorioDashboard();
  }

  async gerarLink(){
    try{
      await this.repo.gerarToken();
      const links = await this.repo.todosTokensLinks();
      links.reverse();
      this.visao.listarLinks(links);
    } catch(error: any){
      console.log(error);
      this.visao.exibirNotificacaoExcecaoErro();
    }
  }
  

  async listarLinks(){
    try{
      const links = await this.repo.todosTokensLinks();
      if(links.length === 0){
        this.visao.exibirNotificacaoNaoHaLinks();
        return;
      }
      links.reverse();
      this.visao.listarLinks(links);
    } catch(error: any){
      this.visao.exibirNotificacaoExcecaoErro();
    }
  }

}
