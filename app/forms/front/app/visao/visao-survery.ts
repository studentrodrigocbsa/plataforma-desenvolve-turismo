import { ControladoraSurvey } from "../controladora/controladora-survey";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoSurvey{

    private static INDEX_ATUAL = -1;

    iniciar() {
        const controladora = new ControladoraSurvey(this);

        window.onbeforeunload = () => {
            controladora.limpar();
        }


        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });
    }

    
    exibirNotificacaoVocePossuiPerguntasNaoRespondidas() {
        Notificacao.exibirNotificacao(['Você possui perguntas ainda não respondidas... volte para respondê-las.'],TIPOS_NOTIFICACAO.AVISO);
    }
    exibirNotificacaoSurveyConcluidoSucesso(msg: string) {
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.SUCESSO);
    }
    exibirNotificacaoOcorreuUmErro(msg: string) {
        Notificacao.exibirNotificacao([msg],TIPOS_NOTIFICACAO.ERRO);
    }

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

        const botaoHome = document.createElement('button');
        botaoHome.classList.add('btn','btn-secondary');
        botaoHome.innerText = 'Voltar p/ Home';
        botaoHome.addEventListener('click', () => {
            window.location.href = 'http://localhost:5173/'
        });

        const botaoPagInicial = document.createElement('button');
        botaoPagInicial.classList.add('btn','btn-primary');
        botaoPagInicial.innerText = "Responder Novamente";
        botaoPagInicial.addEventListener('click', () => {
            window.location.href = 'http://localhost:5173/front/pages/menu.html'
        });

        const botaoRelatorio = document.createElement('button');
        botaoRelatorio.classList.add('btn','btn-secondary');
        botaoRelatorio.innerText = "Pág. Relatório";
        botaoRelatorio.addEventListener('click', () => {
            window.location.href = 'http://localhost:5173/front/pages/relatorio.html'
        });

        divBotoes.append(botaoHome,botaoPagInicial,botaoRelatorio);
        divConteudo.append(obrigado,hr,p,divBotoes);
    }

    
    prevIndex() {
        VisaoSurvey.INDEX_ATUAL--;
        return VisaoSurvey.INDEX_ATUAL;
    }
    nextIndex() {
        VisaoSurvey.INDEX_ATUAL++;
        return VisaoSurvey.INDEX_ATUAL;
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


        // setas
        divConteudo.innerHTML += 
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;
        

        
        const controladora = new ControladoraSurvey(this);
        var checkboxElems = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        for (var i = 0; i < checkboxElems.length; i++) {
            checkboxElems[i].addEventListener('change', (e) => controladora.atualizarVoto(e));
        }

        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });

        const prev = document.getElementById('prev-btn') as HTMLButtonElement;
        prev.addEventListener('click', () => {
            controladora.prev();
        });
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

        divConteudo.append(title,msg,hr,p,btn);

        divConteudo.innerHTML += 
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right close" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;

        const controladora = new ControladoraSurvey(this);
        const prev = document.getElementById('prev-btn') as HTMLButtonElement;
        prev.addEventListener('click', () => {
            controladora.prev();
        });
        const botaoEnviar = document.getElementById('enviar') as HTMLButtonElement;
        botaoEnviar.addEventListener('click', () => {
            controladora.enviar();
        })
    }

    inicio(){
        const divConteudo = document.getElementById('conteudo') as HTMLDivElement;
        divConteudo.innerHTML = 
        `
        <div class="title">
            <h5>Responda às próximas 15 assertivas com atenção.</h5>
            <h6>Dica: Clique na seta da esquerda para voltar na pergunta e alterar sua escolha.</h6>
            </div>
            <hr>
        <div class="title">
            <h6>Clique na seta da direita para avançar.</h6>
        </div>
        <p class="text-muted">Tempo estimado: 6min</p>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left close" id="prev-btn"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" id="next-btn"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;

        const controladora = new ControladoraSurvey(this);
        const nxt = document.getElementById('next-btn') as HTMLButtonElement;
        nxt.addEventListener('click', () => {
            controladora.next();
        });
    }

}