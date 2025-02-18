import { ControladoraSurvey } from "../controladora/controladora-survey";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoSurvey{

    private static INDEX = -1;

    iniciar() {
        const controladora = new ControladoraSurvey(this);

        /*
        window.onbeforeunload = () => {
            controladora.limpar()
        }
        */

        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        })
    }

    
    nextIndex() {
        VisaoSurvey.INDEX++;
        return VisaoSurvey.INDEX;
    }

    desenharPergunta(pergunta: {titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}) {
        console.log(pergunta);
        const divHeading = document.getElementById('conteudo') as HTMLDivElement;
        divHeading.innerHTML = '';
        const total = document.createElement('h6');
        total.innerText = `${VisaoSurvey.INDEX + 1}/15`;
        const titulo = document.createElement('h5');
        titulo.innerText = `${pergunta.titulo}`;

        divHeading.append(total,titulo);

        pergunta.opcoes.forEach(opcao => {
            if(opcao.voto == 1){
                divHeading.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" checked id="${pergunta.titulo},${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo},${opcao.opcao}">
                        ${opcao.opcao}
                    </label>
                </div>
                `;
            } else {
                divHeading.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${pergunta.titulo},${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo},${opcao.opcao}">
                        ${opcao.opcao}
                    </label>
                </div>
                `;
            }
            
        });

        
        const controladora = new ControladoraSurvey(this);
        var checkboxElems = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        for (var i = 0; i < checkboxElems.length; i++) {
            checkboxElems[i].addEventListener('change', (e) => controladora.atualizarVoto(e));
        }
    }

    conclusao(){
        console.log('acabou');
    }

}