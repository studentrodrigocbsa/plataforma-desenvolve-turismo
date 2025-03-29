import { ControladoraDados } from "../controladora/controladora-dados";
import { Notificacao, TIPOS_NOTIFICACAO } from "../util/notificacao";
import { CARGO, ESCOLARIDADE, FAIXA_ETARIA, PERFIL } from "../modelo/enums-respondente";

export class VisaoDados{

    iniciar() {
        const controladora = new ControladoraDados(this);

        const botao = document.getElementById('iniciar') as HTMLButtonElement;
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            controladora.iniciarSurvey();
        });

        this.desenharDadosSelects();
    }

    botaoCarregamento(){
        const botao = document.getElementById('iniciar') as HTMLButtonElement;
        botao.setAttribute('disabled','true');
        botao.innerHTML = 
        `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Carregando...</span>
        `;
    }

    camposEstaoVazios(): boolean{
        const s1 = document.getElementById('perfil') as HTMLSelectElement;
        const s2 = document.getElementById('idade') as HTMLSelectElement;
        const s3 = document.getElementById('escolaridade') as HTMLSelectElement;
        const s4 = document.getElementById('cargo') as HTMLSelectElement;

        return  (s1.value   == '' ||
                s2.value    == '' ||
                s3.value    == '' ||
                s4.value    == '' ) ? true : false;
    }

    exibirNotificacaoFavorPreencherOsCampos() {
        Notificacao.exibirNotificacao(['Favor preencher todos os campos para iniciar o survey.'],TIPOS_NOTIFICACAO.INFO);
    }


    desenharDadosSelects(){
        const s1 = document.getElementById('perfil') as HTMLSelectElement;
        s1.innerHTML = `<option value="" selected>-- Selecione o seu perfil --</option>`;
        const perfis = Object.values(PERFIL);
        const opt = document.createElement('option');
        perfis.forEach(perfil => {
            if(perfil == PERFIL.RESIDENTE_LOCAL || perfil == PERFIL.VISITANTE)
                return; // Trabalharemos apenas com a pesquisa de AA p/ gestores (funcionários de destino turístico)
            opt.value = perfil; 
            opt.innerHTML = perfil;
            s1.appendChild(opt);
        });

        const s2 = document.getElementById('idade') as HTMLSelectElement;
        s2.innerHTML = `<option value="" selected>-- Selecione a sua faixa etária --</option>`;
        const faixas = Object.values(FAIXA_ETARIA);
        faixas.forEach(faixa => {
            const opt = document.createElement('option');
            opt.value = faixa;
            opt.innerHTML = faixa;
            s2.appendChild(opt);
        });

        const s3 = document.getElementById('escolaridade') as HTMLSelectElement;
        s3.innerHTML = `<option value="" selected>-- Selecione a sua escolaridade --</option>`;
        const escolaridades = Object.values(ESCOLARIDADE);
        escolaridades.forEach(escolaridade => {
            const opt = document.createElement('option');
            opt.value = escolaridade;
            opt.innerHTML = escolaridade;
            s3.appendChild(opt);
        });
        

        s1.addEventListener('change', () => {
            if (s1.value == PERFIL.RESIDENTE_LOCAL || s1.value == PERFIL.VISITANTE){
                const s4 = document.getElementById('cargo') as HTMLSelectElement;
                s4.innerHTML = `<option value="" selected>-- Selecione o seu cargo --</option>`;
                s4.innerHTML += `<option value="${CARGO.NENHUM}">${CARGO.NENHUM}</option>`;
            } else if (s1.value == ''){
                const s4 = document.getElementById('cargo') as HTMLSelectElement;
                s4.innerHTML = `<option value="" selected>-- Selecione o seu cargo --</option>`;
            } else{
                this.desenharSelectCargos();
            }
        });
    }

    desenharSelectCargos(){
        const s4 = document.getElementById('cargo') as HTMLSelectElement;
        s4.innerHTML = `<option value="" selected>-- Selecione o seu cargo --</option>`;
        const cargos = Object.values(CARGO);
        cargos.forEach(cargo => {
            if(cargo == CARGO.NENHUM){
                return;
            }
            const opt = document.createElement('option');
            opt.value = cargo;
            opt.innerHTML = cargo;
            s4.appendChild(opt);
        });
    }


    
    valorCargo() {
        const s = document.getElementById('cargo') as HTMLSelectElement;
        return s.value ? s.value : '';
    }
    valorEscolaridade() {
        const s = document.getElementById('escolaridade') as HTMLSelectElement;
        return s.value ? s.value : '';
    }
    valorIdade() {
        const s = document.getElementById('idade') as HTMLSelectElement;
        return s.value ? s.value : '';
    }
    valorPerfil() {
        const s = document.getElementById('perfil') as HTMLSelectElement;
        return s.value ? s.value : '';
    }

}