-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2025 a las 08:12:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dism`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apikey`
--

CREATE TABLE `apikey` (
  `idKey` int(11) NOT NULL,
  `Key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichajes`
--

CREATE TABLE `fichajes` (
  `IdFichaje` int(11) NOT NULL,
  `FechaHoraEntrada` datetime DEFAULT NULL,
  `FechaHoraSalida` datetime DEFAULT NULL,
  `HorasTrabajadas` int(11) DEFAULT NULL,
  `IdTrabajo` int(11) DEFAULT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `GeolocalizacionLatitud` float DEFAULT NULL,
  `GeolocalizacionLongitud` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fichajes`
--

INSERT INTO `fichajes` (`IdFichaje`, `FechaHoraEntrada`, `FechaHoraSalida`, `HorasTrabajadas`, `IdTrabajo`, `IdUsuario`, `GeolocalizacionLatitud`, `GeolocalizacionLongitud`) VALUES
(4, '2025-10-14 14:00:50', '2025-10-14 14:02:39', 0, 2, 2, 1, 1),
(6, '2025-10-14 14:14:19', '2025-10-14 14:15:11', 0, 2, 2, 333, 333),
(15, '2025-10-26 20:24:58', '2025-10-26 20:27:01', 0, 5, 5, 10, 10),
(16, '2025-10-26 21:29:06', '2025-10-26 21:33:55', 0, 5, 5, 20, 20),
(18, '2025-10-27 18:42:39', '2025-10-27 18:43:50', 0, 7, 7, 5, 5),
(21, '2025-10-28 11:16:43', '2025-10-28 23:16:43', 12, 7, 7, 38.3864, -0.511503),
(22, '2025-10-28 11:46:27', '2025-10-28 11:46:33', 0, 2, 2, 38.3864, -0.511503),
(23, '2025-10-28 11:47:15', '2025-10-28 23:47:15', 12, 2, 2, 38.3864, -0.511503);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `IdTrabajo` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajos`
--

INSERT INTO `trabajos` (`IdTrabajo`, `Nombre`) VALUES
(2, 'Limpieza'),
(5, 'Cocina'),
(7, 'Uber');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IdUsuario` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Usuario` varchar(50) DEFAULT NULL,
  `Clave` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`IdUsuario`, `Nombre`, `Usuario`, `Clave`) VALUES
(2, 'Mario Pérez', 'jperez', '1234'),
(5, 'Santy', 'CamSan', '5463'),
(7, 'pru', 'pru', 'pru');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apikey`
--
ALTER TABLE `apikey`
  ADD PRIMARY KEY (`idKey`);

--
-- Indices de la tabla `fichajes`
--
ALTER TABLE `fichajes`
  ADD PRIMARY KEY (`IdFichaje`),
  ADD KEY `IdTrabajo` (`IdTrabajo`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`IdTrabajo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apikey`
--
ALTER TABLE `apikey`
  MODIFY `idKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fichajes`
--
ALTER TABLE `fichajes`
  MODIFY `IdFichaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  MODIFY `IdTrabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fichajes`
--
ALTER TABLE `fichajes`
  ADD CONSTRAINT `fichajes_ibfk_1` FOREIGN KEY (`IdTrabajo`) REFERENCES `trabajos` (`IdTrabajo`),
  ADD CONSTRAINT `fichajes_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
