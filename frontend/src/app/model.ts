class ModelClass {
	constructor(properties){
		Object.assign(this, properties)
	}
}

export class Movie extends ModelClass {
	id?: number
	title: string = ''
	tmdbID: number
	tmdbData: TMDBMovie
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	static fromTMDB(tmdbData: TMDBMovie): Movie {
		return new Movie({
			title: tmdbData.title,
			tmdbID: tmdbData.id,
			tmdbData
		})
	}
	
	userMovieWatch: MovieWatch
	watches: MovieWatch[]
}

export class TMDBMovie extends ModelClass {
	vote_count: number
	id: number
	video: boolean
	vote_average: number
	title: string
	popularity: number
	poster_path: string
	original_language: string
	original_title: string
	genre_ids: object
	backdrop_path: string
	adult: boolean
	overview: string
	release_date: string
}

export class MovieList extends ModelClass {
	id: number
	title: string = ''
	userID: number
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	entries: MovieListEntry[] = []
}

export class MovieListEntry extends ModelClass {
	id: number
	movieListID: number
	movieID: number
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	movieList: MovieList
	movie: Movie
}

export class MovieWatch extends ModelClass {
	id: number
	userID: number
	movieID: number
	rating?: number = undefined
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	user: User
	movie: Movie
}

export class User extends ModelClass {
	id: number
	name: string
	createdTimestamp: Date
	modifiedTimestamp: Date
}