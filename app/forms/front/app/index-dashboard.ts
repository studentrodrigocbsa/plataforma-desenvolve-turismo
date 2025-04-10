import { VisaoDashboard } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-dashboard.ts";
import { isLogado } from "https://bsi.cefet-rj.br/masa/front/app/infra/auth.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";


const res = await isLogado();

if(res == false){
  //console.log('não está logado');
  window.location.href = `${DOMINIO}`;
} else{
  console.log('oi dashboard');
  const visao = new VisaoDashboard();
  visao.iniciar();
}