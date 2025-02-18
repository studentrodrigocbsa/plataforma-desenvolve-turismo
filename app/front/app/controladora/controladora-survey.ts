import { RepositorioMASA } from "../repositorio/repositorio-masa";
import { RepositorioSurvey } from "../repositorio/repositorio-survey";
import { VisaoSurvey } from "../visao/visao-survery";

export class ControladoraSurvey{

    private visao: VisaoSurvey;
    private repoMASA: RepositorioMASA;
    private repoSurvey: RepositorioSurvey;

    constructor(visao: VisaoSurvey){
        this.visao = visao;
        this.repoMASA = new RepositorioMASA;
        this.repoSurvey = new RepositorioSurvey;
    }


    async enviar(){
        let prontoParaEnviar = true;
        const survey = this.repoSurvey.get();
        survey.forEach(pergunta => {
            if(pergunta.respondida == false){
                prontoParaEnviar = false;
            }
        });

        if(prontoParaEnviar){
            // TODO: pegar dados do respondente e enviar junto
            const resposta = await this.repoMASA.enviar(survey)
            if(resposta.success){
                this.visao.exibirNotificacaoSurveyContabilizado(resposta.message);
                this.visao.telaAgradecimento();
            } else{ // Espero que não chegue aqui :(
                this.visao.exibirNotificacaoOcorreuUmErro(resposta.message);
            }
        } else{
            this.visao.exibirNotificacaoVocePossuiPerguntasNaoRespondidas();
        }
    }

    limpar(){
        this.repoSurvey.clear();
    }

    prev(){
        const index = this.visao.prevIndex();
        const perguntas = this.repoSurvey.get();
        perguntas[index] ? this.visao.desenharPergunta(perguntas[index]) : this.visao.inicio();
    }

    next() {
        const index = this.visao.nextIndex();
        const perguntas = this.repoSurvey.get();
        perguntas[index] ? this.visao.desenharPergunta(perguntas[index]) : this.visao.conclusao();
    }

    atualizarVoto(e: Event) {
        // Só pode um voto por pergunta, então, a cada 'change' resetar onde tiver voto 1 --> 0 e alterar o voto na pergunta de 0 --> 1
        const input = e.target as HTMLInputElement;
        const [titulo,opcao] = input.id.split('=');
        const perguntas = this.repoSurvey.get();
        perguntas.forEach(p => {
            if(p.titulo == titulo){
                p.respondida = true;
                p.opcoes.forEach(o => {
                    o.voto = 0;
                    if(o.opcao == opcao){
                        o.voto = 1;
                    }
                });
                return;
            }
        });
        this.repoSurvey.save(perguntas);
    }
}