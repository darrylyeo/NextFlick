USE `nextflick`


INSERT INTO `nextflick`.`User`
	(`id`, `name`)
VALUES
	(1, 'Darryl'),
	(2, 'Justin'),
	(3, 'Amy');


INSERT INTO `nextflick`.`Movie`
	(`id`, `title`, `tmdbData`)
VALUES
	(1, 'Avatar', '{"adult":false,"backdrop_path":"/aHcth2AXzZSjhX7JYh7ie73YVNc.jpg","belongs_to_collection":{"id":87096,"name":"Avatar Collection","poster_path":"/nslJVsO58Etqkk17oXMuVK4gNOF.jpg","backdrop_path":"/9s4BM48NweGFrIRE6haIul0YJ9f.jpg"},"budget":237000000,"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":14,"name":"Fantasy"},{"id":878,"name":"Science Fiction"}],"homepage":"http://www.avatarmovie.com/","id":19995,"imdb_id":"tt0499549","original_language":"en","original_title":"Avatar","overview":"In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.","popularity":27.944,"poster_path":"/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg","production_companies":[{"id":289,"logo_path":null,"name":"Ingenious Film Partners","origin_country":""},{"id":444,"logo_path":null,"name":"Dune Entertainment","origin_country":"US"},{"id":574,"logo_path":"/iB6GjNVHs5hOqcEYt2rcjBqIjki.png","name":"Lightstorm Entertainment","origin_country":"US"},{"id":25,"logo_path":"/qZCc1lty5FzX30aOCVRBLzaVmcp.png","name":"20th Century Fox","origin_country":"US"}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"},{"iso_3166_1":"GB","name":"United Kingdom"}],"release_date":"2009-12-10","revenue":2787965087,"runtime":162,"spoken_languages":[{"iso_639_1":"en","name":"English"},{"iso_639_1":"es","name":"Español"}],"status":"Released","tagline":"Enter the World of Pandora.","title":"Avatar","video":false,"vote_average":7.4,"vote_count":17599}'),
	(2, 'Titanic', ''),
	(3, 'Star Wars: The Force Awakens', ''),
	(4, 'Avengers: Infinity War', ''),
	(5, 'Jurassic World', ''),
	(6, 'The Avengers', ''),
	(7, 'Furious 7', '');


INSERT INTO `nextflick`.`MovieList`
	(`id`, `userID`, `title`)
VALUES
	(1, 1, 'Darryl\'s Favorite Movies'),
	(2, 2, 'Justin\'s Favorite Movies'),
	(3, 3, 'Amy\'s Favorite Movies'),
	(4, 1, 'Darryl\'s Movies to Watch'),
	(5, 1, 'All-Time Highest Grossing Movies');


INSERT INTO `nextflick`.`MovieListEntry`
	(`movieListID`, `movieID`)
VALUES
	(1, 1),
	(1, 3),
	(1, 4),
	(2, 2),
	(2, 4),
	(3, 3),
	(3, 5),
	(4, 2),
	(5, 1),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 5),
	(5, 6);