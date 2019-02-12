import { Component, Input, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { Movie, MovieWatch } from './model'

@Component({
	selector: 'nextflick-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
	@Input() movie: Movie
	@Input() movieID: number
	movieWatches: MovieWatch[]
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieWatches = await this.api.movieWatch.list({userID: 1, movieID: this.movieID || this.movie.id})
	}
}