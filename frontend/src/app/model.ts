export class Movie {
	id?: number
	title: string
	tmdbID: number
	tmdbData: TMDBMovie
	createdTimestamp: Date
	modifiedTimestamp: Date
	
	static fromTMDB(tmdbData: TMDBMovie): Movie {
		return {
			title: tmdbData.title,
			tmdbID: tmdbData.id,
			tmdbData
		} as Movie
	}
}

export class TMDBMovie {
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
	get release_year(){
		return this.release_date.match(/\d+/)[1]
	}
}

export class MovieList {
	id: number
	title: string = ''
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