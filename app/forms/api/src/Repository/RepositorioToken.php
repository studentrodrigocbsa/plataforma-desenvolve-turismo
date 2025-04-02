<?php

class RepositorioToken
{

  public function __construct(
    private PDO $pdo
  ){}


  public function salvarToken($token,$usuario): array{
    try {
      $ps = $this->pdo->prepare('INSERT INTO link(token,usuario) VALUES (:token, (SELECT id FROM login WHERE usuario = :usuario))');
      $ps->execute(['token' => $token, 'usuario' => $usuario]);
      return ['success' => true, 'token' => $token];
    } catch (Exception $ex) {
      throw new Exception('Erro ao salvar o token no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function todosTokensUsuario($usuario): array{
    try {
      $ps = $this->pdo->prepare('SELECT * FROM link WHERE usuario = (SELECT id FROM login WHERE usuario = :usuario)');
      $ps->execute(['usuario' => $usuario]);
      $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
      $links = [];
      foreach ($dados as $linha){
        $link = new Link($linha['id'], $linha['token']);
        $links []= $link;
      }
      return $links;
    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar tokens dos links no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function todosTokens(): array{
    try {
      $ps = $this->pdo->prepare('SELECT * FROM link');
      $ps->execute();
      $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
      $links = [];
      foreach ($dados as $linha){
        $link = new Link($linha['id'], $linha['token']);
        $links []= $link;
      }
      return $links;
    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar tokens dos links no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }


}