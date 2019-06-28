-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 159.8.125.139    Database: vooom
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category`
(
  `id` int
(11) NOT NULL,
  `name` varchar
(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactPerson`
--

DROP TABLE IF EXISTS `contactPerson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactPerson`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `store_id` int
(11) DEFAULT NULL,
  `email` varchar
(255) DEFAULT NULL,
  `name` varchar
(255) DEFAULT NULL,
  `phone` varchar
(255) DEFAULT NULL,
  `mobile` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactPerson`
--

LOCK TABLES `contactPerson` WRITE;
/*!40000 ALTER TABLE `contactPerson` DISABLE KEYS */;
/*!40000 ALTER TABLE `contactPerson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers`
(
  `id` int
(11) NOT NULL,
  `name` varchar
(255) DEFAULT NULL,
  `address` varchar
(255) DEFAULT NULL,
  `phone` varchar
(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryRequests`
--

DROP TABLE IF EXISTS `deliveryRequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deliveryRequests`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `from_address` varchar
(255) DEFAULT NULL,
  `to_address` varchar
(255) DEFAULT NULL,
  `type` int
(11) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP,
  `delivered_date
` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryRequests`
--

LOCK TABLES `deliveryRequests` WRITE;
/*!40000 ALTER TABLE `deliveryRequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliveryRequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `earningsReport`
--

DROP TABLE IF EXISTS `earningsReport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `earningsReport`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `order_id` int
(11) DEFAULT NULL,
  `totals` int
(11) DEFAULT NULL,
  `reveneu` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `earningsReport`
--

LOCK TABLES `earningsReport` WRITE;
/*!40000 ALTER TABLE `earningsReport` DISABLE KEYS */;
/*!40000 ALTER TABLE `earningsReport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `barcode` text,
  `name` varchar
(255) DEFAULT NULL,
  `image` text,
  `status` tinyint
(4) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `
product`
VALUES
  (1, '12345678', NULL, 'uploads/products/2/u92 (copy).png', NULL),
  (2, '12345678', NULL, 'uploads/products/3/u92 (copy).png', NULL),
  (3, '12345678', NULL, 'uploads/products/4/u92 (copy).png', NULL),
  (4, '12345678', NULL, 'uploads/products/5/u92 (copy).png', NULL),
  (5, '12345678', NULL, 'uploads/products/6/u92 (copy).png', NULL),
  (6, '12345678', NULL, 'uploads/products/7/u92 (copy).png', NULL),
  (7, '12345678', NULL, 'uploads/products/8/u92 (copy).png', NULL),
  (8, '12345678', NULL, 'uploads/products/9/u92 (copy).png', NULL),
  (9, '12345678', NULL, 'uploads/products/10/u92 (copy).png', NULL),
  (10, '12345678', NULL, 'uploads/products/11/u92 (copy).png', NULL),
  (11, '12345678', NULL, 'uploads/products/12/u92 (copy).png', NULL),
  (12, '12345678', NULL, 'uploads/products/13/u92 (copy).png', NULL),
  (13, '12345678', NULL, 'uploads/products/14/u92 (copy).png', NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSubCategory`
--

DROP TABLE IF EXISTS `productSubCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productSubCategory`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `product_id` int
(11) DEFAULT NULL,
  `sub_category_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSubCategory`
--

LOCK TABLES `productSubCategory` WRITE;
/*!40000 ALTER TABLE `productSubCategory` DISABLE KEYS */;
INSERT INTO `
productSubCategory`
VALUES
  (1, 10, 1),
  (2, 10, 2),
  (3, 11, 1),
  (4, 11, 2),
  (5, 12, 1),
  (6, 12, 2),
  (7, 13, 2),
  (8, 13, 3);
/*!40000 ALTER TABLE `productSubCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) DEFAULT NULL,
  `logo` text,
  `description` text,
  `storeAddress_id` int
(11) DEFAULT NULL,
  `storeType_id` int
(11) DEFAULT NULL,
  `vendor_id` int
(11) DEFAULT NULL,
  `storeSocialData_id` int
(11) DEFAULT NULL,
  `status` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `
store`
VALUES
  (1, 'test4', 'test4', 'test4', 1, 0, 1, 1, 0),
  (3, 'test2', 'test', 'test', 1, 0, 1, 1, 0),
  (4, 'test2', 'test', 'test', 1, 0, 1, 1, 0),
  (5, 'test2', 'test', 'test', 1, 0, 1, 1, 0);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeAddress`
--

DROP TABLE IF EXISTS `storeAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeAddress`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `lat` varchar
(255) DEFAULT NULL,
  `lng` varchar
(255) DEFAULT NULL,
  `street` varchar
(255) DEFAULT NULL,
  `area` varchar
(255) DEFAULT NULL,
  `city` varchar
(255) DEFAULT NULL,
  `zipCode` int
(11) DEFAULT NULL,
  `special_marque` varchar
(255) DEFAULT NULL,
  `store_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeAddress`
--

LOCK TABLES `storeAddress` WRITE;
/*!40000 ALTER TABLE `storeAddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `storeAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeContact`
--

DROP TABLE IF EXISTS `storeContact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeContact`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `store_id` int
(11) DEFAULT NULL,
  `email` varchar
(255) DEFAULT NULL,
  `phone` varchar
(255) DEFAULT NULL,
  `mobile` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeContact`
--

LOCK TABLES `storeContact` WRITE;
/*!40000 ALTER TABLE `storeContact` DISABLE KEYS */;
INSERT INTO `
storeContact`
VALUES
  (1, 1, '1', '11', '1'),
  (2, 1, '1', '1', '1');
/*!40000 ALTER TABLE `storeContact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeProduct`
--

DROP TABLE IF EXISTS `storeProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeProduct`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `product_id` int
(11) DEFAULT NULL,
  `store_id` int
(11) DEFAULT NULL,
  `price` int
(11) DEFAULT NULL,
  `quantity` int
(11) DEFAULT NULL,
  `status` tinyint
(4) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeProduct`
--

LOCK TABLES `storeProduct` WRITE;
/*!40000 ALTER TABLE `storeProduct` DISABLE KEYS */;
INSERT INTO `
storeProduct`
VALUES
  (1, 11, 1, 50, NULL, NULL),
  (2, 12, 1, 20, NULL, NULL),
  (3, 13, 1, 10, NULL, NULL);
/*!40000 ALTER TABLE `storeProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeSocialData`
--

DROP TABLE IF EXISTS `storeSocialData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeSocialData`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `facebook` text,
  `twitter` text,
  `instagram` text,
  `youtube` text,
  `store_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeSocialData`
--

LOCK TABLES `storeSocialData` WRITE;
/*!40000 ALTER TABLE `storeSocialData` DISABLE KEYS */;
/*!40000 ALTER TABLE `storeSocialData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeType`
--

DROP TABLE IF EXISTS `storeType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeType`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeType`
--

LOCK TABLES `storeType` WRITE;
/*!40000 ALTER TABLE `storeType` DISABLE KEYS */;
/*!40000 ALTER TABLE `storeType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subCategory`
--

DROP TABLE IF EXISTS `subCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subCategory`
(
  `id` int
(11) NOT NULL,
  `name` varchar
(255) DEFAULT NULL,
  `category_id` int
(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subCategory`
--

LOCK TABLES `subCategory` WRITE;
/*!40000 ALTER TABLE `subCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `subCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) DEFAULT NULL,
  `userName` varchar
(150) DEFAULT NULL,
  `password` varchar
(255) DEFAULT NULL,
  `type` int
(11) DEFAULT NULL,
  `uid` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE KEY `userName`
(`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`
VALUES
  (1, 'cddd', 'MK', '$2a$10$753Og0bOmHe4AfdMXE4xseXfYMPceD/WcbBRIIyK645HtjVXrdijO', 1, 0),
  (25, '12345678', '12345678', '$2a$10$XpNs3VEOzNzysDA0IUKUZekTWDqmvuUiah6uv26./3pPMY4PWRiIa', 1, 1),
  (28, NULL, '123456789', '$2a$10$SssFQbU3yZU0zWB5ELXZFe3SWhZILEYDVi6M/B9f2jpyF4R/OlHJ.', NULL, NULL),
  (29, '1234567890', '1234567890', '$2a$10$WURCvhXozcscdTgaAyqwaenq2PbP8V91Votc9vmkFUrRfxUswAJc6', NULL, NULL),
  (30, '12345678900', '12345678900', '$2a$10$yPssKTRJjwvhmEZoIcpu.eogyuB4nwvfcIDXajzw3mj4HsY799LJq', 1, NULL),
  (32, '123456789000', '123456789000', '$2a$10$WNKmWqAk1p/sh3KkCEYNseafMA4jYTs7.D/my0XTgSIFgpSrYKwwi', 1, NULL),
  (33, '1234567890001', '1234567890001', '$2a$10$NT12Bygq4OhglNQVfqQP/uW8LPElWqcPzOwLHDIHAybQaStmITwOO', 1, NULL),
  (35, '12345678900012', '12345678900012', '$2a$10$QRsQdlrecPsdGnviA0xSfONj3AzxqW5e5f6wszpsvmzzdioZlecHy', 1, NULL),
  (39, '123456789000123', '123456789000123', '$2a$10$6LWzzh8gS4k7Yiw.oB4xbOfBo98pZj5ZXuMerL8OFxTEBIomw74N2', 1, NULL),
  (40, '1234567890001234', '1234567890001234', '$2a$10$bLM4x5ASZfU/VboLXiOpHun0WNS4VNX4WKyIk2ESuf2MPcLilS1d2', 1, NULL),
  (41, '12345678900012345', '12345678900012345', '$2a$10$KEOhGQuwycZo9lRH5h1ecOH/eA/opYzQ6x.ZooR3/Qnf/7eaCK5pC', 1, NULL),
  (42, '123456789000123456', '123456789000123456', '$2a$10$05CShQ19y95Jn8sI/5DCl.NolZaM4Yj53g.R7Y8pcCljAw9IjN1Di', 1, NULL),
  (43, '1234567890001234567', '1234567890001234567', '$2a$10$mDoQs6yYve7cW28zcz2oLeS0elzGQIwWCqIndugMNdS318NteBZV.', 1, NULL),
  (45, '12345678900012345678', '12345678900012345678', '$2a$10$849Z281HrH5QSGpKoqs2D.JFToOOZLsgI.qByQXE/MsKZhAXvfT6W', 1, NULL),
  (47, '123456789000123456789', '123456789000123456789', '$2a$10$XC.NJOtnN70EmfRlk16/rOxLFrYtADqyFdYLUUKi6zn6f/Y8FC86m', 1, NULL),
  (48, '1234567890001234567890', '1234567890001234567890', '$2a$10$qB8i.rgsTBIIcoljtkqYc.TrLhIizZH4mFkh.FmAmYA3fRGPYIG4i', 1, 5),
  (50, '12345678900012345678900', '12345678900012345678900', '$2a$10$ZuveRzj.IDByRAZvsvyDneNnUuAL1sz7ZeEkYgQ1l2U4LZcGj0Bym', 1, 6),
  (51, '423143214', '423143214', '$2a$10$WtYIqVJ3JCJ/SOF85HyXaOe6PtxwgUgIuOcMx0orczA32v8ylv/oy', 423143214, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar
(255) DEFAULT NULL,
  `gender` tinyint
(4) DEFAULT NULL,
  `age` int
(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int
(11) DEFAULT NULL,
  `store_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `
vendor`
VALUES
  (1, '010000', 1, 20, '2019-04-13 13:43:06', 25, 1),
  (2, NULL, NULL, NULL, '2019-04-13 18:32:32', 43, 1),
  (3, NULL, NULL, NULL, '2019-04-13 18:35:23', 45, 1),
  (4, NULL, NULL, NULL, '2019-04-13 18:38:40', 47, 1),
  (5, NULL, NULL, NULL, '2019-04-13 18:39:42', 48, 1),
  (6, NULL, NULL, NULL, '2019-04-13 18:44:35', 50, 1),
  (7, NULL, NULL, NULL, '2019-04-13 18:51:48', 51, 423143214);
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workingHours`
--

DROP TABLE IF EXISTS `workingHours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workingHours`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `store_id` int
(11) DEFAULT NULL,
  `day` int
(11) DEFAULT NULL,
  `starting_hour` int
(11) DEFAULT NULL,
  `ending_hour` int
(11) DEFAULT NULL,
  `shift_starting_hour` int
(11) DEFAULT NULL,
  `shift_ending_hour` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE KEY `day`
(`day`,`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workingHours`
--

LOCK TABLES `workingHours` WRITE;
/*!40000 ALTER TABLE `workingHours` DISABLE KEYS */;
/*!40000 ALTER TABLE `workingHours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-13 21:57:58
