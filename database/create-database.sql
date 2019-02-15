SET FOREIGN_KEY_CHECKS = 0;
SET NAMES 'utf8';

DROP DATABASE IF EXISTS `nextflick`;
CREATE DATABASE `nextflick`;

-- `nextflick`.`Movie`
CREATE TABLE `nextflick`.`Movie` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`title`             text NOT NULL,
	-- `releaseDate`       date NOT NULL,
	-- `posterImage`       blob NOT NULL,
	`tmdbID`            int NOT NULL,
	`tmdbData`          longtext NOT NULL,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`)
);

-- `nextflick`.`MovieList`
CREATE TABLE `nextflick`.`MovieList` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`title`             text NOT NULL,
	`userID`            int NOT NULL,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`),
	
	KEY `fk_User_MovieList` (`userID`),
	CONSTRAINT `Constraint_fk_User_MovieList`
		FOREIGN KEY `fk_User_MovieList` (`userID`)
		REFERENCES `nextflick`.`User` (`id`)
);

-- `nextflick`.`MovieWatch`
CREATE TABLE `nextflick`.`MovieWatch` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`userID`            int NOT NULL,
	`movieID`           int NOT NULL,
	`rating`            int,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`, `userID`, `movieID`),
	
	KEY `fk_User_MovieWatch` (`userID`),
	CONSTRAINT `Constraint_fk_User_MovieWatch`
		FOREIGN KEY `fk_User_MovieWatch` (`userID`)
		REFERENCES `nextflick`.`User` (`id`),
	
	KEY `fk_Movie_MovieWatch` (`movieID`),
	CONSTRAINT `Constraint_fk_Movie_MovieWatch`
		FOREIGN KEY `fk_Movie_MovieWatch` (`movieID`)
		REFERENCES `nextflick`.`Movie` (`id`)
);

-- `nextflick`.`MovieListEntry`
CREATE TABLE `nextflick`.`MovieListEntry` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`movieListID`       int NOT NULL,
	`movieID`           int NOT NULL,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`, `movieListID`, `movieID`),
	
	KEY `fk_MovieList_MovieListEntry` (`movieListID`),
	CONSTRAINT `Constraint_fk_MovieList_MovieListEntry`
		FOREIGN KEY `fk_MovieList_MovieListEntry` (`movieListID`)
		REFERENCES `nextflick`.`MovieList` (`id`)
		ON DELETE CASCADE,
	
	KEY `fk_Movie_MovieListEntry` (`movieID`),
	CONSTRAINT `Constraint_fk_Movie_MovieListEntry`
		FOREIGN KEY `fk_Movie_MovieListEntry` (`movieID`)
		REFERENCES `nextflick`.`Movie` (`id`)
);

-- `nextflick`.`User`
CREATE TABLE `nextflick`.`User` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`name`              text NOT NULL,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`)
);




-- `createdTimestamp`  timestamp NOT NULL
	-- DEFAULT CURRENT_TIMESTAMP,
-- `modifiedTimestamp` timestamp NOT NULL
	-- DEFAULT CURRENT_TIMESTAMP
	-- ON UPDATE CURRENT_TIMESTAMP,