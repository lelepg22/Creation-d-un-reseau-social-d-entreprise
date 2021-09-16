-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-gaglianone.alwaysdata.net
-- Generation Time: Sep 16, 2021 at 03:30 PM
-- Server version: 10.5.11-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gaglianone_projet7`
--
CREATE DATABASE IF NOT EXISTS `gaglianone_projet7` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gaglianone_projet7`;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `createurId` smallint(5) NOT NULL,
  `userId` smallint(6) DEFAULT NULL,
  `postTitle` varchar(90) DEFAULT NULL,
  `timeStamp` datetime DEFAULT current_timestamp(),
  `commentaires` text DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `postID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`createurId`, `userId`, `postTitle`, `timeStamp`, `commentaires`, `link`, `postID`) VALUES
(2, NULL, 'Mon humeur ce matin mdr!', '2021-09-16 15:11:40', 'Et vous?', 'https://9gag.com/gag/a4EvwMQ', 1),
(2, NULL, 'Bonjour collègues ce vendredi!!!!', '2021-09-16 15:14:07', 'Qui veut regardez un match et boire un verre après le cours.... je veux dire après le travail ! mdr', NULL, 2),
(3, NULL, 'Recherche Appartement', '2021-09-16 15:21:48', 'Bonjour chère collègues, je cherche un appartement dans la ville, de préférence au centre, n’hésite pas à me contacter. ', NULL, 4);

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `postsTrigger` AFTER INSERT ON `posts` FOR EACH ROW INSERT INTO postsDetails(thePostId,createur,thePostArticle,thePostTitle,thePostLink) VALUES (new.postId, new.createurId, new.commentaires, new.postTitle, new.link)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `postsDetails`
--

CREATE TABLE `postsDetails` (
  `thePostId` int(11) NOT NULL,
  `userInPost` int(11) DEFAULT NULL,
  `commentedPost` text DEFAULT NULL,
  `timeStampOnPost` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `thePostTitle` varchar(120) NOT NULL,
  `thePostArticle` text NOT NULL,
  `thePostLink` varchar(60) DEFAULT NULL,
  `createur` varchar(80) NOT NULL,
  `commentaireId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postsDetails`
--

INSERT INTO `postsDetails` (`thePostId`, `userInPost`, `commentedPost`, `timeStampOnPost`, `thePostTitle`, `thePostArticle`, `thePostLink`, `createur`, `commentaireId`) VALUES
(1, NULL, NULL, '2021-09-16 13:11:40', 'Mon humeur ce matin mdr!', 'Et vous?', 'https://9gag.com/gag/a4EvwMQ', '2', 1),
(2, NULL, NULL, '2021-09-16 13:14:07', 'Bonjour collègues ce vendredi!!!!', 'Qui veut regardez un match et boire un verre après le cours.... je veux dire après le travail ! mdr', NULL, '2', 2),
(2, 3, 'Tu peux compte avec moi !', '2021-09-16 13:16:22', '', '', NULL, '', 3),
(4, NULL, NULL, '2021-09-16 13:21:48', 'Recherche Appartement', 'Bonjour chère collègues, je cherche un appartement dans la ville, de préférence au centre, n’hésite pas à me contacter. ', NULL, '3', 5);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` char(30) NOT NULL,
  `password` char(50) NOT NULL,
  `birthdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `email`, `password`, `birthdate`) VALUES
(1, 'lqlq', '7cab9f8a757d190703995bdd77a1173291be59f7', '2021-09-03 20:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `email` varchar(40) NOT NULL,
  `utilisateur` varchar(40) NOT NULL,
  `password` varchar(80) NOT NULL,
  `moderateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `utilisateur`, `password`, `moderateur`) VALUES
(1, 'admin@admin.fr', 'Admin', '$2b$10$w45LNu7oGcmoVVoeDG/lTObURMD/3oJL1nnh6ev1OB3ytApHbjQf6', 1),
(2, 'jean-marc@groupomania.fr', 'Jean Marc', '$2b$10$t1VtTcABzRNHxzgxYVs2g.G2GdGAlbdRSvGz6Wud5bb9o14qWSqVm', 0),
(3, 'marie-claire@groupomania.fr', 'Marie Claire', '$2b$10$HFLDecOjik5Oob5peeFnregDZSOVYSaEnksjY.Ap3b413lahOm5.q', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `postsDetails`
--
ALTER TABLE `postsDetails`
  ADD PRIMARY KEY (`commentaireId`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `constraint_unicite` (`email`,`utilisateur`),
  ADD UNIQUE KEY `constraint_unicite3` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `postsDetails`
--
ALTER TABLE `postsDetails`
  MODIFY `commentaireId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
