const opcoesPorDimensao = {
    acessibilidade: [
        { value: '1', text: 'Atitudinal' },
        { value: '2', text: 'Comunicional' },
        { value: '3', text: 'Metodológica/Instrumental' },
        { value: '4', text: 'Arquitetônica' },
        { value: '5', text: 'Programática' }
    ],
    governanca: [
        { value: '1', text: 'Político-Institucional' }
    ],
    ambiental: [
        { value: '1', text: 'Diversidade Biológica' },
        { value: '2', text: 'Saneamento Básico' },
        { value: '3', text: 'Energia' }
    ],
    economico: [
        { value: '1', text: 'Demanda Turística' },
        { value: '2', text: 'Oferta Turísitica' },
        { value: '3', text: 'Segunda Residência' },
        { value: '4', text: 'Benefícios Econômicos' },
    ],
    sociocultural: [
        { value: '1', text: 'Saúde' },
        { value: '2', text: 'Segurança Pública' },
        { value: '3', text: 'Satisfação' },
        { value: '4', text: 'Cultura' },
        { value: '5', text: 'Educação' },
    ]
};




const visaoSelect = document.getElementById('visao');
const dimensaoSelect = document.getElementById('dimensao');
const subdimensaoSelect = document.getElementById('subdimensao');
const botao = document.getElementById('filtrar');

subdimensaoSelect.innerHTML = '<option value="" disabled selected>-- Selecione uma subdimensão --</option>';
botao.setAttribute('disabled', '');
botao.innerHTML = "Esperando seleção...";

visaoSelect.addEventListener('change', verify);
subdimensaoSelect.addEventListener('change', verify);


function verify() {
    visao = visaoSelect.value;
    dimensao = dimensaoSelect.value;
    subdimensao = subdimensaoSelect.value;

    if(visao != '' && dimensao != '' && subdimensao != ''){
        botao.removeAttribute('disabled');
        botao.innerHTML = "Tudo certo!";
        return;
    }

    botao.setAttribute('disabled', '');
    botao.innerHTML = "Esperando seleção...";
}

dimensaoSelect.addEventListener('change', function () {
    // Limpar
    subdimensaoSelect.innerHTML = '<option value="" disabled selected>-- Selecione uma subdimensão --</option>';

    // Pegar o valor da dimensão selecionada
    const dimensaoSelecionada = dimensaoSelect.value;

    // Verificar se existe uma lista de opções para essa visão
    if (opcoesPorDimensao[dimensaoSelecionada]) {
        // Adicionar as novas opções ao select de dimensões
        opcoesPorDimensao[dimensaoSelecionada].forEach(function (opcao) {
            const optionElement = document.createElement('option');
            optionElement.value = opcao.value;
            optionElement.textContent = opcao.text;
            subdimensaoSelect.appendChild(optionElement);
        });
    }

    verify();
});


