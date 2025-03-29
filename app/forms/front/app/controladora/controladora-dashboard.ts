import { Link } from "../modelo/link";
import { RepositorioDashboard } from "../repositorio/repositorio-dashboard";
import { VisaoDashboard } from "../visao/visao-dashboard";

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
      links.reverse();
      this.visao.listarLinks(links);
    } catch(error: any){
      this.visao.exibirNotificacaoExcecaoErro();
    }
  }

}
