-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th8 09, 2024 lúc 04:15 PM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `lvtn24`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_type` enum('SV','GV','ADMIN','') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'GV',
  `phone_number` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `full_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `otp` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `otp_Expiry` time DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`user_id`, `user_password`, `user_email`, `user_type`, `phone_number`, `full_name`, `otp`, `otp_Expiry`) VALUES
(1, '$2a$10$v3H85xwTrAWnZ/jKbDwGDuSjFGBnWgh9Q39fRU2R1OMyTArkxQTWu', 'giaovien@gmail.com', 'GV', '1111111111', 'Giáo viên', NULL, NULL),
(2, '$2a$10$bjmRN2SpcpOpriOP1a0QPOYyPktqVTFvdxHb1/5PyatN0wzg1WPoi', 'DH52001628@student.stu.edu.vn', 'SV', NULL, 'Ngô Đoàn Thúy Hiền', NULL, NULL),
(3, '$2a$10$Gev9pB/2vJC6hP.JhCR54Ov8ALP3OnnK8l0Bd4hFPjSvQ/LVEhJ82', 'DH52003191@student.stu.edu.vn', 'SV', NULL, 'Vũ Khải Hoàn', NULL, NULL),
(4, '$2a$10$Zhf1fh0rj2SXiqjx12WP3epyEPvuQgAP.uSdwcZ/MkFhHiCicrU9.', 'DH52001988@student.stu.edu.vn', 'SV', NULL, 'Trần Minh Huân', NULL, NULL),
(5, '$2a$10$LRa8LNzsLIbUP2sOGwyGJunlV7buchgAkpxmhIVfxxA.mcnTOOkLa', 'DH52002286@student.stu.edu.vn', 'SV', NULL, 'Mai Đức Huy', NULL, NULL),
(6, '$2a$10$M/kH9oXIoL/CItFccJaPnOe7.P.eFuFxkqvVzbyKPHt/nePDTJmMm', 'DH52001341@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Quốc Huy', NULL, NULL),
(7, '$2a$10$rdxl0ePnKMXCl5EmEDPqw.fRfDYLXIAArIY/TIwM5bCcEBWg3/Bju', 'DH52000689@student.stu.edu.vn', 'SV', NULL, 'Sử Duy Khánh', NULL, NULL),
(8, '$2a$10$pn/XMLmEBw6G/QrQSpkIqeAMzblvwMvs7QReiLMYKwxoBUrAUCE7G', 'DH52003670@student.stu.edu.vn', 'SV', NULL, 'Trần Xuân Khương', NULL, NULL),
(9, '$2a$10$SU7urVgnGK0FhxX9ZcCdq.auybBOTK5ZnGaIWdnpI1XzvNwEPcZWu', 'DH52001423@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Trung Kiên', NULL, NULL),
(10, '$2a$10$xxtDXhGHt63VMXWrFzjdDuZNaSq46iaCYc0qFr/feo39Wtkj6.QvW', 'DH52002316@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Kiều Linh', NULL, NULL),
(11, '$2a$10$5zv6nnrLZgWmHNXh0nfljuCQbHqsmUr1ohut0vsKQTH4x.MCHv36.', 'DH52001688@student.stu.edu.vn', 'SV', NULL, 'Phạm Nhựt Linh', NULL, NULL),
(12, '$2a$10$mCdyGfqKx0NoObSRd6R3Te2IVePHyjjKnhUUwyjPUVLMfVZ/oQ5dG', 'DH52001727@student.stu.edu.vn', 'SV', NULL, 'Lê Lâm Tấn Lộc', NULL, NULL),
(13, '$2a$10$dJj3Xm8Z1ZuuWVwJPpki4.beyTDtTKrHgpK/s0jlcxCNCEGiARTS6', 'DH52002996@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Phước Lộc', NULL, NULL),
(14, '$2a$10$M0yDSvDp8wO.ePqe1OjO5.zjrWF5BOSmbFoFIE2LQ1L94MMcvAiKK', 'DH52000780@student.stu.edu.vn', 'SV', NULL, 'Lâm Huỳnh Khánh Minh', NULL, NULL),
(15, '$2a$10$vE4BcU3.LUqm5s2v4y79Y.k0ioNW3VaPkMRlBLyDw7EQ0bnrkONVK', 'DH52003592@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Khải Minh', NULL, NULL),
(16, '$2a$10$H/JeP9kdUIsHz3Nw0Igsauh8FIE1987Q8sWw7WYPCZYbXexvgkJbm', 'DH52002265@student.stu.edu.vn', 'SV', NULL, 'Phạm Minh Nhân', NULL, NULL),
(17, '$2a$10$YE/omA8RQ.zXlqkbqTaN/ujr/RCX/7FK1o1hRyMXqFFNV/1M.Mh02', 'DH52001486@student.stu.edu.vn', 'SV', NULL, 'Đào Minh Nhựt', NULL, NULL),
(18, '$2a$10$k/CocNSbMXmbLBrvi3TtuuWl9qXW0SkQqP02DPmf1KlgS06FViYZ6', 'DH52000596@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Quốc Oai', NULL, NULL),
(19, '$2a$10$ly21hnT4Pm6INwYVpeC7tOps1Cw0IpXkAGerfA0BngYbVYIgSzoCW', 'DH52002064@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoài Phong', NULL, NULL),
(20, '$2a$10$YM50KzwcfcWlfAfycvj8I.YMIK/hGTDBXf3MCj/5ejGfFHYA78lLC', 'DH52001882@student.stu.edu.vn', 'SV', NULL, 'Bùi Phong Phú', NULL, NULL),
(21, '$2a$10$lxZe1MxaQbd9p/3mQlrohufk.LhP8QajjKccef/auXDM9eXnq6f.K', 'DH52002061@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Ngọc Phú', NULL, NULL),
(22, '$2a$10$M8FuaYqCV4sE3rScxLwOcOQF/LpZpNSge8Dva4gS5gq3QHORnwbKa', 'DH52001860@student.stu.edu.vn', 'SV', NULL, 'Phan Hoàng Phúc', NULL, NULL),
(23, '$2a$10$3tN34eE1KcrOzl9jqmh5zOvBbcvUFSPXH2df43ahFk8s/t70RDE6q', 'DH52003255@student.stu.edu.vn', 'SV', NULL, 'Lê Triệu Thanh Phương', NULL, NULL),
(24, '$2a$10$/MgGMXXq45JQh7rExz.o0.ccp/cJy6/Un0H1EmtFaODIe1fzkhEcK', 'DH52000281@student.stu.edu.vn', 'SV', NULL, 'Lư Kiều Minh Quân', NULL, NULL),
(25, '$2a$10$UB1OOobsIFbAk34bp7eY6.LnCTIPBU04.847Qm.zP0LAqRtuyzMd2', 'DH52003521@student.stu.edu.vn', 'SV', NULL, 'Huỳnh Minh Quy', NULL, NULL),
(26, '$2a$10$Q7ZAsU7mxhJ3Ad3lBi0iFO53gYT1V7CV77o.JR9cF9kNyHYGBYyia', 'DH52001024@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Duy Sơn', NULL, NULL),
(27, '$2a$10$6PMTyoCN./tvER36ykdLL.C5/jEEaVcth8oXCI7HcwWI1h4AwUkPC', 'DH52003364@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Trình Duy Tân', NULL, NULL),
(28, '$2a$10$FqCh7Hke6050WFBrGOtBPOAV/rnVteHRla5Hb.BC7vd8578Ax7dCG', 'DH52001726@student.stu.edu.vn', 'SV', NULL, 'Huỳnh Ngọc Thẫm', NULL, NULL),
(29, '$2a$10$CVNpBP/.6Y6AgVCKG9L54e1Gu9IY/BjNZ5MCqMW03pAIuYw6R.7sq', 'DH52002390@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Xuân Thiện', NULL, NULL),
(30, '$2a$10$ipi5BcHOVxJKUwo9uMbv4OKw7xyCC9oGJfNpzlTumf4xe/MsRBTli', 'DH52001630@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Ngọc Thiện', NULL, NULL),
(31, '$2a$10$yZey1ayjcchY9j7Kq.6VzeZZYLjnfXH1m1/9BdPcHuBQKchkvB292', 'DH52002062@student.stu.edu.vn', 'SV', NULL, 'Phan Thanh Thúy', NULL, NULL),
(32, '$2a$10$JPKuqBywT/hST5Ue6gSLhu0dUmeH/mA.d/VqKMZEqNI.NmRvD2oL.', 'DH52003694@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Tiến', NULL, NULL),
(33, '$2a$10$o0kdJZpJU8U2sZtPhbQoq.nwqWmhWeoEGqD75hrlGHPZvdMUHnJv2', 'DH52002032@student.stu.edu.vn', 'SV', NULL, 'Phạm Ngọc Quế Trâm', NULL, NULL),
(34, '$2a$10$YcmPk4/tMIwR48nauvS4m.k4IPj65Ko2fNnC8u4HuX/J8z.da0o7G', 'DH52001832@student.stu.edu.vn', 'SV', NULL, 'Tiêu Quang Trường', NULL, NULL),
(35, '$2a$10$HC0jMeKbFQkXsj5lNZCdOe3jXDowitZz7fqwY/hOySYAJe7mjRice', 'DH52003232@student.stu.edu.vn', 'SV', NULL, 'Ngô Xuân Tuy', NULL, NULL),
(36, '$2a$10$sT8i6J6BWJgRlf5hMXugOuhXqfq5d8ZNTATuRORZuEMfUtVu59w/6', 'DH52001340@student.stu.edu.vn', 'SV', NULL, 'Phạm Trọng Việt', NULL, NULL),
(37, '$2a$10$k.TaVPKpTlOHnN1X4.1oHuLjxBZEKLfzOxkYc3d/JxukzVal6WiNO', 'DH52002202@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Tuấn Vũ', NULL, NULL),
(38, '$2a$10$PBs3PAW7iR1SIiuKtGrSHeRQYjY.5w1Ww.oSPKGfHXl/kyREIxxNq', 'DH52002063@student.stu.edu.vn', 'SV', NULL, 'Lê Trần Thúy Vy', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `indext_feedback` int NOT NULL AUTO_INCREMENT,
  `feedback_by` int NOT NULL,
  `feedback_of_request` int NOT NULL,
  `content_feedback` text,
  `score` int DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`indext_feedback`),
  KEY `Lk_khoaNgoai` (`feedback_of_request`),
  KEY `Lk_khoangoai2` (`feedback_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_list`
--

DROP TABLE IF EXISTS `group_list`;
CREATE TABLE IF NOT EXISTS `group_list` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `leader_id` int DEFAULT '0',
  `class_id` int DEFAULT NULL,
  `group_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `group_ibfk_1` (`class_id`),
  KEY `class_id` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `group_list`
--

INSERT INTO `group_list` (`group_id`, `leader_id`, `class_id`, `group_name`) VALUES
(1, 0, 1, 'Nhóm 1'),
(2, 0, 1, 'Nhóm 2'),
(3, 0, 1, 'Nhóm 3'),
(4, 0, 1, 'Nhóm 4'),
(5, 0, 1, 'Nhóm 5'),
(6, 0, 1, 'Nhóm 6'),
(7, 0, 1, 'Nhóm 7'),
(8, 0, 2, 'Nhóm 1'),
(9, 0, 2, 'Nhóm 2'),
(10, 0, 2, 'Nhóm 3'),
(11, 0, 2, 'Nhóm 4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_member`
--

DROP TABLE IF EXISTS `group_member`;
CREATE TABLE IF NOT EXISTS `group_member` (
  `member_index` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_index`),
  KEY `member_list_ibfk_1` (`group_id`),
  KEY `member_list_ibfk_2` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `group_member`
--

INSERT INTO `group_member` (`member_index`, `group_id`, `member_id`) VALUES
(6, 2, 29),
(7, 2, 2),
(8, 2, 17),
(9, 2, 8),
(10, 2, 15),
(11, 3, 7),
(12, 3, 13),
(13, 3, 4),
(14, 3, 36),
(15, 3, 11),
(17, 4, 22),
(18, 4, 25),
(19, 4, 12),
(21, 5, 31),
(22, 5, 19),
(23, 5, 14),
(24, 5, 23),
(25, 5, 33),
(26, 6, 34),
(27, 6, 30),
(28, 6, 9),
(29, 6, 27),
(30, 6, 5),
(31, 7, 37),
(32, 7, 24),
(33, 7, 18),
(34, 7, 3),
(35, 7, 35),
(36, 1, 21),
(37, 8, 21),
(38, 1, 32),
(39, 1, 28),
(40, 1, 20),
(41, 1, 16),
(42, 8, 5),
(43, 8, 6),
(44, 8, 7),
(45, 8, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project`
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_of_group`, `description`, `created_by`, `created_at`, `expired_day`, `expired_time`) VALUES
(1, 'Bán hàng', 1, 'Xây dựng website bán hàng', 1, '2024-08-09 22:05:01', '2024-08-10', '01:00:00'),
(2, 'Hỗ trợ giảng viên', 8, 'Hỗ trợ giảng viên trong việc thực hiên các môn đồ án', 1, '2024-08-09 22:31:33', '2024-08-10', '01:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report_request`
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
  `request_title` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `request_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `request_of_group` int NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `report_request_ibfk_1` (`created_by`),
  KEY `report_request_ibfk_2` (`subject_class`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `report_request`
--

INSERT INTO `report_request` (`request_id`, `created_by`, `subject_class`, `request_of_project`, `created_at`, `expired_time`, `expired_date`, `expired_action`, `request_title`, `request_description`, `request_of_group`) VALUES
(4, 1, 1, 1, '2024-08-09 22:25:52', '01:00:00', '2024-08-10', '2', 'Báo cáo tuần 1', 'Phân công nhiệm vụ', 1),
(5, 1, 2, 2, '2024-08-09 22:32:23', '01:00:00', '2024-08-16', '2', 'Báo cáo tuần 1', 'Công việc tuần 1', 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report_submit`
--

DROP TABLE IF EXISTS `report_submit`;
CREATE TABLE IF NOT EXISTS `report_submit` (
  `submit_id` int NOT NULL AUTO_INCREMENT,
  `submit_by` int DEFAULT NULL,
  `report_of_request` int DEFAULT NULL,
  `report_title` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `report_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `attachment_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`submit_id`),
  KEY `report_submit_ibfk_1` (`submit_by`),
  KEY `report_submit_ibfk_2` (`report_of_request`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `score_report`
--

DROP TABLE IF EXISTS `score_report`;
CREATE TABLE IF NOT EXISTS `score_report` (
  `grade_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `group_id` int NOT NULL,
  `request_id` int NOT NULL,
  `grade` double DEFAULT NULL,
  PRIMARY KEY (`grade_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `score_report`
--

INSERT INTO `score_report` (`grade_id`, `member_id`, `group_id`, `request_id`, `grade`) VALUES
(1, 21, 1, 4, 10),
(2, 32, 1, 4, 9),
(3, 28, 1, 4, 9.5),
(4, 20, 1, 4, 10),
(5, 16, 1, 4, 10),
(6, 21, 8, 5, 10),
(7, 5, 8, 5, 10),
(8, 6, 8, 5, 10),
(9, 7, 8, 5, 10),
(10, 8, 8, 5, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `user_id` int NOT NULL,
  `student_id` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `student_class` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`user_id`, `student_id`, `student_class`) VALUES
(2, 'DH52001628', 'D20_TH02'),
(3, 'DH52003191', 'D20_TH02'),
(4, 'DH52001988', 'D20_TH02'),
(5, 'DH52002286', 'D20_TH02'),
(6, 'DH52001341', 'D20_TH02'),
(7, 'DH52000689', 'D20_TH02'),
(8, 'DH52003670', 'D20_TH02'),
(9, 'DH52001423', 'D20_TH02'),
(10, 'DH52002316', 'D20_TH02'),
(11, 'DH52001688', 'D20_TH02'),
(12, 'DH52001727', 'D20_TH02'),
(13, 'DH52002996', 'D20_TH02'),
(14, 'DH52000780', 'D20_TH02'),
(15, 'DH52003592', 'D20_TH02'),
(16, 'DH52002265', 'D20_TH02'),
(17, 'DH52001486', 'D20_TH02'),
(18, 'DH52000596', 'D20_TH02'),
(19, 'DH52002064', 'D20_TH02'),
(20, 'DH52001882', 'D20_TH02'),
(21, 'DH52002061', 'D20_TH02'),
(22, 'DH52001860', 'D20_TH02'),
(23, 'DH52003255', 'D20_TH02'),
(24, 'DH52000281', 'D20_TH02'),
(25, 'DH52003521', 'D20_TH02'),
(26, 'DH52001024', 'D20_TH02'),
(27, 'DH52003364', 'D20_TH02'),
(28, 'DH52001726', 'D20_TH02'),
(29, 'DH52002390', 'D20_TH02'),
(30, 'DH52001630', 'D20_TH02'),
(31, 'DH52002062', 'D20_TH02'),
(32, 'DH52003694', 'D20_TH02'),
(33, 'DH52002032', 'D20_TH02'),
(34, 'DH52001832', 'D20_TH02'),
(35, 'DH52003232', 'D20_TH02'),
(36, 'DH52001340', 'D20_TH02'),
(37, 'DH52002202', 'D20_TH02'),
(38, 'DH52002063', 'D20_TH02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student_list`
--

DROP TABLE IF EXISTS `student_list`;
CREATE TABLE IF NOT EXISTS `student_list` (
  `student_index` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`student_index`),
  KEY `class_id` (`class_id`),
  KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `student_list`
--

INSERT INTO `student_list` (`student_index`, `class_id`, `student_id`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 6),
(6, 1, 7),
(7, 1, 8),
(8, 1, 9),
(9, 1, 10),
(10, 1, 11),
(11, 1, 12),
(12, 1, 13),
(13, 1, 14),
(14, 1, 15),
(15, 1, 16),
(16, 1, 17),
(17, 1, 18),
(18, 1, 19),
(19, 1, 20),
(20, 1, 21),
(21, 1, 22),
(22, 1, 23),
(23, 1, 24),
(24, 1, 25),
(25, 1, 26),
(26, 1, 27),
(27, 1, 28),
(28, 1, 29),
(29, 1, 30),
(30, 1, 31),
(31, 1, 32),
(32, 1, 33),
(33, 1, 34),
(34, 1, 35),
(35, 1, 36),
(36, 1, 37),
(37, 1, 38),
(38, 2, 2),
(39, 2, 3),
(40, 2, 4),
(41, 2, 5),
(42, 2, 6),
(43, 2, 7),
(44, 2, 8),
(45, 2, 9),
(46, 2, 10),
(47, 2, 11),
(48, 2, 12),
(49, 2, 13),
(50, 2, 14),
(51, 2, 15),
(52, 2, 16),
(53, 2, 17),
(54, 2, 18),
(55, 2, 19),
(56, 2, 20),
(57, 2, 21),
(58, 2, 22),
(59, 2, 23),
(60, 2, 24),
(61, 2, 25),
(62, 2, 26),
(63, 2, 27),
(64, 2, 28),
(65, 2, 29),
(66, 2, 30),
(67, 2, 31),
(68, 2, 32),
(69, 2, 33),
(70, 2, 34),
(71, 2, 35),
(72, 2, 36),
(73, 2, 37),
(74, 2, 38);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject_class`
--

DROP TABLE IF EXISTS `subject_class`;
CREATE TABLE IF NOT EXISTS `subject_class` (
  `subject_class_id` int NOT NULL AUTO_INCREMENT,
  `subject_class_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `school_year` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `number_of_group` int DEFAULT NULL,
  `member_per_group` int DEFAULT NULL,
  `group_register_method` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `invitecode` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`subject_class_id`),
  KEY `subject_class_ibfk_1` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `subject_class`
--

INSERT INTO `subject_class` (`subject_class_id`, `subject_class_name`, `created_by`, `created_at`, `school_year`, `number_of_group`, `member_per_group`, `group_register_method`, `invitecode`, `description`) VALUES
(1, 'Phân tích thiết kế hệ thống thông tin', 1, '2024-08-09 22:01:36', 'Học kỳ 1 - 2024 ', 7, 5, 'Teacher', 'CSY2Y', 'Thời gian: 16 tuần\nThời gian bắt đầu: 11/09/2023\nThời gian kết thúc: 24/12/2023'),
(2, 'Đồ án chuyên ngành', 1, '2024-08-09 22:02:08', 'Học kỳ 1 - 2024 ', 7, 5, 'Teacher', 'V9DX8', 'Thời gian: 16 tuần\nThời gian bắt đầu: 11/09/2023\nThời gian kết thúc: 24/12/2023'),
(3, 'Đồ án tin học', 1, '2024-08-09 22:03:07', 'Học kỳ 1 - 2022', 0, 0, NULL, 'GHS1B', 'Thời gian: 16 tuần\nThời gian bắt đầu: 15/09/2022\nThời gian kết thúc: 26/12/2022'),
(4, 'Thực tập tốt nghiệp', 1, '2024-08-09 22:35:57', 'Học kỳ 1 - 2023', 0, 0, NULL, 'ANTV7', 'Thời gian: 16 tuần\nThời gian bắt đầu: 09/09/2023'),
(5, 'Luận văn tốt nghiệp', 1, '2024-08-09 22:37:46', 'Học kỳ 2 - 2023', 0, 0, NULL, 'YAUMK', 'Thời gian: 14 tuần\nThời gian bắt đầu: 08/04/2024');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `uploaded_resource`
--

DROP TABLE IF EXISTS `uploaded_resource`;
CREATE TABLE IF NOT EXISTS `uploaded_resource` (
  `resource_id` int NOT NULL AUTO_INCREMENT,
  `uploaded_by` int DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `uploaded_link` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `upload_class_id` int NOT NULL,
  `decription_resource` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`resource_id`),
  KEY `uploaded_resource_ibfk_1` (`uploaded_by`),
  KEY `uploaded_resource_ibfk_2` (`upload_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `Lk_khoangoai2` FOREIGN KEY (`feedback_by`) REFERENCES `account` (`user_id`);

--
-- Các ràng buộc cho bảng `group_list`
--
ALTER TABLE `group_list`
  ADD CONSTRAINT `group_list_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Các ràng buộc cho bảng `group_member`
--
ALTER TABLE `group_member`
  ADD CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_list` (`group_id`),
  ADD CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `account` (`user_id`);

--
-- Các ràng buộc cho bảng `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`project_of_group`) REFERENCES `group_list` (`group_id`);

--
-- Các ràng buộc cho bảng `report_request`
--
ALTER TABLE `report_request`
  ADD CONSTRAINT `report_request_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `report_request_ibfk_2` FOREIGN KEY (`subject_class`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Các ràng buộc cho bảng `report_submit`
--
ALTER TABLE `report_submit`
  ADD CONSTRAINT `report_submit_ibfk_1` FOREIGN KEY (`submit_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `report_submit_ibfk_2` FOREIGN KEY (`report_of_request`) REFERENCES `report_request` (`request_id`);

--
-- Các ràng buộc cho bảng `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`);

--
-- Các ràng buộc cho bảng `student_list`
--
ALTER TABLE `student_list`
  ADD CONSTRAINT `student_list_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `student_list_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `subject_class` (`subject_class_id`);

--
-- Các ràng buộc cho bảng `subject_class`
--
ALTER TABLE `subject_class`
  ADD CONSTRAINT `subject_class_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `account` (`user_id`);

--
-- Các ràng buộc cho bảng `uploaded_resource`
--
ALTER TABLE `uploaded_resource`
  ADD CONSTRAINT `uploaded_resource_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `uploaded_resource_ibfk_2` FOREIGN KEY (`upload_class_id`) REFERENCES `subject_class` (`subject_class_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
