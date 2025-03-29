import { VisaoDashboard } from "./visao/visao-dashboard";
/*
import { isLogado } from "./infra/auth";


const res = await isLogado();

if(res == false){
  window.location.href = "http://localhost:5173";
}
*/

console.log('oi dashboard');
const visao = new VisaoDashboard();
visao.iniciar();