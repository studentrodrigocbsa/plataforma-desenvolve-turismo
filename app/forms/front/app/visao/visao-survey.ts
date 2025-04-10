import { ControladoraSurvey } from "https://bsi.cefet-rj.br/masa/front/app/controladora/controladora-survey.ts";
import { DOMINIO } from "https://bsi.cefet-rj.br/masa/front/app/infra/domain.ts";
import { Notificacao, TIPOS_NOTIFICACAO } from "https://bsi.cefet-rj.br/masa/front/app/util/notificacao.ts";

export class VisaoSurvey{

    private static INDEX_ATUAL = -1;

    iniciar() {
        const controladora = new ControladoraSurvey(this);

        
        localStorage.length == 0 ? window.location.href = `${DOMINIO}` : console.log() ;


        const nxtbtn = document.getElementById('next-btn') as HTMLButtonElement;
        nxtbtn.addEventListener('click', () => {
            controladora.next();
        });
        const prevbtn = document.getElementById('prev-btn') as HTMLButtonElement;
        prevbtn.addEventListener('click', () => {
            controladora.prev();
        });
    }


    /**
     * Notificações
     */
    exibirNotificacaoVocePossuiPerguntasNaoRespondidas() {
        Notificacao.exibirNotificacao(['Você possui perguntas não respondidas.'],TIPOS_NOTIFICACAO.AVISO);
    }
    exibirNotificacaoSurveyConcluidoSucesso(msg: string) {
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.SUCESSO);
    }
    exibirNotificacaoOcorreuUmErro(msg: string) {
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.ERRO);
    }
    //$end

    
    /**
     * Controles de navegação
     */
    prevIndex() {
        VisaoSurvey.INDEX_ATUAL--;
        return VisaoSurvey.INDEX_ATUAL;
    }
    nextIndex() {
        VisaoSurvey.INDEX_ATUAL++;
        return VisaoSurvey.INDEX_ATUAL;
    }
    //$end


    /**
     * Telas
     */
    telaAgradecimento(){
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = '';

        const obrigado = document.createElement('h5');
        obrigado.innerText = "Obrigado!!";
        const hr = document.createElement('hr');
        const p = document.createElement('p');
        p.classList.add('text-muted');
        p.innerText = "Você respondeu a esta pesquisa.";

        const divBotoes = document.createElement('div');
        divBotoes.classList.add('d-inline-block');

        const botaoPagInicial = document.createElement('button');
        botaoPagInicial.classList.add('btn','btn-primary');
        botaoPagInicial.innerText = "Sair para Home";
        botaoPagInicial.addEventListener('click', () => {
            const controladora = new ControladoraSurvey(this);
            controladora.limpar();
            window.location.href = `${DOMINIO}`;
        });

        divBotoes.append(botaoPagInicial);
        divConteudo.append(obrigado,hr,p,divBotoes);
    }

    desenharPergunta(pergunta: {titulo: string, respondida: boolean, opcoes: {opcao: string, voto: number}[]}) {
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = '';
        const progresso = document.createElement('h6');
        progresso.innerText = `${VisaoSurvey.INDEX_ATUAL + 1}/15`;
        const titulo = document.createElement('h5');
        titulo.innerText = `${pergunta.titulo}`;

        divConteudo.append(progresso,titulo);

        pergunta.opcoes.forEach(opcao => {
            if(opcao.voto == 1){
                divConteudo.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" checked id="${pergunta.titulo}=${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo}=${opcao.opcao}">
                        ${opcao.opcao}
                    </label>
                </div>
                `;
            } else {
                divConteudo.innerHTML +=
                `
                <div class="form-check form-check-inline p-1">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${pergunta.titulo}=${opcao.opcao}">
                    <label class="form-check-label" for="${pergunta.titulo}=${opcao.opcao}">
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
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = '';

        const title = document.createElement('h6');
        title.innerText = 'Fim';

        const msg = document.createElement('h5');
        msg.innerText = "Você chegou ao fim! Agora, clique no botão abaixo para enviar suas respostas.";

        const hr = document.createElement('hr');

        const p = document.createElement('p');
        p.classList.add('text-muted');
        p.innerText = "Você pode voltar para revisar suas respostas antes de enviar.";

        const btn = document.createElement('button');
        btn.classList.add('btn','btn-primary');
        btn.id = 'enviar';
        btn.innerText = 'Enviar!';
        btn.addEventListener('click', () => {
            const controladora = new ControladoraSurvey(this);
            controladora.enviar();
        });

        divConteudo.append(title,msg,hr,p,btn);
    }

    inicio(){
        VisaoSurvey.INDEX_ATUAL = -1;
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = 
        `
        <div class="title">
            <h5>Responda às próximas 15 assertivas com atenção.</h5>
            <h6>Dica: Use a seta da esquerda para voltar na pergunta e alterar a sua escolha.</h6>
            </div>
            <hr>
        <div class="title">
            <h6>Use a seta da direita para avançar.</h6>
        </div>
        <p class="text-muted">Tempo estimado: 6min</p>
        `;
    }
    //$end

}