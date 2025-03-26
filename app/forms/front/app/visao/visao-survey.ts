import { ControladoraSurvey } from "../controladora/controladora-survey";
import { DOMINIO } from "../infra/Dominio";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";
import { Redirect } from "../infra/redirect";

export class VisaoSurvey{

    private static INDEX_ATUAL = -1;

    iniciar() {
        const controladora = new ControladoraSurvey(this);


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
        p.innerText = "Quando todos terminarem de responder, acesse a página de relatório.";

        const divBotoes = document.createElement('div');
        divBotoes.classList.add('d-inline-block');

        const botaoPagInicial = document.createElement('button');
        botaoPagInicial.classList.add('btn','btn-primary');
        botaoPagInicial.innerText = "Responder Novamente";
        botaoPagInicial.addEventListener('click', () => {
            const controladora = new ControladoraSurvey(this);
            controladora.resetarPesquisa();
        });

        const botaoRelatorio = document.createElement('button');
        botaoRelatorio.classList.add('btn','btn-secondary');
        botaoRelatorio.innerText = "Pág. Relatório";
        botaoRelatorio.addEventListener('click', () => {
            //Redirect.redirectToRelatorio();
            window.location.href = `${DOMINIO}/front/pages/relatorio.html`;
        });

        divBotoes.append(botaoPagInicial,botaoRelatorio);
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