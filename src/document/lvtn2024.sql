-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th8 13, 2024 lúc 09:02 AM
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
-- Cơ sở dữ liệu: `lvtn2024`
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
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`user_id`, `user_password`, `user_email`, `user_type`, `phone_number`, `full_name`, `otp`, `otp_Expiry`) VALUES
(1, '$2a$10$OuDRw8TeIMLTicdgXxNSrOD8DmXEVGwi4DuHYDX5nLS150d2dlozy', 'admin@gmail.com', 'ADMIN', '0342746818', 'Admin', NULL, NULL),
(2, '$2a$10$EClJA0gLfTfir9TlyKX86uDencA7HNGjqo.KtclVyuqBGNkTBi2Aa', 'oanh.nguyenkieu@stu.edu.vn', 'GV', NULL, 'Nguyễn Kiều Oanh', NULL, NULL),
(3, '$2a$10$NF2KxP.kYgDNvwZ5X7/ZOuQAriddCln4kRynQFKhbmTNdMtaAYfqe', 'vinh.luongan@stu.edu.vn', 'GV', NULL, 'Lương An Vinh', NULL, NULL),
(4, '$2a$10$BMP7ctNhmNELX2pXyxfY3.PyygcTeaaQqHXYNvA/WyRiAi6nu4jWe', 'tung.nguyenthanh@stu.edu.vn', 'GV', NULL, 'Nguyễn Thanh Tùng', NULL, NULL),
(5, '$2a$10$zxqvdjE44obuT/lKNhjrreEKl1fPM77IsSw9uJTc9pciLSYAqCNnO', 'hung.tranvan@stu.edu.vn', 'GV', NULL, 'Trần Văn  Hùng', NULL, NULL),
(6, '$2a$10$tls07.nXcct8TXe3JDJlf.ph6c2tyZ7N6885fQPCR51rl8RpAX8QG', 'kha.hodinh@stu.edu.vn', 'GV', NULL, 'Hồ Đình  Khả', NULL, NULL),
(7, '$2a$10$N/0GRUgejnJKtXWFGqEQoeUSfCUJmeXR4QF4nkmljEC.dhQBiVjfq', 'y.tranthinhu@stu.edu.vn', 'GV', NULL, 'Trần Thị Như Ý', NULL, NULL),
(8, '$2a$10$WmXFSRpsRT8GRw1jlwRJVOsNiP2/pEVRiDjnIchNydOx15B5UJ3cK', 'bang.buinhat@stu.edu.vn', 'GV', NULL, 'Bùi Nhật Bằng', NULL, NULL),
(9, '$2a$10$9Nb/GSiWebVH7UxJ1hcpweyDnzHWt0mt8hkYtcwjYDe/2EZC86OLu', 'duc.doantrinh@stu.edu.vn', 'GV', NULL, 'Đoàn Trình Dục', NULL, NULL),
(10, '$2a$10$E7tBn/NrsxE1OMD5K/ad1uS12gEHn/kXSxv1oVRqk44cc4sz.JAFO', 'dung.lethimy@stu.edu.vn', 'GV', NULL, 'Lê Thị Mỹ Dung', NULL, NULL),
(11, '$2a$10$jIb4GUUzQpWWoRM.EwSVS.XxYreY87gK7OgMeOjbOXuZwUlC27XAC', 'bach.ngoxuan@stu.edu.vn', 'GV', NULL, 'Ngô Xuân  Bách', NULL, NULL),
(12, '$2a$10$qaVlkSry9qYcExmM6xRj8uqG3qI7BuiinLBb4yLn7b3o4fB7R0156', 'duc.letrieungoc@stu.edu.vn', 'GV', NULL, 'Lê Triệu Ngọc  Đức', NULL, NULL),
(13, '$2a$10$xgZWK1ZAmJFEJFTJm97MFu1unsyVrPKUZ27r4FtiWIfibqx7BpRjq', 'duy.trinhthanh@stu.edu.vn', 'GV', NULL, 'Trịnh Thanh Duy', NULL, NULL),
(14, '$2a$10$WTn8/Z22zGlduUGiAEGH6uf1GJ5lAyzimfKllbuPqiQPVWmtUDjAy', 'lam.nguyenngoc@stu.edu.vn', 'GV', NULL, 'Nguyễn Ngọc  Lâm', NULL, NULL),
(15, '$2a$10$puyvYMh/YpRxvgLhAkD14e1IgHsHWs7AUWYajtApGQREIY1hGdB8u', 'nghia.nguyentrong@stu.edu.vn', 'GV', NULL, 'Nguyễn Trọng  Nghĩa', NULL, NULL),
(16, '$2a$10$c1vbq4oqHYTjne47bv5B7ekr6pxOPERyG0p7MuU9kugVkNAB76zNy', 'thinh.nguyentranphuc@stu.edu.vn', 'GV', NULL, 'Nguyễn Trần Phúc Thịnh', NULL, NULL),
(17, '$2a$10$Yxwyh609w75AysUpQxCzyuMoJavJ3TJY3NSJuUmJ2wQpZhf.4LKS6', 'thu.nguyenlacan@stu.edu.vn', 'GV', NULL, 'Nguyễn Lạc An Thư', NULL, NULL),
(18, '$2a$10$tODDkS8j.eHadUrDDYHDMu0Yg7IvzwW0rSbBljr8m3ZrHBsIKl7VG', 'vu.haanh@stu.edu.vn', 'GV', NULL, 'Hà Anh Vũ', NULL, NULL),
(19, '$2a$10$o1mnRJI3f9mh1Kxu6svNaewxdX8.jYI6bRhw4x4Ct/jplAzWE1he.', 'xuan.nguyenthithanh@stu.edu.vn', 'GV', NULL, 'Nguyễn Thị Thanh Xuân', NULL, NULL),
(20, '$2a$10$b2bv/5Rfjz3xX750jJoSzeM9VlOFxpUsSvIvzW8pzPonzawm4s2rK', 'ha.nguyenthingan@stu.edu.vn', 'GV', NULL, 'Nguyễn Thị Ngân Hà', NULL, NULL),
(21, '$2a$10$NdRcf3CckvbbiT39TiD39.D9YOwFdcffqcYS2eBiTO9EOjruf2v9O', 'DH52001628@student.stu.edu.vn', 'SV', NULL, 'Ngô Đoàn Thúy Hiền', NULL, NULL),
(22, '$2a$10$djypWJPOudY9FjUO3maqIuvtVrFvulT674I.C3Kq0g5ncs9fZgi/6', 'DH52003191@student.stu.edu.vn', 'SV', NULL, 'Vũ Khải Hoàn', NULL, NULL),
(23, '$2a$10$/EJSEcWnxWK.ae1yjzI.GOaCbUKxg5tOV31424tFKjlNw6Z0TDO6a', 'DH52001988@student.stu.edu.vn', 'SV', NULL, 'Trần Minh Huân', NULL, NULL),
(24, '$2a$10$UBPsF6MXVQopGtt/wHI8jeJCeVHYtIuSoOwc1kVb6LZR6WEtYoiue', 'DH52002286@student.stu.edu.vn', 'SV', NULL, 'Mai Đức Huy', NULL, NULL),
(25, '$2a$10$YHE3e9N2K97KMAaoAy.rP.HLRGjzVMrdqKHzEguj4fYNiZuXxMIiu', 'DH52001341@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Quốc Huy', NULL, NULL),
(26, '$2a$10$DJXVlWmFThQ32Y0YM3R97udk8vIsdGqcmA27rnmrrgROxfa.Bk0uO', 'DH52000689@student.stu.edu.vn', 'SV', NULL, 'Sử Duy Khánh', NULL, NULL),
(27, '$2a$10$XklJ.9OqdKDV735jwoP.POGmmCAAb9ROGJDZC8i78kIH9Vp0U19Wy', 'DH52003670@student.stu.edu.vn', 'SV', NULL, 'Trần Xuân Khương', NULL, NULL),
(28, '$2a$10$Ql0/ITD02ICVIPwvrrJXf.okBWsQg2qSfrwIjlox78iPI3iaoVVj2', 'DH52001423@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Trung Kiên', NULL, NULL),
(29, '$2a$10$M.Xh5JpcLgXebEwEECZvoeyOWR3FQs5bjo8/1N64lXT9YqAe88l62', 'DH52002316@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Kiều Linh', NULL, NULL),
(30, '$2a$10$35poYkRup6mbOiOWxkGf1OUP0x0dmt3bWm/bjAbA4uXcIeENlHNTS', 'DH52001688@student.stu.edu.vn', 'SV', NULL, 'Phạm Nhựt Linh', NULL, NULL),
(31, '$2a$10$twHtGZrn5pmFKFlBqlGZFe6JAITSSKUiwyB62.MKfF/nFGd.mktym', 'DH52001727@student.stu.edu.vn', 'SV', NULL, 'Lê Lâm Tấn Lộc', NULL, NULL),
(32, '$2a$10$Tpnt9aQ6A6Fq981YH98wMuW3Rc3D7EypJksxJwuVNh7bPxN.SDY4.', 'DH52002996@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Phước Lộc', NULL, NULL),
(33, '$2a$10$2ysYE1AxLaqnYs7jWIMhFewrN0nP7nf1W6y8bTiVuhbhYFcAuK.K.', 'DH52000780@student.stu.edu.vn', 'SV', NULL, 'Lâm Huỳnh Khánh Minh', NULL, NULL),
(34, '$2a$10$Q9Q0oIvltwh4wop5y333xe8ylzG6eZKtiECQGZmglsCDRauxpE0Uq', 'DH52003592@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Khải Minh', NULL, NULL),
(35, '$2a$10$z73kpf6ojhR5F4FHDKTFNeQwGiW1iQ7WwFwLm0g2vWlUkmjPThHQ6', 'DH52002265@student.stu.edu.vn', 'SV', NULL, 'Phạm Minh Nhân', NULL, NULL),
(36, '$2a$10$lWFTEXsLsuCGKZ4Qe4p58OI/YH/bGPQe4/SZebRhAY5lYHJ9.UJz.', 'DH52001486@student.stu.edu.vn', 'SV', NULL, 'Đào Minh Nhựt', NULL, NULL),
(37, '$2a$10$3Sp6BgsZI16AWbnwUXz4VeINSPW9qF6EY90Vu9f/lWippgCKKMRse', 'DH52000596@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Quốc Oai', NULL, NULL),
(38, '$2a$10$GsU9oAJN9F0.BmIyMebhkumu04qcS9yiIOGgViXnBNNZG28gWtwq2', 'DH52002064@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoài Phong', NULL, NULL),
(39, '$2a$10$CMd9sqFhj8zIKjX9UASac.GlkIE3/U5BbREakltp6CzEMmDthavzC', 'DH52001882@student.stu.edu.vn', 'SV', NULL, 'Bùi Phong Phú', NULL, NULL),
(40, '$2a$10$DNj3Zc5JMhZymO7gYRmXzOgHHr610qEZJxJgxMPCy5Jg7ifyalZn.', 'DH52002061@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Ngọc Phú', NULL, NULL),
(41, '$2a$10$D6aQlvKO4GzbVRALJpWTaePlzt1kCnCk.t3UMyFyVYqncvuZWNDMm', 'DH52001860@student.stu.edu.vn', 'SV', NULL, 'Phan Hoàng Phúc', NULL, NULL),
(42, '$2a$10$OSwi3BO997TCATgf2V9R3OJADavKhJOTYH/eNYk9IEhhCzFHlV5yK', 'DH52003255@student.stu.edu.vn', 'SV', NULL, 'Lê Triệu Thanh Phương', NULL, NULL),
(43, '$2a$10$RDG.OvRd/2E5Ea2MzzcNC.vsMvhHd4mfHcChI.PX02Xt0yfglHa5W', 'DH52000281@student.stu.edu.vn', 'SV', NULL, 'Lư Kiều Minh Quân', NULL, NULL),
(44, '$2a$10$LL7AWmV7NtmN6iIxqO3NIuJyLEsjcx3u0PIMsS5vhJG7/ZxrUxtzW', 'DH52003521@student.stu.edu.vn', 'SV', NULL, 'Huỳnh Minh Quy', NULL, NULL),
(45, '$2a$10$sXnuCZRKhbyD.jD/6qYpBOjE9FvK5NnA.UR2a3wOmii5d1GZ1Zv8y', 'DH52001024@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Duy Sơn', NULL, NULL),
(46, '$2a$10$qAzKikMlKgDlc/wcOpQ7uO.nbdL7/JerZ2/A7mGRn2mhESmB4f0Ra', 'DH52003364@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Trình Duy Tân', NULL, NULL),
(47, '$2a$10$Dnrl5Xmz2CpjjXhItRvF..WZUcIBT1qKOGE9UustIn5KQxXV6bNlO', 'DH52001726@student.stu.edu.vn', 'SV', NULL, 'Huỳnh Ngọc Thẫm', NULL, NULL),
(48, '$2a$10$CDpxfowWG2o7TFnnKSTqXOsIW9aMYt.TItXk0ihPJW8a8OGEggYre', 'DH52002390@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Xuân Thiện', NULL, NULL),
(49, '$2a$10$ApmnjBQ4teHQWCaGCTOc/eB9kxaoykkXUEPJAnoC8YCk4HGqqJI6e', 'DH52001630@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Ngọc Thiện', NULL, NULL),
(50, '$2a$10$BvVHN/jSebZRmrrzlEdK8.DRwy5XQ3x3pOCSr7m3HUq0bSpZ682He', 'DH52002062@student.stu.edu.vn', 'SV', NULL, 'Phan Thanh Thúy', NULL, NULL),
(51, '$2a$10$ej8gZVF58cVG5pPz6H/xs.4N/k5uloe8KSat0WlbVQl8QLv7Evsxq', 'DH52003694@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Hoàng Tiến', NULL, NULL),
(52, '$2a$10$7dLzWMFuqi1O49MjxyVWNejBbRBzR1/K1udOI.NMljZ.I9kr12Xza', 'DH52002032@student.stu.edu.vn', 'SV', NULL, 'Phạm Ngọc Quế Trâm', NULL, NULL),
(53, '$2a$10$Z56I6qbBH3m1ljhAw7/s5uIT9qozb8MqgsKd14uy6SWU64iNB4Rfi', 'DH52001832@student.stu.edu.vn', 'SV', NULL, 'Tiêu Quang Trường', NULL, NULL),
(54, '$2a$10$MxpgMF0Z7D1efHyS6NIrOefGUo9XKfCxn/XZrw08Lh1OvNjG31qrO', 'DH52003232@student.stu.edu.vn', 'SV', NULL, 'Ngô Xuân Tuy', NULL, NULL),
(55, '$2a$10$Kn1dFmmE0DRH57lNwVkR3OkvYicFNCb3hEPRYIHtwKdDKUANxGtgK', 'DH52001340@student.stu.edu.vn', 'SV', NULL, 'Phạm Trọng Việt', NULL, NULL),
(56, '$2a$10$ve19vw3UuE35xzJmfFwfdeRlmpbbxW9Ra0RT0jU5rxwc6F64ml7kO', 'DH52002202@student.stu.edu.vn', 'SV', NULL, 'Nguyễn Tuấn Vũ', NULL, NULL),
(57, '$2a$10$5aClZoRBho4PGRryWbLtyuAxmlgrCDeKgghfkLsTgih9gxlrG46Ei', 'DH52002063@student.stu.edu.vn', 'SV', NULL, 'Lê Trần Thúy Vy', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `indext_feedback` int NOT NULL AUTO_INCREMENT,
  `feedback_by` int NOT NULL,
  `feedback_of_request` int NOT NULL,
  `content_feedback` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `create_at` datetime NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`indext_feedback`),
  KEY `Lk_khoaNgoai` (`feedback_of_request`),
  KEY `Lk_khoangoai2` (`feedback_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_list`
--

DROP TABLE IF EXISTS `group_list`;
CREATE TABLE IF NOT EXISTS `group_list` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `group_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `group_ibfk_1` (`class_id`),
  KEY `class_id` (`class_id`),
  KEY `project_id` (`project_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `group_list`
--

INSERT INTO `group_list` (`group_id`, `class_id`, `group_name`, `project_id`) VALUES
(1, 1, 'Nhóm 1', 1),
(2, 1, 'Nhóm 2', 3),
(3, 1, 'Nhóm 3', 5),
(5, 1, 'Nhóm 4', 2),
(6, 1, 'Nhóm 5', 4),
(7, 1, 'Nhóm 6', 1),
(8, 1, 'Nhóm 7', 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `group_member`
--

INSERT INTO `group_member` (`member_index`, `group_id`, `member_id`) VALUES
(6, 1, 40),
(7, 1, 31),
(8, 1, 24),
(9, 1, 21),
(10, 1, 27);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_day` date DEFAULT NULL,
  `expired_time` time NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `description`, `created_by`, `created_at`, `expired_day`, `expired_time`, `class_id`) VALUES
(1, 'Bán quần áo', 'Kết quả đạt được: là một sản phẩm mang tính ứng dụng đủ khối lượng cho 10 tuần làm việc, trong đó báo gồm báo cáo đồ án ngắn gọn và sản phẩm.', 2, '2024-08-13 10:31:32', '2024-12-23', '00:00:00', 1),
(2, 'Hỗ trợ giảng viên cho sinh viên thực hiện đồ án', 'Kết quả đạt được: là một sản phẩm mang tính ứng dụng đủ khối lượng cho 10 tuần làm việc, trong đó báo gồm báo cáo đồ án ngắn gọn và sản phẩm.', 2, '2024-08-13 10:33:37', '2024-12-23', '00:00:00', 1),
(3, 'Website thi TOEIC', 'Kết quả đạt được: là một sản phẩm mang tính ứng dụng đủ khối lượng cho 10 tuần làm việc, trong đó báo gồm báo cáo đồ án ngắn gọn và sản phẩm.', 2, '2024-08-13 10:34:40', '2024-12-23', '00:00:00', 1),
(4, 'Bán vé xem phim', 'Kết quả đạt được: là một sản phẩm mang tính ứng dụng đủ khối lượng cho 10 tuần làm việc, trong đó báo gồm báo cáo đồ án ngắn gọn và sản phẩm.', 2, '2024-08-13 10:36:24', '2024-12-23', '00:00:00', 1),
(5, 'Bán vé máy bay', 'Kết quả đạt được: là một sản phẩm mang tính ứng dụng đủ khối lượng cho 10 tuần làm việc, trong đó báo gồm báo cáo đồ án ngắn gọn và sản phẩm.', 2, '2024-08-13 10:37:15', '2024-12-23', '00:00:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report_request`
--

DROP TABLE IF EXISTS `report_request`;
CREATE TABLE IF NOT EXISTS `report_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `created_by` int DEFAULT NULL,
  `subject_class` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_time` time DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `expired_action` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `request_title` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `request_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `request_of_group` int NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `report_request_ibfk_1` (`created_by`),
  KEY `report_request_ibfk_2` (`subject_class`),
  KEY `request_of_group` (`request_of_group`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `report_request`
--

INSERT INTO `report_request` (`request_id`, `created_by`, `subject_class`, `created_at`, `expired_time`, `expired_date`, `expired_action`, `request_title`, `request_description`, `request_of_group`) VALUES
(2, 2, 1, '2024-08-13 11:22:17', '00:00:00', '2024-10-23', '2', 'Báo cáo tuần 1', 'Phân công nhiệm vụ', 1),
(3, 2, 1, '2024-08-13 11:23:17', '00:00:00', '2024-10-30', '2', 'Báo cáo tuần 2', 'Thiết kế Database, mô hình dữ liệu,...', 1),
(4, 2, 1, '2024-08-13 11:24:08', '00:00:00', '2024-11-06', '2', 'Báo cáo tuần 3', 'Thiết kế chức năng', 1),
(5, 2, 1, '2024-08-13 11:26:20', '00:00:00', '2024-11-13', '2', 'Báo cáo tuần 4', 'Vẽ sơ đồ chức năng, usecase,..', 1),
(6, 2, 1, '2024-08-13 11:29:17', '00:00:00', '2024-11-20', '2', 'Báo cáo tuần 5', 'aaaaaaa', 1),
(7, 2, 1, '2024-08-13 11:29:47', '00:00:00', '2024-11-27', '2', 'Báo cáo tuần 6', 'aaaaaaaa', 1),
(8, 2, 1, '2024-08-13 11:30:20', '00:00:00', '2024-12-04', '2', 'Báo cáo tuần 7', 'aaaaaaaaa', 1),
(9, 2, 1, '2024-08-13 11:31:00', '00:00:00', '2024-12-11', '2', 'Báo cáo tuần 8', 'aaaaaaaa', 1),
(10, 2, 1, '2024-08-13 11:32:06', '12:00:00', '2024-12-16', '2', 'Báo cáo tuần 9 ', 'Báo cáo', 1),
(12, 2, 1, '2024-08-13 11:32:42', '12:00:00', '2024-12-23', '2', 'Báo cáo tuần 10', 'Báo cáo', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `report_submit`
--

INSERT INTO `report_submit` (`submit_id`, `submit_by`, `report_of_request`, `report_title`, `report_description`, `created_date`, `created_time`, `attachment_url`) VALUES
(2, 40, 2, 'Báo cáo tuần 1', 'Phân công nhiệm vụ và mô tả nghiệp vụ của đề tài', '2024-08-13', '11:45:58', 'https://drive.google.com/file/d/1NAfoIrF9dNU1xsGEuP2Ct2qfj91LjsB1/view?usp=drivesdk'),
(3, 40, 3, 'Báo cáo tuần 2', 'Thiết kế Database, mô hình dữ liệu,...', '2024-08-13', '11:48:13', 'https://drive.google.com/file/d/1Ye7XpoXmIa1TphLEynqhGbLdm1PVvrLo/view?usp=drivesdk'),
(4, 40, 4, 'Báo cáo tuần 3', 'Thiết kế chức năng', '2024-08-13', '11:49:03', 'https://drive.google.com/file/d/1fUFzcvaTMvEQwYrtTi2GqdOwOE40gPPu/view?usp=drivesdk'),
(5, 40, 5, 'Báo cáo tuần 4', 'Vẽ sơ đồ chức năng, usecase,..', '2024-08-13', '11:51:05', 'https://drive.google.com/file/d/1PGUXCw5GRm74VJHLjO9IETAuaYsq2YZz/view?usp=drivesdk');

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
  PRIMARY KEY (`grade_id`),
  KEY `member_id` (`member_id`),
  KEY `group_id` (`group_id`),
  KEY `request_id` (`request_id`),
  KEY `member_id_2` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `score_report`
--

INSERT INTO `score_report` (`grade_id`, `member_id`, `group_id`, `request_id`, `grade`) VALUES
(1, 40, 1, 2, 8),
(2, 31, 1, 2, 9),
(3, 24, 1, 2, 8),
(4, 21, 1, 2, 6.5),
(5, 27, 1, 2, 6.5);

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
(21, 'DH52001628', 'D20_TH02'),
(22, 'DH52003191', 'D20_TH02'),
(23, 'DH52001988', 'D20_TH02'),
(24, 'DH52002286', 'D20_TH02'),
(25, 'DH52001341', 'D20_TH02'),
(26, 'DH52000689', 'D20_TH02'),
(27, 'DH52003670', 'D20_TH02'),
(28, 'DH52001423', 'D20_TH02'),
(29, 'DH52002316', 'D20_TH02'),
(30, 'DH52001688', 'D20_TH02'),
(31, 'DH52001727', 'D20_TH02'),
(32, 'DH52002996', 'D20_TH02'),
(33, 'DH52000780', 'D20_TH02'),
(34, 'DH52003592', 'D20_TH02'),
(35, 'DH52002265', 'D20_TH02'),
(36, 'DH52001486', 'D20_TH02'),
(37, 'DH52000596', 'D20_TH02'),
(38, 'DH52002064', 'D20_TH02'),
(39, 'DH52001882', 'D20_TH02'),
(40, 'DH52002061', 'D20_TH02'),
(41, 'DH52001860', 'D20_TH02'),
(42, 'DH52003255', 'D20_TH02'),
(43, 'DH52000281', 'D20_TH02'),
(44, 'DH52003521', 'D20_TH02'),
(45, 'DH52001024', 'D20_TH02'),
(46, 'DH52003364', 'D20_TH02'),
(47, 'DH52001726', 'D20_TH02'),
(48, 'DH52002390', 'D20_TH02'),
(49, 'DH52001630', 'D20_TH02'),
(50, 'DH52002062', 'D20_TH02'),
(51, 'DH52003694', 'D20_TH02'),
(52, 'DH52002032', 'D20_TH02'),
(53, 'DH52001832', 'D20_TH02'),
(54, 'DH52003232', 'D20_TH02'),
(55, 'DH52001340', 'D20_TH02'),
(56, 'DH52002202', 'D20_TH02'),
(57, 'DH52002063', 'D20_TH02');

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `student_list`
--

INSERT INTO `student_list` (`student_index`, `class_id`, `student_id`) VALUES
(1, 1, 21),
(2, 1, 22),
(3, 1, 23),
(4, 1, 24),
(5, 1, 25),
(6, 1, 26),
(7, 1, 27),
(8, 1, 28),
(9, 1, 29),
(10, 1, 30),
(11, 1, 31),
(12, 1, 32),
(13, 1, 33),
(14, 1, 34),
(15, 1, 35),
(16, 1, 36),
(17, 1, 37),
(18, 1, 38),
(19, 1, 39),
(20, 1, 40),
(21, 1, 41),
(22, 1, 42),
(23, 1, 43),
(24, 1, 44),
(25, 1, 45),
(26, 1, 46),
(27, 1, 47),
(28, 1, 48),
(29, 1, 49),
(30, 1, 50),
(31, 1, 51),
(32, 1, 52),
(33, 1, 53),
(34, 1, 54),
(35, 1, 55),
(36, 1, 56),
(37, 1, 57),
(38, 2, 40);

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
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  PRIMARY KEY (`subject_class_id`),
  KEY `subject_class_ibfk_1` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `subject_class`
--

INSERT INTO `subject_class` (`subject_class_id`, `subject_class_name`, `created_by`, `created_at`, `school_year`, `number_of_group`, `member_per_group`, `group_register_method`, `invitecode`, `description`) VALUES
(1, 'Phân tích thiết kế hệ thống thông tin', 2, '2024-08-13 10:12:04', 'Học kỳ 1 - 2024', 7, 5, 'Teacher', '7XW93', 'Thời gian : 10 tuần lễ, bắt đầu từ 16.10.2024 – 23.12.2024'),
(2, 'Đồ án chuyên ngành', 2, '2024-08-13 10:12:42', 'Học kỳ 1 - 2024', 0, 0, NULL, 'F6CXA', 'Thời gian : 10 tuần lễ, bắt đầu từ 16.10.2024 – 23.12.2024'),
(3, 'Đồ án tin học', 2, '2024-08-13 10:13:25', 'Học kỳ 2 - 2024', 0, 0, NULL, 'XBRXV', 'Thời gian : 10 tuần lễ, bắt đầu từ 16.10.2024 – 23.12.2024');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `uploaded_document`
--

DROP TABLE IF EXISTS `uploaded_document`;
CREATE TABLE IF NOT EXISTS `uploaded_document` (
  `resource_id` int NOT NULL AUTO_INCREMENT,
  `uploaded_by` int DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `uploaded_link` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `upload_class_id` int NOT NULL,
  `decription_resource` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`resource_id`),
  KEY `uploaded_resource_ibfk_1` (`uploaded_by`),
  KEY `uploaded_resource_ibfk_2` (`upload_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `uploaded_document`
--

INSERT INTO `uploaded_document` (`resource_id`, `uploaded_by`, `uploaded_at`, `uploaded_link`, `upload_class_id`, `decription_resource`) VALUES
(3, 2, '2024-08-13 11:36:56', 'https://docs.google.com/presentation/d/1_miFCYo9nMN0Azdg56hW017ZBsXv27ms/edit?usp=drivesdk&ouid=110579170545389629691&rtpof=true&sd=true', 1, 'Tài liệu hướng dẫn '),
(5, 2, '2024-08-13 11:38:44', 'https://docs.google.com/spreadsheets/d/1PCVHZBPm6sT9AbiBMh_eFNzzkd3hUFe-/edit?usp=drivesdk&ouid=110579170545389629691&rtpof=true&sd=true', 1, 'Tài liệu tham khảo ');

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
  ADD CONSTRAINT `group_list_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `subject_class` (`subject_class_id`),
  ADD CONSTRAINT `group_list_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Các ràng buộc cho bảng `group_member`
--
ALTER TABLE `group_member`
  ADD CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_list` (`group_id`),
  ADD CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `account` (`user_id`);

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
-- Các ràng buộc cho bảng `score_report`
--
ALTER TABLE `score_report`
  ADD CONSTRAINT `score_report_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `account` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `score_report_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_list` (`group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `score_report_ibfk_3` FOREIGN KEY (`request_id`) REFERENCES `report_request` (`request_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
-- Các ràng buộc cho bảng `uploaded_document`
--
ALTER TABLE `uploaded_document`
  ADD CONSTRAINT `uploaded_document_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `account` (`user_id`),
  ADD CONSTRAINT `uploaded_document_ibfk_2` FOREIGN KEY (`upload_class_id`) REFERENCES `subject_class` (`subject_class_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
