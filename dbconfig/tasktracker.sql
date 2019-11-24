-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2019 at 12:43 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasktracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `cardtask`
--

CREATE TABLE `cardtask` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `title` varchar(50) NOT NULL,
  `task` text NOT NULL,
  `datestarted` varchar(50) NOT NULL,
  `datecompleted` datetime DEFAULT NULL,
  `status` char(15) NOT NULL,
  `assignedby` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cardtask`
--

INSERT INTO `cardtask` (`id`, `username`, `title`, `task`, `datestarted`, `datecompleted`, `status`, `assignedby`) VALUES
(270, 'qwerty', 'testing', 'all working', '11 November 2019 :: 18:10:28', '0000-00-00 00:00:00', 'Not Started Yet', 'sayuj'),
(271, 'qwerty', 'tt', 'tt', '11 November 2019 :: 18:24:53', '0000-00-00 00:00:00', 'Completed', 'tt'),
(272, 'qwerty', 'asd', 'asd', '11 November 2019 :: 18:25:17', '0000-00-00 00:00:00', 'Stopped', 'asd'),
(273, 'qwerty', 'afd', 'df', '11 November 2019 :: 18:26:58', '0000-00-00 00:00:00', 'Delayed', 'asfd'),
(274, 'qwerty', 'sdf', 'jlkj', '11 November 2019 :: 18:27:34', '0000-00-00 00:00:00', 'Pause', 'jlk'),
(276, 'qwerty', 'pp', 'pp', '11 November 2019 :: 18:33:12', '0000-00-00 00:00:00', 'Ongoing', 'pp'),
(280, 'sayuj', 'Tomorrow Tasks', 'First fix all the small things tomorrow such that displaying errors in login and register page and also display a toast message of user registered successfully. Then fix all the preloaders so that it will look nice and after that need to fix filter button options.', '11 November 2019 :: 21:15:35', '0000-00-00 00:00:00', 'Pause', 'Sayuj'),
(284, 'sayuj', 'pop', 'option', '12 November 2019 :: 22:10:03', '0000-00-00 00:00:00', 'Not Started Yet', 'ospd'),
(303, 'varun12', 'first-card', 'card-old', '13 November 2019 :: 16:46:14', '0000-00-00 00:00:00', 'Completed', 'sayuj'),
(332, 'sayuj', 'qwer', 'wer', '16 November 2019 :: 11:36:02', '0000-00-00 00:00:00', 'Stopped', 'wer'),
(371, 'sayuj', 'sdf', 'sdf', '16 November 2019 :: 13:42:03', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(373, 'sayuj', 'asdf', 'sdf', '16 November 2019 :: 13:44:50', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(375, 'sayuj', 'sdf', 'sdf', '16 November 2019 :: 13:55:12', '0000-00-00 00:00:00', 'Ongoing', 'dsf'),
(376, 'sayuj', 'df', 'df', '16 November 2019 :: 13:55:22', '0000-00-00 00:00:00', 'Ongoing', 'df'),
(378, 'sayuj', 'kk', 'kk', '16 November 2019 :: 14:10:00', '0000-00-00 00:00:00', 'Ongoing', 'k'),
(380, 'sayuj', 'sdf', 'jskdf', '16 November 2019 :: 14:21:26', '0000-00-00 00:00:00', 'Pause', 'sdf'),
(381, 'sayuj', 'sdf', 'sdf', '16 November 2019 :: 14:21:43', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(382, 'sayuj', 'pp', 'pp', '16 November 2019 :: 14:25:06', '0000-00-00 00:00:00', 'Ongoing', 'p'),
(383, 'sayuj', 'll', 'lli', '16 November 2019 :: 14:25:23', '0000-00-00 00:00:00', 'Ongoing', 'll'),
(384, 'sayuj', 'one 0mo', 'sdjfk', '16 November 2019 :: 14:25:57', '0000-00-00 00:00:00', 'Pause', 'sdf'),
(385, 'sayuj', 'sdfff', 'sdffff', '16 November 2019 :: 14:31:20', '0000-00-00 00:00:00', 'Stopped', 'sdfff'),
(387, 'sayuj', 'hi', 'hi there!', '17 November 2019 :: 10:21:41', '0000-00-00 00:00:00', 'Ongoing', 'sayuj'),
(388, 'sayuj', 'df', 'opitions\r\n\r\nsdf\r\n\r\ndf', '17 November 2019 :: 10:23:31', '0000-00-00 00:00:00', 'Ongoing', 'dsf'),
(399, 'sayuj', 'asd', 'sdf\r\n\r\ndf\r\ndfa', '17 November 2019 :: 11:52:00', '0000-00-00 00:00:00', 'Ongoing', 'asdf'),
(400, 'sayuj', 'sdf', 'dfq\r\n\r\ngg', '17 November 2019 :: 11:53:21', '0000-00-00 00:00:00', 'Ongoing', 'asdf'),
(401, 'sayuj', 'sdf', 'asdf', '17 November 2019 :: 11:55:44', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(403, 'sayuj', 'sdf', 'sdf\r\nsdf\r\nasdf', '17 November 2019 :: 12:06:28', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(404, 'sayuj', 'fd', 'sadf\r\nasdf\r\n<br>\r\nva', '17 November 2019 :: 12:08:58', '0000-00-00 00:00:00', 'Ongoing', 'sdf'),
(406, 'sayuj', 'sdf', 'sdf<br>\r\nsdf\r\nsdf\r\nsdaf\r\nsdf\r\nasdf<br>\r\nssdf<br>\r\nsdf', '17 November 2019 :: 12:11:12', '0000-00-00 00:00:00', 'Ongoing', 'df'),
(407, 'sayuj', 'df', 'bye <br/>\r\nthere!', '17 November 2019 :: 12:35:33', '0000-00-00 00:00:00', 'Completed', 'sdf'),
(422, 'sayuj', 'gg', 'ggsdf', '23 November 2019 :: 23:35:43', '0000-00-00 00:00:00', 'Ongoing', 'gg'),
(424, 'sayuj', 'Sleeping', 'Good night! All work done for today ;)', '23 November 2019 :: 23:37:32', '0000-00-00 00:00:00', 'Completed', 'Sayuj');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(11) NOT NULL,
  `password` varchar(70) NOT NULL,
  `firstname` char(12) NOT NULL,
  `lastname` char(12) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `firstname`, `lastname`, `date`) VALUES
(23, 'varun', '$2y$10$UowbYe58khG8ofkiTQaks.HuQsG5YvBniFBLEj7y9WJMk46VMnTdW', 'varun', 'sehgal', '2019-11-17 17:56:20'),
(24, 'sayuj', '$2y$10$vmtPU.vHkACxCwa703CzreYqtaSrhopbmq9/VOkfBZky4Digbbva.', 'Sayuj', 'Sehgal', '2019-11-23 15:43:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cardtask`
--
ALTER TABLE `cardtask`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cardtask`
--
ALTER TABLE `cardtask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=425;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
