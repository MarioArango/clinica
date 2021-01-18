-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: clinica
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `dia` enum('Lunes','Martes','Miercoles','Jueves','Sabado','Domingo') NOT NULL,
  `hora_cita` datetime NOT NULL,
  `observacion` text,
  `hora_registro` datetime NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `id_paciente_idx` (`id_paciente`),
  KEY `id_medico_idx` (`id_medico`),
  CONSTRAINT `id_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  CONSTRAINT `id_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` datetime NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `id_persona` int(11) NOT NULL,
  PRIMARY KEY (`id_medico`),
  KEY `id_persona_idx` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (4,'2020-01-14 20:05:20','Medico Cirujano',15),(6,'2020-01-05 00:00:00','Medico Cirujano',17),(7,'2020-01-05 00:00:00','Medico pediatra',19),(10,'2020-01-05 00:00:00','Medico pediatra',23),(11,'2020-01-05 00:00:00','Medico pediatra',25),(12,'2020-01-05 00:00:00','Medico pediatra',27),(14,'2020-01-10 08:00:12','Traumatologa',30),(15,'2020-01-10 08:00:12','Traumatologa',31),(16,'2020-01-05 00:00:00','Medico pediatra',32),(18,'2021-01-16 00:00:00','Oftalmologo',39),(19,'2021-01-16 00:00:00','Oftalmologo',40),(20,'2021-01-16 00:00:00','Oftalmologo',41),(21,'2021-01-16 00:00:00','Oftalmologo',42),(22,'2021-01-16 00:00:00','Oftalmologo',43),(23,'2021-01-16 00:00:00','Dentista',44),(24,'2021-01-16 00:00:00','Dentista',45);
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL AUTO_INCREMENT,
  `telefono` varchar(9) DEFAULT NULL,
  `id_persona` int(11) NOT NULL,
  PRIMARY KEY (`id_paciente`),
  UNIQUE KEY `id_persona_UNIQUE` (`id_persona`),
  CONSTRAINT `id_persona` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'966284096',1),(2,'935284968',2),(6,'988563248',34),(8,'988562746',36),(9,'988562746',37),(10,'955843988',46),(11,'966584586',47);
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `id_persona` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) NOT NULL,
  `edad` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'Mario','Arango','Cupe',25,'72935585'),(2,'Luis','Paredes','Atencio',24,'72583956'),(6,'Renato','Palomino','Quiroz',42,'85626687'),(8,'Renato','Palomino','Quiroz',42,'85116687'),(10,'Renato','Palomino','Quiroz',42,'85116387'),(15,'Renata','Palomares','Quiroz',28,'75953384'),(17,'Diego','Paredes','Rosas',22,'75958853'),(19,'Juan','Polinario','Alvares',28,'75958852'),(23,'Juan','Polinario','Alvares',28,'75958811'),(25,'Juan','Polinario','Alvares',28,'75958111'),(27,'Juan','Polinario','Alvares',28,'75958112'),(30,'Paola','Dominguez','Cumpa',36,'85166371'),(31,'Paola','Dominguez','Cumpa',36,'85176371'),(32,'Juan','Polinario','Alvares',28,'75958119'),(34,'Pedro','Quispe','Alvares',30,'75958222'),(36,'Pedro','Quispe','Alvares',30,'75958212'),(37,'Pedro','Quispe','Alvares',30,'75958212'),(39,'Mario','Aran','Cup',18,'75968841'),(40,'Mario','Aran','Cup',18,'75968841'),(41,'Mario','Arango','Cuper',28,'75968822'),(42,'Mario','Arango','Cuper',28,'7596882'),(43,'Mario','Arango','Cuper',28,'75968828'),(44,'mario','arango','cupe',24,'75895368'),(45,'mariooo','arango','cupe',24,'75895377'),(46,'Diego','Paredes','Rosas',22,'75962843'),(47,'Mario','Aranggg','CUpp',28,'75963842');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'clinica'
--

--
-- Dumping routines for database 'clinica'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_DELETE_EliminarMedico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETE_EliminarMedico`(
	_id_persona INT
)
BEGIN
	DELETE medicos, personas
    FROM medicos
    JOIN personas 
    ON medicos.id_persona = personas.id_persona
    WHERE personas.id_persona = _id_persona; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DELETE_EliminarPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DELETE_EliminarPaciente`(
	_id_persona INT
)
BEGIN
	DELETE pacientes, personas
    FROM pacientes
    JOIN personas 
    ON pacientes.id_persona = personas.id_persona
    WHERE personas.id_persona = _id_persona; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GET_ListarMedicos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GET_ListarMedicos`()
BEGIN
	SELECT me.id_medico, pe.id_persona, pe.nombre, pe.apellido_paterno, 
		   pe.apellido_materno, pe.dni, pe.edad, 
    me.fecha_ingreso, me.especialidad FROM
    personas AS pe
    JOIN medicos AS me
    ON pe.id_persona = me.id_persona;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GET_ListarPacientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GET_ListarPacientes`()
BEGIN
	SELECT pa.id_paciente, pe.id_persona, pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.dni, pe.edad, pa.telefono FROM
    personas AS pe
    JOIN pacientes AS pa
    ON pe.id_persona = pa.id_persona;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_POST_AgregarMedico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_POST_AgregarMedico`(
	_nombre VARCHAR(50),
    _apellido_paterno VARCHAR(30),
    _apellido_materno VARCHAR(30),
    _edad INT,
    _dni VARCHAR(8),
    _fecha_ingreso DATETIME,
    _especialidad VARCHAR(50)
)
BEGIN
	START TRANSACTION;
		INSERT INTO personas(nombre, apellido_paterno, apellido_materno, edad, dni)
		VALUES(_nombre, _apellido_paterno, _apellido_materno, _edad, _dni);
        
		INSERT INTO medicos(fecha_ingreso, especialidad, id_persona) 
        VALUES(_fecha_ingreso, _especialidad, LAST_INSERT_ID());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_POST_AgregarPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_POST_AgregarPaciente`(
	_nombre VARCHAR(50),
    _apellido_paterno VARCHAR(30),
    _apellido_materno VARCHAR(30),
    _edad INT,
    _dni VARCHAR(8),
    _telefono VARCHAR(9)
)
BEGIN
	START TRANSACTION;
		INSERT INTO personas(nombre, apellido_paterno, apellido_materno, edad, dni)
		VALUES(_nombre, _apellido_paterno, _apellido_materno, _edad, _dni);
        
		INSERT INTO pacientes(telefono, id_persona) VALUES(_telefono, LAST_INSERT_ID());
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_POST_BuscarMedicoDNI` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_POST_BuscarMedicoDNI`(
	_dni VARCHAR(8)
)
BEGIN
	SELECT me.id_medico, pe.id_persona, pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.dni, pe.edad, 
    me.fecha_ingreso, me.especialidad FROM
    personas AS pe
    JOIN medicos AS me
    ON pe.id_persona = me.id_persona
    WHERE pe.dni = _dni;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_POST_BuscarPacienteDNI` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_POST_BuscarPacienteDNI`(
	_dni VARCHAR(8)
)
BEGIN
	SELECT pa.id_paciente, pe.id_persona, pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.dni, pe.edad, pa.telefono FROM
    personas AS pe
    JOIN pacientes AS pa
    ON pe.id_persona = pa.id_persona
    WHERE pe.dni = _dni;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_POST_PersonaRegistrada` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_POST_PersonaRegistrada`(
	_dni VARCHAR(8)
)
BEGIN
	SELECT*FROM
    personas AS pe
    WHERE pe.dni = _dni;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_PUT_ActualizarMedico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PUT_ActualizarMedico`(
	_id_medico INT,
    _id_persona INT,
	_nombre VARCHAR(50),
    _apellido_paterno VARCHAR(30),
    _apellido_materno VARCHAR(30),
	_edad INT,
	_dni VARCHAR(8),
	_especialidad VARCHAR(50)
)
BEGIN
	UPDATE personas, medicos
    JOIN personas AS pe
    ON pe.id_persona = medicos.id_persona
    SET pe.nombre = _nombre,
		pe.apellido_paterno = _apellido_paterno,
        pe.apellido_materno = _apellido_materno,
        pe.edad = _edad,
        pe.dni = _dni,
        medicos.especialidad = _especialidad
	WHERE pe.id_persona = _id_persona;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_PUT_ActualizarPaciente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PUT_ActualizarPaciente`(
	_id_paciente INT,
    _id_persona INT,
	_nombre VARCHAR(50),
    _apellido_paterno VARCHAR(30),
    _apellido_materno VARCHAR(30),
	_edad INT,
	_dni VARCHAR(8),
	_telefono VARCHAR(9)
)
BEGIN
	UPDATE personas, pacientes
    JOIN personas AS pe
    ON pe.id_persona = pacientes.id_persona
    SET pe.nombre = _nombre,
		pe.apellido_paterno = _apellido_paterno,
        pe.apellido_materno = _apellido_materno,
        pe.edad = _edad,
        pe.dni = _dni,
        pacientes.telefono = _telefono
	WHERE pe.id_persona = _id_persona;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-17 20:05:32
