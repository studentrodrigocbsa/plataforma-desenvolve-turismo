import { VisaoDashboard } from "./visao/visao-dashboard";
/*
import { isLogado } from "./infra/auth";
import { DOMINIO } from "./infra/domain";


const res = await isLogado();

if(res == false){
  window.location.href = `${DOMINIO}`;
}
*/

console.log('oi dashboard');
const visao = new VisaoDashboard();
visao.iniciar();