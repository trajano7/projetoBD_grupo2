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
-- Inserção de linhas na tabela Usuarios

INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario) VALUES (
	"Administrador",
    "User",
    "Administrador",
    "admin@email.com",
    "$2b$12$jreYexfWZqMZrvnbetVOzeMcW5Rja8WgKvE5DW58tjQET9AvE/KIa", -- Senha exemplo: "Prototipo#Atomico.5789" criptografada com SHA1
    "Davi Fernandes Gomes"
);

