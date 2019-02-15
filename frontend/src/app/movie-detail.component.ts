import { Component, Output, EventEmitter } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { Movie, MovieWatch } from './model'

@Component({
	selector: 'nextflick-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
	movie: Movie
	
	@Output() hideMovieDetail = new EventEmitter()
	
	constructor(private api: NextFlickAPIService) { }
	
	onShowMovieDetail(movie: Movie) {
		console.log(movie)
		this.movie = movie
		this.getData()
	}
	async getData(){
		const movieID = this.movie && this.movie.id
		if(movieID){
			// this.movie.movieWatches = await this.api.movieWatch.list({movieID})
			// this.movie.userMovieWatch = this.movieWatches.find(w => w.userID === 1)
			// 	|| new MovieWatch({movieID: this.movie.id, userID: 1})
			
			this.movie.userMovieWatch = await this.api.movieWatch.get({movieID, userID: 1})
		}
	}
	
	async setWatched(){
		const userMovieWatch = this.movie.userMovieWatch = new MovieWatch({movieID: this.movie.id, userID: 1})
		await this.api.movieWatch.create(userMovieWatch)
		await this.getData()
	}
	async setNotWatched(){
		const userMovieWatch = this.movie.userMovieWatch
		this.movie.userMovieWatch = undefined
		await this.api.movieWatch.delete(userMovieWatch)
		await this.getData()
	}
	
	get actions() {
		return [
			this.movie.userMovieWatch ? {
				name: 'I Didn\'t Watch This',
				callback: () => this.setNotWatched()
			} : {
				name: 'I Watched This',
				callback: () => this.setWatched()
			},
			{
				name: 'Close',
				callback: () => this.hideMovieDetail.emit()
			}
		]
	}
}