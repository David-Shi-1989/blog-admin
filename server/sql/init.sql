CREATE DATABASE IF NOT EXISTS swwBlog DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE swwBlog;
/*文章分类*/
CREATE TABLE IF NOT EXISTS Article_Class
(
  class_id VARCHAR(100) NOT NULL PRIMARY KEY,
  class_parent_id VARCHAR(100),
  class_name VARCHAR(30) NOT NULL,
  class_create_time DATETIME NOT NULL,
  is_enable TINYINT DEFAULT 1
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

/*文章*/
CREATE TABLE IF NOT EXISTS Article_List
(
  article_id VARCHAR(100) NOT NULL PRIMARY KEY,
  article_class_id VARCHAR(100),
  article_title VARCHAR(100) NOT NULL,
  article_content TEXT NOT NULL,
  article_create_time DATETIME NOT NULL,
  article_update_time DATETIME,
  article_is_publish TINYINT DEFAULT 0 COMMENT '是否发布',
  article_is_self TINYINT DEFAULT 1 COMMENT '是否是原创',
  article_is_top TINYINT DEFAULT 0 COMMENT '是否置顶',
  article_read_count INT(64) DEFAULT 0 COMMENT '阅读数量',
  article_comment_count INT(64) DEFAULT 0 COMMENT '评论数量',
  is_enable TINYINT DEFAULT 1
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;