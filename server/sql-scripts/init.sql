CREATE SCHEMA 'react-starter';

CREATE TABLE `icons` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `path` VARCHAR(128) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `configurations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(128) NULL,
  `value` VARCHAR(128) NULL,
  `notes` VARCHAR(1024) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC));