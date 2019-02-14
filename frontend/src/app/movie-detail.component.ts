import { Component } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { Movie, MovieWatch } from './model'

@Component({
	selector: 'nextflick-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
	movie: Movie
	movieWatches: MovieWatch[]
	
	constructor(private api: NextFlickAPIService) { }
	
	onShowMovieDetail(movie: Movie) {
		console.log(movie)
		this.movie = movie
		this.getData()
	}

	async getData() {
		this.movieWatches = await this.api.movieWatch.list({userID: 1, movieID: this.movie.id})
	}
}