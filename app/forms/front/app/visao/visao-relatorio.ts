import { ControladoraRelatorio } from "../controladora/controladora-relatorio";

export class VisaoRelatorio{

    iniciar(){
        const controladora = new ControladoraRelatorio(this);
        
        if(document.readyState == 'complete'){
            controladora.carregarRelatorio();
        }
    }


    
}