
CREATE TABLE IF NOT EXISTS `users` (
  id CHAR(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME NULL DEFAULT NULL, 
  `name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `birthDate` VARCHAR(10) NOT NULL,
  `age` INT NULL,

  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

DROP TABLE users;