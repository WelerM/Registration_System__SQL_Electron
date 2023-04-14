-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Abr-2023 às 20:37
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `electron_reg_sys`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `document` varchar(128) NOT NULL,
  `floor` int(11) NOT NULL,
  `visit_purpose` varchar(128) NOT NULL,
  `visit_date` varchar(128) DEFAULT NULL,
  `visit_hour` varchar(128) DEFAULT NULL,
  `visit_month` varchar(128) DEFAULT NULL,
  `day` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `visitors`
--

INSERT INTO `visitors` (`id`, `name`, `document`, `floor`, `visit_purpose`, `visit_date`, `visit_hour`, `visit_month`, `day`) VALUES
(1, 'weler', '436346346', 6, 'falar com funcionários', '13/4/2023', '9:38', 'abril', 13),
(2, 'ana', '457457457', 7, 'entrega no andar', '13/4/2023', '9:55', 'abril', 13),
(3, 'carlos', '346346346', 6, 'prestação de serviços', '14/3/2023', '10:47', 'março', 14),
(4, 'alberto', '346346346', 5, 'prestação de serviços', '13/3/2023', '10:47', 'março', 13),
(5, 'maria', '2121235', 3, '', '13/4/2023', '11:12', 'abril', 13),
(6, 'josé', '3634643634', 6, 'prestação de serviços', '13/1/2023', '11:13', 'janeiro', 13),
(7, 'felicio', '456456456', 6, 'prestação de serviços', '13/4/2023', '11:13', 'abril', 13),
(8, 'Karen', '54325324534', 5, 'entrega no andar', '13/4/2023', '13:35', 'abril', 13),
(9, 'Aurelio', '54325324534', 5, 'entrega no andar', '13/4/2023', '13:35', 'abril', 13),
(436346346, 'weler', '', 6, 'falar com funcionários', '13/4/2023', '14:2', 'abril', 13),
(436346347, 'ana', '457457457', 7, 'entrega no andar', '13/4/2023', '14:3', 'abril', 13),
(436346348, 'maria', '2121235', 3, '', '14/4/2023', '8:57', 'abril', 14),
(436346349, 'Aurelio', '54325324534', 5, 'entrega no andar', '14/4/2023', '9:48', 'abril', 14),
(436346350, 'jurema', '457646546', 6, 'random services', '14/4/2023', '14:41', 'abril', 14),
(436346351, 'claudio', '6634636', 6, 'another subject', '14/4/2023', '14:41', 'abril', 14),
(436346352, 'luiza', '464646', 6, 'random services', '14/4/2023', '14:59', 'abril', 14),
(436346353, 'braga', '52332535235', 5, 'random services', '14/4/2023', '15:2', 'abril', 14),
(436346354, 'julia', '456456456', 6, 'another subject', '14/4/2023', '15:27', 'abril', 14),
(436346355, 'julia', '456456456', 6, 'another subject', '14/4/2023', '15:27', 'abril', 14);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=436346356;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
