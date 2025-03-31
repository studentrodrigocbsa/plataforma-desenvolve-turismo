<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repoMasa, private GestorDados $gestorDados){}

    public function getAA(): array{
        return $this->repoMasa->buscarPerguntasPesquisaAcessibilidadeAtitudinal();
    }

    public function novoToken($usuario): string{
        // Verificar se link existe antes de salvar
        $linksExistentes = $this->repoMasa->todosTokens();
        do{
            $token = $this->gestorDados->gerarToken();
            // TODO: previnir loop
        }while(in_array($token, array_column($linksExistentes, 'link')));
        $this->repoMasa->salvarToken($token,$usuario);
        return $token;
    }

    public function getTokensLinksUsuario($usuario): array{
        return $this->repoMasa->todosTokensUsuario($usuario);
    }

    public function postAA($dados = []): bool{

        if(count($dados) != 3){
            return false;
        }


        $survey = $dados[0];
        $respondente = $dados[1];
        $token = $dados[2];

        $this->gestorDados->calcularNotaRespondente($respondente,$survey);
        $id = $this->repoMasa->salvarRespondenteSurvey($respondente);
        return $this->repoMasa->contabilizarVotosSurveyAA($survey,$id,$token);
    }

    public function getTotaisGenericosPesquisa($token){
        return $this->repoMasa->totalRespostas($token);
    }

    public function getTotaisPorFiltro($filtro): array{
        $campo_respondente_bd = $this->gestorDados->tradutorDeFiltro($filtro);
        return $this->repoMasa->totalRespostasPorFiltro($campo_respondente_bd);
    }
}