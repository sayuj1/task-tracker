-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2019 at 02:27 PM
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
-- Database: `todoapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `todotask`
--

CREATE TABLE `todotask` (
  `todoId` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `todo` text NOT NULL,
  `datecreated` varchar(50) NOT NULL,
  `status` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `todotask`
--

INSERT INTO `todotask` (`todoId`, `username`, `todo`, `datecreated`, `status`) VALUES
(1, 'sayuj', 'sdf', '21 November 2019 :: 21:52:23', 'Pending'),
(2, 'sayuj', 'qq', '21 November 2019 :: 21:55:17', 'Pending'),
(4, 'sayuj', 'ff', '21 November 2019 :: 22:00:02', 'Pending'),
(5, 'sayuj', 'gqewr', '21 November 2019 :: 22:00:30', 'Pending'),
(7, 'sayuj', 'a', '21 November 2019 :: 22:01', 'Pending'),
(13, 'sayuj', 'ffdf<br>\nhiÂ ', '21 November 2019 :: 23:08', 'Pending'),
(16, 'sayuj', 'hey there i am<br>\nusing this todo<br>\nand its really awesome!', '21 November 2019 :: 23:10', 'Complete'),
(49, 'sayuj', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '23 November 2019 :: 00:37:58', 'Pending'),
(115, 'varun', 'asdf', '27 November 2019 :: 17:22:09', 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todotask`
--
ALTER TABLE `todotask`
  ADD PRIMARY KEY (`todoId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todotask`
--
ALTER TABLE `todotask`
  MODIFY `todoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
