-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2026 a las 13:58:21
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `games_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_genres`
--

CREATE TABLE `game_genres` (
  `id` int(10) NOT NULL,
  `genre_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `game_genres`
--

INSERT INTO `game_genres` (`id`, `genre_name`) VALUES
(1, 'RPG'),
(2, 'Plataforma'),
(3, 'Supervivencia'),
(4, 'Tower Defense'),
(5, 'MMORPG'),
(6, 'Horror'),
(7, 'Terror'),
(8, 'Mundo Abierto'),
(9, 'Rogue like');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_games`
--

CREATE TABLE `personal_games` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `developer` varchar(50) NOT NULL,
  `genre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personal_games`
--

INSERT INTO `personal_games` (`id`, `name`, `developer`, `genre_id`) VALUES
(1, 'Elden Ring', 'FromSoftware', 5),
(2, 'Fear & Hunger', 'Miro Haverinen', 1),
(3, 'Geometry Dash', 'Robtop Games', 2),
(4, 'Minecraft', 'Mojang Studios', 3),
(5, 'Plants vs zombies', 'Popcap', 4),
(6, 'Phasmophobia', ' Kinetic Games', 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `game_genres`
--
ALTER TABLE `game_genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personal_games`
--
ALTER TABLE `personal_games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_genre` (`genre_id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `personal_games`
--
ALTER TABLE `personal_games`
  ADD CONSTRAINT `fk_genre` FOREIGN KEY (`genre_id`) REFERENCES `game_genres` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
