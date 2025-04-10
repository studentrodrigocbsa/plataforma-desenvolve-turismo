import { VisaoLogin } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-login.ts";
import { isLogado } from "https://bsi.cefet-rj.br/masa/front/app/infra/auth.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";


const res = await isLogado();

if(res == true){
  window.location.href = `${DOMINIO}front/pages/dashboard.html`;
} else{
  console.log('oi login');
  const visao = new VisaoLogin();
  visao.iniciar();
}
