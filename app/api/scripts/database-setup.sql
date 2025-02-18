DROP DATABASE IF EXISTS tcc_base;
CREATE DATABASE tcc_base;
USE tcc_base;



CREATE TABLE pergunta(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(250) NOT NULL,
    CONSTRAINT unq_pergunta__titulo UNIQUE (titulo)
) ENGINE=INNODB;

CREATE TABLE opcao(
    pergunta INT NOT NULL,
    opcao VARCHAR(50) NOT NULL,
    votos INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_opcao__pergunta FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE respondente(
    tipo ENUM('Gestor','Visitante','Residente Local') NOT NULL,
    pergunta INT NOT NULL,
    CONSTRAINT fk_respondente__pergunta FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

INSERT INTO pergunta (titulo) 
    VALUES 
        ("As pessoas com deficiência têm conseguido mais do que merecem"),
        ("As pessoas com deficiência recebem muito respeito e consideração"),
        ("Elas são exigentes em relação aos seus direitos"),
        ("A discriminação dessas pessoas é um problema no Brasil"),
        ("As pessoas com deficiência têm muita influência política"),
        ("Quando se esforçam, pessoas com deficiência acabam não necessitando de ajuda"),
        ("As pessoas com deficiência devem superar eventuais preconceitos sem apoio como aconteceu com outros grupos"),
        ("Tem-se dado demasiada importância aos movimentos de protesto de pessoas com deficiência"),
        ("Parece pouco prudente dar importância às suas queixas"),
        ("Pessoas com deficiência possuem uma beleza diferente"),
        ("Pessoas com deficiência dificultam a prestação de serviços das empresas de turismo"),
        ("Pessoas com deficiência devem ser tratadas de modo diferente por serem diferentes"),
        ("A maioria das pessoas com deficiência são incapazes de fazer turismo sozinhas (sem companhia)"),
        ("Os prestadores de serviços turísticos gastam mais para atendê-las"),
        ("Outros visitantes se incomodam em compartilhar os equipamentos e/ou ambientes com essas pessoas");

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

INSERT INTO respondente 
    VALUES 
        ('Visitante',1),
        ('Visitante',2),
        ('Visitante',3),
        ('Visitante',4),
        ('Visitante',5),
        ('Visitante',6),
        ('Visitante',7),
        ('Visitante',8),
        ('Visitante',9),
        ('Visitante',10),
        ('Visitante',11),
        ('Visitante',12),
        ('Visitante',13),
        ('Visitante',14),
        ('Visitante',15);
