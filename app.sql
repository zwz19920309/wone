/*
Navicat MySQL Data Transfer

Source Server         : app
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : app

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-08 10:28:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for award_record
-- ----------------------------
DROP TABLE IF EXISTS `award_record`;
CREATE TABLE `award_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `prize_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `scenesign_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for checkin_type
-- ----------------------------
DROP TABLE IF EXISTS `checkin_type`;
CREATE TABLE `checkin_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT NULL COMMENT '签到类型',
  `name` varchar(40) DEFAULT NULL COMMENT '签到类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of checkin_type
-- ----------------------------
INSERT INTO `checkin_type` VALUES ('1', '1', '每日签到');
INSERT INTO `checkin_type` VALUES ('2', '2', '连续签到');
INSERT INTO `checkin_type` VALUES ('3', '3', '累计签到');

-- ----------------------------
-- Table structure for continue_sign
-- ----------------------------
DROP TABLE IF EXISTS `continue_sign`;
CREATE TABLE `continue_sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `scenesign_id` int(11) DEFAULT NULL,
  `first_sign_date` date DEFAULT NULL,
  `last_award_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for date_type
-- ----------------------------
DROP TABLE IF EXISTS `date_type`;
CREATE TABLE `date_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT NULL COMMENT '日期类型',
  `name` varchar(40) DEFAULT NULL COMMENT '日期类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of date_type
-- ----------------------------
INSERT INTO `date_type` VALUES ('1', '1', '日');
INSERT INTO `date_type` VALUES ('2', '2', '周');
INSERT INTO `date_type` VALUES ('3', '3', '月');
INSERT INTO `date_type` VALUES ('4', '4', '年');
INSERT INTO `date_type` VALUES ('5', '5', '自定义');

-- ----------------------------
-- Table structure for prize
-- ----------------------------
DROP TABLE IF EXISTS `prize`;
CREATE TABLE `prize` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL COMMENT '奖品名称',
  `note` varchar(400) DEFAULT NULL COMMENT '奖品描述',
  `icon` varchar(400) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for resign_form
-- ----------------------------
DROP TABLE IF EXISTS `resign_form`;
CREATE TABLE `resign_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` tinyint(4) DEFAULT NULL COMMENT '补签形式type',
  `name` varchar(255) DEFAULT NULL COMMENT '补签形式名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resign_form
-- ----------------------------
INSERT INTO `resign_form` VALUES ('1', '1', '立即补签');
INSERT INTO `resign_form` VALUES ('2', '2', '延期补签');

-- ----------------------------
-- Table structure for scene
-- ----------------------------
DROP TABLE IF EXISTS `scene`;
CREATE TABLE `scene` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL COMMENT '场景名称',
  `note` varchar(400) DEFAULT NULL COMMENT '场景描述',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for scene_sign
-- ----------------------------
DROP TABLE IF EXISTS `scene_sign`;
CREATE TABLE `scene_sign` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL COMMENT '场景签到规则',
  `scene_id` bigint(20) DEFAULT NULL,
  `signon_id` bigint(20) DEFAULT NULL,
  `start_at` date DEFAULT NULL,
  `end_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resign` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO `settings` VALUES ('1');

-- ----------------------------
-- Table structure for signon
-- ----------------------------
DROP TABLE IF EXISTS `signon`;
CREATE TABLE `signon` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL COMMENT '签到模板名称',
  `cycle_text` json DEFAULT NULL COMMENT '签到日期类型以及详细信息',
  `prizes_text` json DEFAULT NULL COMMENT '奖品详细信息',
  `extra_text` json DEFAULT NULL COMMENT '额外信息',
  `rule` json DEFAULT NULL COMMENT '签到模板规则',
  `rule_desc` varchar(400) DEFAULT NULL COMMENT '签到模板规则描述',
  `status` tinyint(4) DEFAULT '1' COMMENT '启用状态； 0，关闭；1，启用',
  `remove` tinyint(4) DEFAULT '0' COMMENT '是否删除； 0，不删除，1，删除',
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `checkintype_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for sign_record
-- ----------------------------
DROP TABLE IF EXISTS `sign_record`;
CREATE TABLE `sign_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `scene_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

