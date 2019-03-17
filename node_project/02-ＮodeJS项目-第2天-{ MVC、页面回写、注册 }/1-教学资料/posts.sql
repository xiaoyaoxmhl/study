/*
Navicat MySQL Data Transfer

Source Server         : quanzhan05
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : node_music

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2018-08-29 19:42:34
*/

SET FOREIGN_KEY_CHECKS=0;

USE node_music;
-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
