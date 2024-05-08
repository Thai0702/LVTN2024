-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 01, 2024 at 04:10 PM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tttn_db1`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_type` enum('SV','GV','ADMIN','') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'GV',
  `phone_number` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `full_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_list`
--

DROP TABLE IF EXISTS `group_list`;
CREATE TABLE IF NOT EXISTS `group_list` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `leader_id` int DEFAULT '0',
  `class_id` int DEFAULT NULL,
  `group_name` varchar(120) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `group_ibfk_1` (`class_id`),
  KEY `class_id` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
CREATE TABLE IF NOT EXISTS `group_member` (
  `member_index` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_index`),
  KEY `member_list_ibfk_1` (`group_id`),
  KEY `member_list_ibfk_2` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `project_of_group` int DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_day` date DEFAULT NULL,
  `expired_time` time NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `project_ibfk_1` (`project_of_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_log`
--

DROP TABLE IF EXISTS `project_log`;
CREATE TABLE IF NOT EXISTS `project_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `log_of_project` int DEFAULT NULL,
  `log_title` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `log_decription` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `attachment` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `project_log_ibfk_1` (`log_of_project`),
  KEY `project_log_ibfk_2` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report_request`
--

DROP TABLE IF EXISTS `report_request`;
CREATE TABLE IF NOT EXISTS `report_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `created_by` int DEFAULT NULL,
  `subject_class` int DEFAULT NULL,
  `request_of_project` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_time` time DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `expired_action` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `request_title` varchar(250) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `request_description` varchar(500) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `report_request_ibfk_1` (`created_by`),
  KEY `report_request_ibfk_2` (`subject_class`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report_submit`
--

DROP TABLE IF EXISTS `report_submit`;
CREATE TABLE IF NOT EXISTS `report_submit` (
  `submit_id` int NOT NULL AUTO_INCREMENT,
  `submit_by` int DEFAULT NULL,
  `report_of_request` int DEFAULT NULL,
  `report_title` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `report_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_date` date NOT NULL,
  `created_time` time NOT NULL,
  `attachment` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`submit_id`),
  KEY `report_submit_ibfk_1` (`submit_by`),
  KEY `report_submit_ibfk_2` (`report_of_request`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `user_id` int NOT NULL,
  `student_id` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `student_class` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_list`
--

DROP TABLE IF EXISTS `student_list`;
CREATE TABLE IF NOT EXISTS `student_list` (
  `student_index` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`student_index`),
  KEY `class_id` (`class_id`),
  KEY `student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject_class`
--

DROP TABLE IF EXISTS `subject_class`;
CREATE TABLE IF NOT EXISTS `subject_class` (
  `subject_class_id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `school_year` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `number_of_group` int DEFAULT NULL,
  `member_per_group` int DEFAULT NULL,
  `group_register_method` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`subject_class_id`),
  KEY `subject_class_ibfk_1` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE IF NOT EXISTS `teacher` (
  `user_id` int NOT NULL,
  `teacher_id` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_document`
--

DROP TABLE IF EXISTS `uploaded_document`;
CREATE TABLE IF NOT EXISTS `uploaded_document` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `resource_id` int DEFAULT NULL,
  `document_of_subject_class` int DEFAULT NULL,
  `document_of_project` int DEFAULT NULL,
  `decription` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `uploaded_document_ibfk_1` (`document_of_subject_class`),
  KEY `uploaded_document_ibfk_2` (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_resource`
--

DROP TABLE IF EXISTS `uploaded_resource`;
CREATE TABLE IF NOT EXISTS `uploaded_resource` (
  `resource_id` int NOT NULL AUTO_INCREMENT,
  `uploaded_by` int DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `uploaded_link` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`resource_id`),
  KEY `uploaded_resource_ibfk_1` (`uploaded_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `group_list`
--
ALTER TABLE `group_list`
  ADD CONSTRAINT `group_list_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Constraints for table `group_member`
--
ALTER TABLE `group_member`
  ADD CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_list` (`group_id`),
  ADD CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `account` (`user_id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`project_of_group`) REFERENCES `group_list` (`group_id`);

--
-- Constraints for table `project_log`
--
ALTER TABLE `project_log`
  ADD CONSTRAINT `project_log_ibfk_1` FOREIGN KEY (`log_of_project`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `project_log_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `account` (`user_id`);

--
-- Constraints for table `report_request`
--
ALTER TABLE `report_request`
  ADD CONSTRAINT `report_request_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `report_request_ibfk_2` FOREIGN KEY (`subject_class`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Constraints for table `report_submit`
--
ALTER TABLE `report_submit`
  ADD CONSTRAINT `report_submit_ibfk_1` FOREIGN KEY (`submit_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `report_submit_ibfk_2` FOREIGN KEY (`report_of_request`) REFERENCES `report_request` (`request_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

--
-- Constraints for table `student_list`
--
ALTER TABLE `student_list`
  ADD CONSTRAINT `student_list_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `student_list_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Constraints for table `subject_class`
--
ALTER TABLE `subject_class`
  ADD CONSTRAINT `subject_class_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `account` (`user_id`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

--
-- Constraints for table `uploaded_document`
--
ALTER TABLE `uploaded_document`
  ADD CONSTRAINT `uploaded_document_ibfk_1` FOREIGN KEY (`document_of_subject_class`) REFERENCES `subject_class` (`subject_class_id`),
  ADD CONSTRAINT `uploaded_document_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `uploaded_resource` (`resource_id`);

--
-- Constraints for table `uploaded_resource`
--
ALTER TABLE `uploaded_resource`
  ADD CONSTRAINT `uploaded_resource_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `account` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
