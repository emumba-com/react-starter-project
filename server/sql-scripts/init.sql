CREATE SCHEMA 'react-starter';

 CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` varchar(128) NULL,
    `password` varchar(128) NULL,
    `firstName` varchar(128) NULL,
    `lastName` varchar(128) NULL,
    `linkHome` varchar(128) DEFAULT '/',
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
 );

INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`) VALUES
('starter', '123456', 'Sajid', 'Tichkulay');
