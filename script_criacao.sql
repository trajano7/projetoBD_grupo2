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

-- Criação da tabela MateriaisDidaticos
CREATE TABLE MateriaisDidaticos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Descricao TEXT,
    Categoria VARCHAR(50),
    NumeroSerie VARCHAR(20),
    DataAquisicao DATE,
    EstadoConservacao VARCHAR(20),
    LocalizacaoFisica VARCHAR(100),
    URIFotoMaterial VARCHAR(255)
);

-- Criação da tabela Usuários
CREATE TABLE Usuarios (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50),
    Sobrenome VARCHAR(50),
    Funcao VARCHAR(60),
    Login VARCHAR(60),
    Senha VARCHAR(255), -- A senha deve ser armazenada criptografada
    URIFotoUsuario VARCHAR(255)
);

-- Criação da tabela Emprestimos
-- Criação da tabela Emprestimos
CREATE TABLE Emprestimos (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  IDUsuario BIGINT NOT NULL,
  TipoEmprestimo ENUM('Livro', 'MaterialDidatico') NOT NULL NOT NULL, -- Pode ser 'Livro' ou 'MaterialDidatico'
  ISBNLivro VARCHAR(13),
  IDMaterialDidatico INT,
  DataEmprestimo DATE NOT NULL,
  DataDevolucaoPrevista DATE,
  Status ENUM('Emprestado', 'Devolvido') NOT NULL,
  FOREIGN KEY (IDUsuario) REFERENCES Usuarios(ID),
  FOREIGN KEY (ISBNLivro) REFERENCES Livros(ISBN),
  FOREIGN KEY (IDMaterialDidatico) REFERENCES MateriaisDidaticos(ID)
);

-- Inserção de linhas na tabela Livros
INSERT INTO Livros (ISBN, Titulo, Autor, Descricao, Categoria, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URICapaLivro) VALUES (
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
INSERT INTO Livros (ISBN, Titulo, Autor, Descricao, Categoria, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URICapaLivro) VALUES (
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
INSERT INTO Livros (ISBN, Titulo, Autor, Descricao, Categoria, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URICapaLivro) VALUES (
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

-- Inserção de linhas na tabela MateriaisDidaticos
INSERT INTO MateriaisDidaticos (Descricao, Categoria, NumeroSerie, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URIFotoMaterial) VALUES (
	'Tubo de ensaio',
    'Vidraria de laboratório',
    'pvcBUzQotc7rk3R6Nigc',
    '2019-07-10',
    'Conservado',
    'Instituto de Química, Laboratório 2',
    'Tubo de ensaio'
);
INSERT INTO MateriaisDidaticos (Descricao, Categoria, NumeroSerie, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URIFotoMaterial) VALUES (
	'Copo de Becker',
    'Vidraria de laboratório',
    'QJsDQYk6Bgi6ghfjLCof',
    '2019-07-10',
    'Danificado',
    'Instituto de Química, Laboratório 2',
    'Copo de Becker'
);
INSERT INTO MateriaisDidaticos (Descricao, Categoria, NumeroSerie, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URIFotoMaterial) VALUES (
	'Balão de fundo chato',
    'Vidraria de laboratório',
    'ycgyPVhB4jtFvQZusPdF',
    '2019-07-10',
    'Conservado',
    'Instituto de Química, Laboratório 2',
    'Balão de fundo chato'
);

-- Inserção de linhas na tabela Usuarios
INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario) VALUES (
	"Davi",
    "Fernandes Gomes",
    "Estudante",
    "davi.gomes@aluno.unb.br",
    "baaf8cfd70bd7c49ecdc92f041bfb47409f90a41", -- Senha exemplo: "Salvador@Bahia246" criptografada com SHA1
    "Davi Fernandes Gomes"
);
INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario) VALUES (
	"Alex",
    "Gomes Araujo",
    "Instrutor de Laboratório",
    "alexaraujo@unb.br",
    "88738c910a06191a440839befc10fe58792dada7", -- Senha exemplo: "Lunar.Eclipse@0822" criptografada com SHA1
    "Alex Gomes Araujo"
);
INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario) VALUES (
	"Nicole",
    "Rodrigues dos Santos",
    "Professor",
    "ndossantos@unb.br",
    "68a2158f97f5b838a237a1393915d5eacf172604", -- Senha exemplo: "Prototipo#Atomico.5789" criptografada com SHA1
    "Davi Fernandes Gomes"
);

INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario) VALUES (
	"Administrador",
    "User",
    "Administrador",
    "admin@email.com",
    "$2b$12$jreYexfWZqMZrvnbetVOzeMcW5Rja8WgKvE5DW58tjQET9AvE/KIa", -- Senha exemplo: "Prototipo#Atomico.5789" criptografada com SHA1
    "Davi Fernandes Gomes"
);

-- Inserção de linhas na tabela Emprestimos
INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status) VALUES (
    1,
    'Livro',
    '9788582604618',
    NULL,
    '2022-04-22',
    '2022-05-22',
    'Devolvido'
);

INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status) VALUES (
    2,
    'Livro',
    '9786587322117',
    NULL,
    '2023-11-10',
    '2023-12-10',
    'Devolvido'
);

INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status) VALUES (
    3,
    'MaterialDidatico',
    NULL,
    1, -- Suponhamos que o ID do material didático desejado é 1 (ajuste conforme necessário)
    '2022-09-15',
    '2022-10-15',
    'Devolvido'
);

-- Novo empréstimo para o usuário 1, Livro
INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status) VALUES (
    1,
    'Livro',
    '9788522118274', -- ISBN fictício, ajuste conforme necessário
    NULL,
    '2023-01-01',
    '2023-02-01',
    'Emprestado'
);

-- Novo empréstimo para o usuário 1, Material Didático
INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status) VALUES (
    1,
    'MaterialDidatico',
    NULL,
    2, -- Suponhamos que o ID do material didático desejado é 2 (ajuste conforme necessário)
    '2023-03-01',
    '2023-04-01',
    'Emprestado'
);
