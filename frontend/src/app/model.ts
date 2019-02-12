export class Movie {
	id: number
	title: string
	tmdbID: number
	tmdbData: object
	createdTimestamp: Date
	modifiedTimestamp: Date
}

export class MovieList {
	id: number
	title: string
	userID: number
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	entries: MovieListEntry[]
}

export class MovieListEntry {
	id: number
	movieListID: number
	movieID: number
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	movieList: MovieList
	movie: Movie
}

export class MovieWatch {
	id: number
	userID: number
	movieID: number
	rating: number
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	user: User
	movie: Movie
}

export class User {
	id: number
	name: string
	createdTimestamp: Date
	modifiedTimestamp: Date
}