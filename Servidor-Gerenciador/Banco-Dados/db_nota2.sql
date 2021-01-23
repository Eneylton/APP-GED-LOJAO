-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Jan-2021 às 20:53
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_nota2`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedor`
--

INSERT INTO `fornecedor` (`id`, `nome`, `email`, `foto`) VALUES
(1, 'tert', 'rtretertr', './imgs/img_user2021-01-07_10_30_34.jpg'),
(2, 'ene', '123', './imgs/img_user2021-01-07_10_33_27.jpg'),
(3, 'teste ltda', 'teste@gmail.com', './imgs/img_user2021-01-07_10_36_37.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `fornecedor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `funcionario`
--

INSERT INTO `funcionario` (`id`, `nome`, `cpf`, `fornecedor_id`) VALUES
(1, 'ene', '123', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `galeria`
--

CREATE TABLE `galeria` (
  `id` int(11) NOT NULL,
  `foto` varchar(225) DEFAULT NULL,
  `nota_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `galeria`
--

INSERT INTO `galeria` (`id`, `foto`, `nota_id`) VALUES
(1, './imgs/img_user2021-01-15_10_02_52.jpg', 18),
(2, './imgs/img_user2021-01-15_10_02_55.jpg', 18),
(3, './imgs/img_user2021-01-15_11_11_17.jpg', 18),
(4, './imgs/img_user2021-01-15_11_11_20.jpg', 18),
(5, './imgs/img_user2021-01-15_15_17_02.jpg', 18),
(6, './imgs/img_user2021-01-15_15_17_03.jpg', 18),
(7, './imgs/img_user2021-01-15_15_17_06.jpg', 18);

-- --------------------------------------------------------

--
-- Estrutura da tabela `nota`
--

CREATE TABLE `nota` (
  `id` int(11) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `data_recebimento` timestamp NULL DEFAULT current_timestamp(),
  `usuario_id` int(11) NOT NULL,
  `fornecedor_id` int(11) NOT NULL,
  `funcionario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `nota`
--

INSERT INTO `nota` (`id`, `numero`, `data_recebimento`, `usuario_id`, `fornecedor_id`, `funcionario_id`) VALUES
(18, 125361, '2021-01-08 20:28:46', 1, 2, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `sobrenome` varchar(50) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `nivel` varchar(45) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `sobrenome`, `email`, `telefone`, `endereco`, `cep`, `numero`, `bairro`, `cidade`, `estado`, `complemento`, `usuario`, `senha`, `nivel`, `genero`) VALUES
(1, 'Eneylton ', 'Barros', 'eneylton@hotmail.com', '9899158-1962', 'Rua 03', '65054530', '36', 'Cohatrac IV ', 'São Luis', 'MA', 'Proximo a Praça Verão', 'ene', '202cb962ac59075b964b07152d234b70', 'admin', 'Masculino'),
(13, 'Ana Cristina ', 'Maria', 'anamaria@gmail.com', '9876456789', 'Rua Treze', '65054700', '78', 'Cohatrac III', 'São Luís', 'MA', 'Proxima a igreja', 'ana', '7363a0d0604902af7b70b271a0b96480', 'atendente', 'Feminino'),
(19, 'Davi Mateus ', 'Araújo Maciel ', 'araujomacieldavimateus@gmail.com', '988285212', 'Avenida 10 quadra j casa 2a cohabiano 2', '65110000', '2a', 'Vohaboano 2', 'São José de Ribamar', 'MA', '', 'Davi Mateus 97', 'ee572aaa9b8c16c5b7cf4d37b23667e7', 'admin', 'Masculino');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_funcionario_fornecedor1_idx` (`fornecedor_id`);

--
-- Índices para tabela `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_galeria_nota1_idx` (`nota_id`);

--
-- Índices para tabela `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_nota_usuario_idx` (`usuario_id`),
  ADD KEY `fk_nota_fornecedor1_idx` (`fornecedor_id`),
  ADD KEY `fk_nota_funcionario1_idx` (`funcionario_id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `nota`
--
ALTER TABLE `nota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD CONSTRAINT `fk_funcionario_fornecedor1` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `galeria`
--
ALTER TABLE `galeria`
  ADD CONSTRAINT `fk_galeria_nota1` FOREIGN KEY (`nota_id`) REFERENCES `nota` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `fk_nota_fornecedor1` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nota_funcionario1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nota_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
