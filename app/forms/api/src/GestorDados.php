<?php
class GestorDados{
    public function calcularNotaAA(&$respondente,$survey){
        $mediaAritmeticaSimples = 0;
        $totalPerguntas = 0;

        foreach($survey as $pergunta){
            $totalPerguntas++;
            foreach($pergunta->opcoes as $opcao){
                if($opcao->voto == 1){
                    switch($opcao->opcao){
                        case EnumEscolhas::DISCORDO_TOTALMENTE->value: $mediaAritmeticaSimples += EnumValores::DISCORDO_TOTALMENTE->value;
                        break;
                        case EnumEscolhas::DISCORDO->value: $mediaAritmeticaSimples += EnumValores::DISCORDO->value;
                        break;
                        case EnumEscolhas::NEMCONCORDO_NEMDISCORDO->value: $mediaAritmeticaSimples += EnumValores::NEMCONCORDO_NEMDISCORDO->value;
                        break;
                        case EnumEscolhas::CONCORDO->value: $mediaAritmeticaSimples += EnumValores::CONCORDO->value;
                        break;
                        case EnumEscolhas::CONCORDO_TOTALMENTE->value: $mediaAritmeticaSimples += EnumValores::CONCORDO_TOTALMENTE->value;
                        default: $mediaAritmeticaSimples += 0;
                        break;
                    }
                }
            }
        }

        $respondente->nota = $mediaAritmeticaSimples/$totalPerguntas;
    }
}