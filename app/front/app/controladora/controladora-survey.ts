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


    limpar(){
        this.repoSurvey.clear();
    }


    next() {
        const index = this.visao.nextIndex();
        const perguntas = this.repoSurvey.get();
        perguntas[index] ? this.visao.desenharPergunta(perguntas[index]) : this.visao.conclusao();
    }

    atualizarVoto(e: Event) {
        // Só pode um voto por pergunta, então, a cada 'change' resetar onde tiver voto 1 --> 0 e alterar o voto na pergunta de 0 --> 1
        const input = e.target as HTMLInputElement;
        const [titulo,opcao] = input.id.split(',');
        const perguntas = this.repoSurvey.get();
        perguntas.forEach(p => {
            if(p.titulo == titulo){
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