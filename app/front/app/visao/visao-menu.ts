import { ControladoraMenu } from "../controladora/controladora-menu";
import { Notificacao, TIPOS_NOTIFICACAO } from "../infra/notificacao";

export class VisaoMenu{

    iniciar() {
        const controladora = new ControladoraMenu(this);

        if(document.readyState == 'complete'){
            document.getElementById('iniciar')?.addEventListener('click', () => {
                controladora.carregarSurvey();
            });
        }
        
    }

    valorPesquisaSelecionada(): string{
        const select = document.getElementById('pesquisa') as HTMLSelectElement;
        return select.value ? select.value : 'aav';
    }

    exibirNotificacaoSelecioneUmaPesquisa() {
        Notificacao.exibirNotificacao(['Selecione uma pesquisa para iniciar o survey.'],TIPOS_NOTIFICACAO.INFO);
    }

}