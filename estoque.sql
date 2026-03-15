-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 15-Mar-2026 às 18:53
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `estoque`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `categoria`) VALUES
(5, 'OUTROS'),
(6, 'MEDICAMENTOS'),
(7, 'COSMÃ‰TICOS'),
(9, 'COMPRIMIDOS');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `codigo_barras` varchar(20) NOT NULL,
  `preco_custo` decimal(10,2) NOT NULL,
  `preco_venda` decimal(10,2) NOT NULL,
  `custo_total` decimal(10,2) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `minimo` int(11) NOT NULL,
  `maximo` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `data_entrada` date NOT NULL,
  `data_validade` date NOT NULL,
  `dataReposicao` date NOT NULL,
  `fabricante` varchar(100) NOT NULL,
  `data_saida` date NOT NULL,
  `quantidade_inicial` int(11) NOT NULL,
  `prateleira` varchar(100) NOT NULL,
  `outros` varchar(100) NOT NULL,
  `fornecedor` varchar(100) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `obs` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `codigo_barras`, `preco_custo`, `preco_venda`, `custo_total`, `quantidade`, `minimo`, `maximo`, `categoria`, `data_entrada`, `data_validade`, `dataReposicao`, `fabricante`, `data_saida`, `quantidade_inicial`, `prateleira`, `outros`, `fornecedor`, `endereco`, `telefone`, `email`, `obs`) VALUES
(8, 'POMADA PENICILINA ', '33388767665555', '1.25', '9.80', '56.25', 25, 1, 5, 'COMPRIMIDOS', '2026-02-25', '0000-00-00', '0000-00-00', '', '2026-02-26', 45, '', '', '', '', '', '', ''),
(9, 'DORFLEX', '', '0.00', '0.00', '0.00', 1, 0, 0, 'MEDICAMENTO', '2026-02-27', '0000-00-00', '0000-00-00', '', '2026-03-08', 2, '', '', '', '', '', '', ''),
(10, 'ANADOR', '223344', '0.00', '0.00', '0.00', 5, 0, 0, 'COMPRIMIDO', '2026-02-27', '0000-00-00', '0000-00-00', '', '0000-00-00', 5, '', '', '', '', '', '', ''),
(11, 'XAROPE DE TOSSE', '', '0.00', '0.00', '0.00', 9, 0, 0, 'MEDICAMENTOS', '2026-02-27', '0000-00-00', '2026-02-27', '', '2026-02-27', 10, '', '', '', '', '', '', ''),
(12, 'POMADA MINANCORA', '0987654321', '0.00', '0.00', '0.00', 20, 0, 0, 'MEDICAMENTOS', '2026-02-27', '0000-00-00', '0000-00-00', '', '0000-00-00', 20, '', '', '', '', '', '', ''),
(13, 'SONRISAL', '', '0.00', '0.00', '0.00', 12, 0, 0, 'COMPRIMIDOS', '2026-02-27', '0000-00-00', '0000-00-00', '', '0000-00-00', 12, '', '', '', '', '', '', ''),
(14, 'TESTE TECNICO', '', '0.00', '0.00', '0.00', 23, 0, 0, 'COSMÃ‰TICOS', '2026-02-27', '0000-00-00', '0000-00-00', '', '0000-00-00', 23, '', '', '', '', '', '', ''),
(15, 'DJALVA MARIA DA SILVA', '55520-000', '0.00', '0.00', '0.00', 32, 1, 0, 'COMPRIMIDOS', '2026-02-27', '0000-00-00', '0000-00-00', '', '2026-03-08', 33, '', '', '', 'RUA MANOEL DE OLIVEIRA NOVO, 14', '(81) 98864-4099', 'andersonlino7@gmail.com', ''),
(16, 'JOSE CLAUDIO XAVIER', '', '5.50', '22.30', '55.00', 10, 5, 30, 'COSMÃ‰TICOS', '2026-03-15', '0000-00-00', '0000-00-00', '', '0000-00-00', 10, '', '', '', 'RUA SAO SILVESTRE', '(81) 99638-3001', 'claudioadventista@hotmail.com', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
