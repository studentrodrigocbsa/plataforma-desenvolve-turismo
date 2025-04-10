import { VisaoRelatorio } from "https://bsi.cefet-rj.br/masa/front/app/visao/visao-relatorio.ts";
import { isLogado } from "https://bsi.cefet-rj.br/masa/front/app/infra/auth.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";


const res = await isLogado();

if(res == false){
    //console.log('não está logado');
    window.location.href = `${DOMINIO}`;
} else{
    console.log('oi visao relatorio');
    const visao = new VisaoRelatorio();
    visao.iniciar();
}