-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla dism.apikey
CREATE TABLE IF NOT EXISTS `apikey` (
  `idKey` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idKey`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dism.apikey: ~1 rows (aproximadamente)
INSERT INTO `apikey` (`idKey`, `Key`) VALUES
	(3, 'clave_secreta_dism');

-- Volcando estructura para tabla dism.fichajes
CREATE TABLE IF NOT EXISTS `fichajes` (
  `IdFichaje` int NOT NULL AUTO_INCREMENT,
  `FechaHoraEntrada` datetime DEFAULT NULL,
  `FechaHoraSalida` datetime DEFAULT NULL,
  `HorasTrabajadas` int DEFAULT NULL,
  `IdTrabajo` int DEFAULT NULL,
  `IdUsuario` int DEFAULT NULL,
  `GeolocalizacionLatitud` float DEFAULT NULL,
  `GeolocalizacionLongitud` float DEFAULT NULL,
  PRIMARY KEY (`IdFichaje`),
  KEY `IdTrabajo` (`IdTrabajo`),
  KEY `IdUsuario` (`IdUsuario`),
  CONSTRAINT `fichajes_ibfk_1` FOREIGN KEY (`IdTrabajo`) REFERENCES `trabajos` (`IdTrabajo`),
  CONSTRAINT `fichajes_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dism.fichajes: ~6 rows (aproximadamente)
INSERT INTO `fichajes` (`IdFichaje`, `FechaHoraEntrada`, `FechaHoraSalida`, `HorasTrabajadas`, `IdTrabajo`, `IdUsuario`, `GeolocalizacionLatitud`, `GeolocalizacionLongitud`) VALUES
	(4, '2025-10-14 14:00:50', '2025-10-14 14:02:39', 0, 2, 2, 1, 1),
	(6, '2025-10-14 14:14:19', '2025-10-14 14:15:11', 0, 2, 2, 333, 333),
	(15, '2025-10-26 20:24:58', '2025-10-26 20:27:01', 0, 5, 5, 10, 10),
	(16, '2025-10-26 21:29:06', '2025-10-26 21:33:55', 0, 5, 5, 20, 20),
	(22, '2025-10-28 11:46:27', '2025-10-28 11:46:33', 0, 2, 2, 38.3864, -0.511503),
	(23, '2025-10-28 11:47:15', '2025-10-28 23:47:15', 12, 2, 2, 38.3864, -0.511503);

-- Volcando estructura para tabla dism.trabajos
CREATE TABLE IF NOT EXISTS `trabajos` (
  `IdTrabajo` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`IdTrabajo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dism.trabajos: ~3 rows (aproximadamente)
INSERT INTO `trabajos` (`IdTrabajo`, `Nombre`) VALUES
	(2, 'Limpieza'),
	(5, 'Cocina'),
	(8, 'Prueba1');

-- Volcando estructura para tabla dism.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Usuario` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Clave` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla dism.usuarios: ~5 rows (aproximadamente)
INSERT INTO `usuarios` (`IdUsuario`, `Nombre`, `Usuario`, `Clave`) VALUES
	(2, 'Mario Pérez', 'Mario99', '1234'),
	(5, 'Santy', 'CamSan', '5463'),
	(7, 'pru', 'pru', 'pru'),
	(8, 'Administrador del Sistema', 'Admin', '1234'),
	(9, 'Prueba', 'Prueba', 'abcd');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
