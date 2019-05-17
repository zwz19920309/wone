/*
Navicat MySQL Data Transfer

Source Server         : app
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : app

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-17 10:19:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for award_record
-- ----------------------------
DROP TABLE IF EXISTS `award_record`;
CREATE TABLE `award_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(200) DEFAULT NULL,
  `prize_id` int(11) DEFAULT NULL COMMENT '奖品id',
  `number` int(11) DEFAULT NULL COMMENT '奖品数量',
  `scene_id` int(11) DEFAULT NULL COMMENT '场景id',
  `scene_sign_id` int(11) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL COMMENT '操作类型：type: 0,减少，type: 1增加',
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of award_record
-- ----------------------------

-- ----------------------------
-- Table structure for checkin_type
-- ----------------------------
DROP TABLE IF EXISTS `checkin_type`;
CREATE TABLE `checkin_type` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
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
  `uid` varchar(200) DEFAULT NULL,
  `scene_sign_id` int(11) DEFAULT NULL,
  `first_sign_date` date DEFAULT NULL,
  `last_award_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of continue_sign
-- ----------------------------

-- ----------------------------
-- Table structure for date_type
-- ----------------------------
DROP TABLE IF EXISTS `date_type`;
CREATE TABLE `date_type` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
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
-- Table structure for platform
-- ----------------------------
DROP TABLE IF EXISTS `platform`;
CREATE TABLE `platform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `path` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of platform
-- ----------------------------
INSERT INTO `platform` VALUES ('1', '金十', null);

-- ----------------------------
-- Table structure for prize
-- ----------------------------
DROP TABLE IF EXISTS `prize`;
CREATE TABLE `prize` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL COMMENT '奖品名称',
  `note` varchar(400) DEFAULT NULL COMMENT '奖品描述',
  `icon` varchar(400) DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prize
-- ----------------------------
INSERT INTO `prize` VALUES ('45', '12321', '31231', 'public/prizes/8a47c295389585d9d4d5b57b4c081402030baf5f.jpg', '1', null, null);
INSERT INTO `prize` VALUES ('46', '12312', '312321', 'public/prizes/1ee9e6547ac06f961dc42fcf347756dd7a2241e5.jpg', '1', null, null);

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
  `salt` varchar(80) DEFAULT NULL,
  `app_id` varchar(80) DEFAULT NULL,
  `app_secret` varchar(80) DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scene
-- ----------------------------
INSERT INTO `scene` VALUES ('62', '12312', '3213123', null, 'mCJadMMPlHMfzZbmfZTd', '4514d5540c870b35ac04b745cc09fad8', '1', null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scene_sign
-- ----------------------------

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
  `platform_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `checkintype_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of signon
-- ----------------------------
INSERT INTO `signon` VALUES ('105', '金十电台', '{\"name\": \"自定义\", \"type\": 5, \"number\": \"10\"}', null, '{\"resign\": {\"cost\": 2, \"resign\": 1, \"form_id\": 1, \"resign_dates\": [\"2019-05-01\", \"2019-05-05\", \"2019-05-12\", \"2019-05-19\", \"2019-05-26\", \"2019-05-25\", \"2019-05-18\"]}}', null, '金十电台', '1', '0');

-- ----------------------------
-- Table structure for sign_record
-- ----------------------------
DROP TABLE IF EXISTS `sign_record`;
CREATE TABLE `sign_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(200) DEFAULT NULL,
  `scene_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_record
-- ----------------------------

-- ----------------------------
-- Table structure for user_award
-- ----------------------------
DROP TABLE IF EXISTS `user_award`;
CREATE TABLE `user_award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(200) DEFAULT NULL,
  `prize_id` int(11) DEFAULT '0',
  `number` int(11) DEFAULT '0',
  `scene_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usindex` (`scene_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_award
-- ----------------------------

-- ----------------------------
-- Procedure structure for f_calendar
-- ----------------------------
DROP PROCEDURE IF EXISTS `f_calendar`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `f_calendar`(in start_date VARCHAR(20),in date_count int)
begin  
declare i int;  
    set i=0;  
    DELETE from calendar;  
    while i < date_count DO  
        INSERT into calendar (day_short_desc,day_long_desc,week_desc,week_id,week_long_desc,month_id,month_long_desc,quarter_id,quarter_long_desc,year_id,year_long_desc)  
            SELECT  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y-%m-%d') day_short_desc,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年%m月%d日') day_long_desc,  
                case DAYOFWEEK(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'))  when 1 then '星期日' when 2 then '星期一' when 3 then '星期二' when 4 then '星期三' when 5 then '星期四' when 6 then '星期五' when 7 then '星期六' end WEEK_DESC,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y%u') week_id,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年第%u周') week_long_desc,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y%m') month_id,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年第%m月') month_long_desc,  
                CONCAT(DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y'),quarter(STR_TO_DATE( start_date,'%Y-%m-%d %H:%i:%s'))) quarter_id,  
                CONCAT(DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y'),'年第',quarter(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s')),'季度') quarter_long_desc,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y') year_id,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年') year_long_desc  
        from dual;  
        set i=i+1;  
        set start_date = DATE_FORMAT(date_add(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),interval 1 day),'%Y-%m-%d');  
    end while;  
end
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for f_dim_day
-- ----------------------------
DROP PROCEDURE IF EXISTS `f_dim_day`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `f_dim_day`(in start_date VARCHAR(20),in date_count int)
begin  
declare i int;  
    set i=0;  
    DELETE from dim_day;  
    while i < date_count DO  
        INSERT into dim_day (DAY_SHORT_DESC,DAY_LONG_DESC,WEEK_DESC,WEEK_ID,WEEK_LONG_DESC,MONTH_ID,MONTH_LONG_DESC,QUARTER_ID,QUARTER_LONG_DESC,YEAR_ID,YEAR_LONG_DESC)  
            SELECT  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y-%m-%d') DAY_SHORT_DESC,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年%m月%d日') DAY_LONG_DESC,  
                case DAYOFWEEK(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'))  when 1 then '星期日' when 2 then '星期一' when 3 then '星期二' when 4 then '星期三' when 5 then '星期四' when 6 then '星期五' when 7 then '星期六' end WEEK_DESC,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y%u') WEEK_ID,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年第%u周') WEEK_LONG_DESC,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y%m') MONTH_ID,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年第%m月') MONTH_LONG_DESC,  
                CONCAT(DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y'),quarter(STR_TO_DATE( start_date,'%Y-%m-%d %H:%i:%s'))) QUARTER_ID,  
                CONCAT(DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y'),'年第',quarter(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s')),'季度') QUARTER_LONG_DESC,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y') YEAR_ID,  
                DATE_FORMAT(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),'%Y年') YEAR_LONG_DESC  
        from dual;  
        set i=i+1;  
        set start_date = DATE_FORMAT(date_add(STR_TO_DATE(start_date,'%Y-%m-%d %H:%i:%s'),interval 1 day),'%Y-%m-%d');  
    end while;  
end
;;
DELIMITER ;

-- ----------------------------
-- Function structure for f_continuty_days
-- ----------------------------
DROP FUNCTION IF EXISTS `f_continuty_days`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `f_continuty_days`(id INT, start_time DATE, end_time DATE) RETURNS int(11)
BEGIN
	DECLARE days INT;
	DECLARE flag INT;
	DECLARE previous_day DATE;
	SET days := 0;
	SET flag := 1;
	SET previous_day := DATE_SUB(end_time,INTERVAL 1 DAY);
	
	WHILE flag>0 DO
		SELECT COUNT(DISTINCT(DATE(login_time))) INTO flag  FROM  user_login 
		WHERE pid = id 
		AND DATE(login_time) = previous_day ;
		IF flag > 0 THEN 
			SET days := days + 1;
			SET previous_day := DATE_SUB(previous_day,INTERVAL 1 DAY);
		END IF;
	END WHILE; 
	RETURN days;
    END
;;
DELIMITER ;
