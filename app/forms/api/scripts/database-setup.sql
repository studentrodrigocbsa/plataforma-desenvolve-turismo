DROP DATABASE IF EXISTS tcc_base_dados_respondente_token;
CREATE DATABASE tcc_base_dados_respondente_token;
USE tcc_base_dados_respondente_token;

DROP USER IF EXISTS 'tcc'@'localhost';
CREATE USER 'tcc'@'localhost' IDENTIFIED BY 'tcc';
GRANT ALL PRIVILEGES ON `tcc_base_dados_respondente_token`.* TO 'tcc'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'tcc'@'localhost';


CREATE TABLE login(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(40) NOT NULL,
    senha VARCHAR(200) NOT NULL,
    CONSTRAINT unq_usuario__usuario UNIQUE (usuario)
) ENGINE=INNODB;

CREATE TABLE link(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(100) NOT NULL,
    usuario INT NOT NULL,
    situacao ENUM('Ativa','Concluída') NOT NULL DEFAULT 'Ativa',
    apelido VARCHAR(50),
    CONSTRAINT fk_link__usuario FOREIGN KEY (usuario) REFERENCES login(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE survey(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(100) NOT NULL
) ENGINE=INNODB;

CREATE TABLE pergunta(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ordem INT NOT NULL,
    titulo VARCHAR(250) NOT NULL,
    detalhes VARCHAR(500),
    survey INT NOT NULL,
    CONSTRAINT unq_pergunta__titulo UNIQUE (titulo),
    CONSTRAINT fk_pergunta__survey FOREIGN KEY (survey) REFERENCES survey(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE opcao(
    pergunta INT NOT NULL,
    opcao VARCHAR(50) NOT NULL,
    CONSTRAINT fk_opcao__pergunta FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE respondente(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    perfil ENUM('Gestor','Visitante','Residente Local') NOT NULL,
    faixa_etaria ENUM('18...21','22...25','26...29','30...33','34...37','38...41','42+') NOT NULL,
    escolaridade ENUM('Ensino Fundamental incompleto','Ensino Fundamental completo','Ensino Médio incompleto','Ensino Médio completo','Ensino Superior incompleto','Ensino Superior completo','Pós-graduação incompleto','Pós-graduação completo','Sem formação') NOT NULL,
    cargo ENUM('Operacional','Gerencial','Administrativo','Nenhum') DEFAULT 'Nenhum' NOT NULL,
    nota INT NOT NULL DEFAULT 0
) ENGINE=INNODB;

CREATE TABLE escolha(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    respondente INT NOT NULL,
    pergunta INT NOT NULL,
    opcao VARCHAR(50) NOT NULL,
    link INT NOT NULL,
    CONSTRAINT fk_respondente__token FOREIGN KEY (link) REFERENCES link(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_escolha__respondente FOREIGN KEY (respondente) REFERENCES respondente(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_escolha__pergunta FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;



/* Dados para configuração inicial do app experimental */
INSERT INTO login(usuario,senha) VALUES ("demonstracao","demonstracao");

INSERT INTO survey(categoria) VALUES ('Acessibilidade Atitudinal - Escala de Capacitismo');

INSERT INTO pergunta (ordem,titulo,survey) 
    VALUES 
        (1,"As pessoas com deficiência têm conseguido mais do que merecem",1),
        (2,"As pessoas com deficiência recebem muito respeito e consideração",1),
        (3,"Elas são exigentes em relação aos seus direitos",1),
        (4,"A discriminação dessas pessoas é um problema no Brasil",1),
        (5,"As pessoas com deficiência têm muita influência política",1),
        (6,"Quando se esforçam, pessoas com deficiência acabam não necessitando de ajuda",1),
        (7,"As pessoas com deficiência devem superar eventuais preconceitos sem apoio como aconteceu com outros grupos",1),
        (8,"Tem-se dado demasiada importância aos movimentos de protesto de pessoas com deficiência",1),
        (9,"Parece pouco prudente dar importância às suas queixas",1),
        (10,"Pessoas com deficiência possuem uma beleza diferente",1),
        (11,"Pessoas com deficiência dificultam a prestação de serviços das empresas de turismo",1),
        (12,"Pessoas com deficiência devem ser tratadas de modo diferente por serem diferentes",1),
        (13,"A maioria das pessoas com deficiência são incapazes de fazer turismo sozinhas (sem companhia)",1),
        (14,"Os prestadores de serviços turísticos gastam mais para atendê-las",1),
        (15,"Outros visitantes se incomodam em compartilhar os equipamentos e/ou ambientes com essas pessoas",1);

INSERT INTO opcao (pergunta, opcao) 
    VALUES 
        (1,'Discordo Totalmente'),
        (1,'Discordo'),
        (1,'Nem Concordo/Nem Discordo'),
        (1,'Concordo'),
        (1,'Concordo Totalmente'),

        (2,'Discordo Totalmente'),
        (2,'Discordo'),
        (2,'Nem Concordo/Nem Discordo'),
        (2,'Concordo'),
        (2,'Concordo Totalmente'),

        (3,'Discordo Totalmente'),
        (3,'Discordo'),
        (3,'Nem Concordo/Nem Discordo'),
        (3,'Concordo'),
        (3,'Concordo Totalmente'),

        (4,'Discordo Totalmente'),
        (4,'Discordo'),
        (4,'Nem Concordo/Nem Discordo'),
        (4,'Concordo'),
        (4,'Concordo Totalmente'),

        (5,'Discordo Totalmente'),
        (5,'Discordo'),
        (5,'Nem Concordo/Nem Discordo'),
        (5,'Concordo'),
        (5,'Concordo Totalmente'),

        (6,'Discordo Totalmente'),
        (6,'Discordo'),
        (6,'Nem Concordo/Nem Discordo'),
        (6,'Concordo'),
        (6,'Concordo Totalmente'),

        (7,'Discordo Totalmente'),
        (7,'Discordo'),
        (7,'Nem Concordo/Nem Discordo'),
        (7,'Concordo'),
        (7,'Concordo Totalmente'),

        (8,'Discordo Totalmente'),
        (8,'Discordo'),
        (8,'Nem Concordo/Nem Discordo'),
        (8,'Concordo'),
        (8,'Concordo Totalmente'),

        (9,'Discordo Totalmente'),
        (9,'Discordo'),
        (9,'Nem Concordo/Nem Discordo'),
        (9,'Concordo'),
        (9,'Concordo Totalmente'),

        (10,'Discordo Totalmente'),
        (10,'Discordo'),
        (10,'Nem Concordo/Nem Discordo'),
        (10,'Concordo'),
        (10,'Concordo Totalmente'),

        (11,'Discordo Totalmente'),
        (11,'Discordo'),
        (11,'Nem Concordo/Nem Discordo'),
        (11,'Concordo'),
        (11,'Concordo Totalmente'),

        (12,'Discordo Totalmente'),
        (12,'Discordo'),
        (12,'Nem Concordo/Nem Discordo'),
        (12,'Concordo'),
        (12,'Concordo Totalmente'),

        (13,'Discordo Totalmente'),
        (13,'Discordo'),
        (13,'Nem Concordo/Nem Discordo'),
        (13,'Concordo'),
        (13,'Concordo Totalmente'),

        (14,'Discordo Totalmente'),
        (14,'Discordo'),
        (14,'Nem Concordo/Nem Discordo'),
        (14,'Concordo'),
        (14,'Concordo Totalmente'),

        (15,'Discordo Totalmente'),
        (15,'Discordo'),
        (15,'Nem Concordo/Nem Discordo'),
        (15,'Concordo'),
        (15,'Concordo Totalmente');

