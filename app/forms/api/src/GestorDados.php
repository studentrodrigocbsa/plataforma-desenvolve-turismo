<?php
class GestorDados{

    
    public function calcularNotaRespondente(&$respondente,$survey){
        $mediaAritmeticaSimples = 0;
        $totalPerguntas = 0;

        foreach($survey as $pergunta){
            $totalPerguntas++;
            foreach($pergunta->opcoes as $opcao){
                if($opcao->voto == 1){
                    switch($opcao->opcao){
                        case EnumEscolhas::DISCORDO_TOTALMENTE->value: $mediaAritmeticaSimples += EnumValoresEscolhas::DISCORDO_TOTALMENTE->value;
                        break;
                        case EnumEscolhas::DISCORDO->value: $mediaAritmeticaSimples += EnumValoresEscolhas::DISCORDO->value;
                        break;
                        case EnumEscolhas::NEMCONCORDO_NEMDISCORDO->value: $mediaAritmeticaSimples += EnumValoresEscolhas::NEMCONCORDO_NEMDISCORDO->value;
                        break;
                        case EnumEscolhas::CONCORDO->value: $mediaAritmeticaSimples += EnumValoresEscolhas::CONCORDO->value;
                        break;
                        case EnumEscolhas::CONCORDO_TOTALMENTE->value: $mediaAritmeticaSimples += EnumValoresEscolhas::CONCORDO_TOTALMENTE->value;
                        default: $mediaAritmeticaSimples += 0;
                        break;
                    }
                }
            }
        }

        $respondente->nota = $mediaAritmeticaSimples/$totalPerguntas;
    }


    public function tradutorDeFiltro($filtro){
        return match($filtro){
            EnumFiltro::ESCOLARIDADE->value => EnumTradutorFiltro::ESCOLARIDADE->value,
            EnumFiltro::CARGO->value => EnumTradutorFiltro::CARGO->value,
            EnumFiltro::FAIXA_ETARIA->value => EnumTradutorFiltro::FAIXA_ETARIA->value,
            EnumFiltro::PERFIL->value => EnumTradutorFiltro::PERFIL->value,
            default => ''
        };
    }
}