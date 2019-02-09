SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE `nextflick`;
CREATE DATABASE `nextflick`;

-- `nextflick`.`Movie`
CREATE TABLE `nextflick`.`Movie` (
	`id`                int NOT NULL AUTO_INCREMENT,
	`title`             text NOT NULL,
	-- `releaseDate`       date NOT NULL,
	-- `posterImage`       blob NOT NULL,
	-- `tmdbData`          json NOT NULL,
	-- `createdTimestamp`  timestamp NOT NULL
		-- DEFAULT CUR	RENT_TIMESTAMP,
	-- `modifiedTimestamp` timestamp NOT NULL,
	
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
	`user`              int NOT NULL,
	`movie`             int NOT NULL,
	`rating`            int NOT NULL,
	`createdTimestamp`  timestamp NOT NULL
		DEFAULT CURRENT_TIMESTAMP,
	`modifiedTimestamp` timestamp NOT NULL,
	
	PRIMARY KEY (`id`, `user`, `movie`),
	
	KEY `fk_User_MovieWatch` (`user`),
	CONSTRAINT `Constraint_fk_User_MovieWatch`
		FOREIGN KEY `fk_User_MovieWatch` (`user`)
		REFERENCES `nextflick`.`User` (`id`),
	
	KEY `fk_Movie_MovieWatch` (`movie`),
	CONSTRAINT `Constraint_fk_Movie_MovieWatch`
		FOREIGN KEY `fk_Movie_MovieWatch` (`movie`)
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
		REFERENCES `nextflick`.`MovieList` (`id`),
	
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




INSERT INTO `nextflick`.`User`
	(`id`, `name`)
VALUES
	(1, 'Darryl'),
	(2, 'Justin'),
	(3, 'Amy');


INSERT INTO `nextflick`.`Movie`
	(`id`, `title`)
VALUES
	(1, 'Avatar'),
	(2, 'Titanic');


INSERT INTO `nextflick`.`MovieList`
	(`id`, `userID`, `title`)
VALUES
	(1, 1, 'Favorites'),
	(2, 1, 'Movies to Watch');

INSERT INTO `nextflick`.`MovieListEntry`
	(`movieListID`, `movieID`)
VALUES
	(1, 1),
	(2, 2);