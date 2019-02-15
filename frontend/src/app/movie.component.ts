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
		const movieID = this.movie && this.movie.id || this.movieID
		// if(movieID)
		// 	this.movieWatches = await this.api.movieWatch.list({movieID})
	}
	
	get hasRating(){
		// C# serializes MySQL null values as {"Data":null,"UnityType":2,"AssemblyName":""} for some reason; temporary workaround
		return this.movie && this.movie.userMovieWatch &&
			this.movie.userMovieWatch.rating !== undefined &&
			typeof this.movie.userMovieWatch.rating !== 'object'
	}
}