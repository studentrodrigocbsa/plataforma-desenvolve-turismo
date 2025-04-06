import { VisaoRelatorio } from "./visao/visao-relatorio";
import { isLogado } from "./infra/auth";
import { DOMINIO } from "./infra/domain";


const res = await isLogado();

if(res == false){
    //console.log('não está logado');
    window.location.href = `${DOMINIO}`;
} else{
    console.log('oi visao relatorio');
    const visao = new VisaoRelatorio();
    visao.iniciar();
}