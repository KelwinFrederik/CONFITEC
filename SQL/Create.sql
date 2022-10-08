CREATE DATABASE Cadastro

USE Cadastro

CREATE TABLE Usuarios(
	Id INT PRIMARY KEY,
	Nome VARCHAR(50),
	Sobrenome VARCHAR(50),
	Escolaridade INT,
	Email VARCHAR(100),
	DataNascimento DATETIME
)