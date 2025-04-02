import { VisaoLogin } from "./visao/visao-login";
import { isLogado } from "./infra/auth";
import { DOMINIO } from "./infra/domain";


const res = await isLogado();

if(res == true){
  window.location.href = `${DOMINIO}/front/pages/dashboard.html`;
}
else{
  console.log('oi login');
  const visao = new VisaoLogin();
  visao.iniciar();
}