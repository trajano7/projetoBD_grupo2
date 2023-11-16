-- Criação do banco
CREATE DATABASE Laboratorio;
USE Laboratorio;

-- Criação da tabela Livros
CREATE TABLE Livros (
    ISBN VARCHAR(13) PRIMARY KEY,
    Titulo VARCHAR(255),
    Autor VARCHAR(255),
    Descricao TEXT,
    Categoria VARCHAR(50),
    DataAquisicao DATE,
    EstadoConservacao VARCHAR(20),
    LocalizacaoFisica VARCHAR(100),
    URICapaLivro VARCHAR(255)
);
-- Inserção de linhas na tabela Livros
INSERT INTO Livros VALUES (
	'9786587322117',
    "Iniciação no Laboratório de Química",
    "Daltamir Justino Maia",
    "O livro orienta sobre os primeiros passos que um aluno deve dar em um laboratório de Química, da lavagem de equipamentos (vidraria); tipos de águas; uso dos equipamentos e reagentes mais comuns; como confeccionar um relatório, fazer gráfico  em papel milimetrado e no Excel®) até o descarte dos resíduos gerados.
    Apresenta 16 experimentos trabalhando com pesagem (em balança analítica e semi-analítica); pipetagem; medição de volume; determinação do ponto de fusão, ebulição e densidade das substâncias; as técnicas de separação (filtração e destilação); extração; o uso de indicadores ácidos-bases, dentre outras técnicas.",
    "Laboratório",
    '2022-03-15',
    "Novo",
    "Instituto de Química, Laboratório 3",
	"Iniciação no Laboratório de Química Daltamir Justino Maia"
);
INSERT INTO Livros VALUES (
	'9788522118274',
    "Química geral e reações químicas - Volume 1",
    "John C Kotz, Paul M Treichel, John R Townsend, David A Treichel",
    "Esta obra fornece uma visão ampla dos princípios da química, a reatividade dos elementos químicos e seus compostos e as aplicações da química. Tenta-se mostrar a íntima relação entre as observações que os químicos fazem sobre as mudanças químicas e físicas em laboratório, e na natureza, e a maneira como tais mudanças são vistas nos níveis atômico e molecular. Além disso, tenta-se trazer o sentido de que a química não é somente uma história vívida, mas também dinâmica, com importantes desenvolvimentos novos que ocorrem a cada ano.",
    "Química",
    '2018-05-20',
    "Usado",
    "Instituto de Química, Laboratório 3",
	"Química geral e reações químicas Volume 1 John C Kotz Paul M Treichel John R Townsend David A Treichel"
);
INSERT INTO Livros VALUES (
	'9788582604618',
    "Princípios de Química: Questionando a Vida Moderna e o Meio Ambiente - 7ª Edição",
    "Peter Atkins, Loretta Jones, Leroy Laverman",
    "Princípios de Química: questionando a vida moderna e o meio ambiente, sétima edição, apresenta todos os fundamentos da química de forma clara e precisa, utilizando inúmeras ferramentas pedagógicas. O conteúdo está organizado em 85 tópicos curtos, distribuídos em 11 grupos temáticos. Esta divisão tornou o texto muito flexível e adaptável aos objetivos específicos de cada professor, permitindo a omissão de tópicos ou a ordenação dos conteúdos de acordo com o seu plano de ensino.",
    "Química",
    '2020-10-04',
    "Conservado",
    "Instituto de Química, Laboratório 3",
	"Princípios de Química: Questionando a Vida Moderna e o Meio Ambiente 7ª Edição Peter Atkins Loretta Jones Leroy Laverman"
);


-- Criação da tabela Materiais Didáticos
CREATE TABLE MateriaisDidaticos (
    ID INT PRIMARY KEY,
    Descricao TEXT,
    Categoria VARCHAR(50),
    NumeroSerie VARCHAR(20),
    DataAquisicao DATE,
    EstadoConservacao VARCHAR(20),
    LocalizacaoFisica VARCHAR(100),
    URIFotoMaterial VARCHAR(255)
);
-- Inserção de linhas na tabela MateriaisDidaticos
INSERT INTO MateriaisDidaticos VALUES (
	1,
    'Tubo de ensaio',
    'Vidraria de laboratório',
    'pvcBUzQotc7rk3R6Nigc',
    '2019-07-10',
    'Conservado',
    'Instituto de Química, Laboratório 2',
    'Tubo de ensaio'
);
INSERT INTO MateriaisDidaticos VALUES (
	2,
    'Copo de Becker',
    'Vidraria de laboratório',
    'QJsDQYk6Bgi6ghfjLCof',
    '2019-07-10',
    'Danificado',
    'Instituto de Química, Laboratório 2',
    'Copo de Becker'
);
INSERT INTO MateriaisDidaticos VALUES (
	3,
    'Balão de fundo chato',
    'Vidraria de laboratório',
    'ycgyPVhB4jtFvQZusPdF',
    '2019-07-10',
    'Conservado',
    'Instituto de Química, Laboratório 2',
    'Balão de fundo chato'
);


-- Criação da tabela Usuários
CREATE TABLE Usuarios (
    ID BIGINT PRIMARY KEY,
    Nome VARCHAR(50),
    Sobrenome VARCHAR(50),
    Funcao VARCHAR(60),
    Login VARCHAR(60),
    Senha VARCHAR(255), -- A senha deve ser armazenada criptografada
    URIFotoUsuario VARCHAR(255)
);
-- Inserção de linhas na tabela Usuarios
INSERT INTO Usuarios VALUES (
	20200115678,
    "Davi",
    "Fernandes Gomes",
    "Estudante",
    "davi.gomes@aluno.unb.br",
    "baaf8cfd70bd7c49ecdc92f041bfb47409f90a41", -- Senha exemplo: "Salvador@Bahia246" criptografada com SHA1
    "Davi Fernandes Gomes"
);
INSERT INTO Usuarios VALUES (
	813311718,
    "Alex",
    "Gomes Araujo",
    "Instrutor de Laboratório",
    "alexaraujo@unb.br",
    "88738c910a06191a440839befc10fe58792dada7", -- Senha exemplo: "Lunar.Eclipse@0822" criptografada com SHA1
    "Alex Gomes Araujo"
);
INSERT INTO Usuarios VALUES (
	291534041,
    "Nicole",
    "Rodrigues dos Santos",
    "Professor",
    "ndossantos@unb.br",
    "68a2158f97f5b838a237a1393915d5eacf172604", -- Senha exemplo: "Prototipo#Atomico.5789" criptografada com SHA1
    "Davi Fernandes Gomes"
);


-- Criação da tabela Empréstimos
CREATE TABLE Emprestimos (
    ID INT PRIMARY KEY,
    IDUsuario BIGINT,
    IDItem INT,
    DataEmprestimo DATE,
    DataDevolucaoPrevista DATE,
    Status VARCHAR(20),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (IDItem) REFERENCES MateriaisDidaticos(ID)
);
-- Inserção de linhas na tabela Emprestimos
INSERT INTO Emprestimos VALUES (
	235,
    20200115678,
    3,
    '2022-04-22',
    '2022-05-22',
    "Devolvido"
);
INSERT INTO Emprestimos VALUES (
	444,
    20200115678,
    1,
    '2023-11-10',
    '2023-12-10',
    "Emprestado"
);
INSERT INTO Emprestimos VALUES (
	350,
    813311718,
    2,
    '2022-09-15',
    '2022-10-15',
    "Não devolvido"
);

