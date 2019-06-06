CREATE DATABASE IF NOT EXISTS swwBlog DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE swwBlog;
/*文章分类*/
CREATE TABLE IF NOT EXISTS Article_Class
(
  class_id VARCHAR(100) NOT NULL PRIMARY KEY,
  class_parent_id VARCHAR(100),
  class_name VARCHAR(30) NOT NULL,
  class_create_time DATETIME NOT NULL,
  is_enable BIT DEFAULT 1
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

/*文章*/
CREATE TABLE IF NOT EXISTS Article_List
(
  article_id VARCHAR(100) NOT NULL PRIMARY KEY,
  article_class_id VARCHAR(100),
  article_title VARCHAR(100) NOT NULL,
  article_content TEXT NOT NULL,
  article_create_time DATETIME NOT NULL,
  is_enable BIT DEFAULT 1
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;