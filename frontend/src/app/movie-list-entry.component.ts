import { Component, OnInit, Input, ElementRef } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieListEntry, Movie } from './model'

@Component({
	selector: 'nextflick-movie-list-entry',
	templateUrl: './movie-list-entry.component.html',
	styleUrls: ['./movie-list-entry.component.css']
})
export class MovieListEntryComponent {
	@Input() movieListEntry: MovieListEntry
	
	constructor(private api: NextFlickAPIService, private elementRef: ElementRef) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		const movieID = this.movieListEntry.movieID
		if(movieID){
			this.movieListEntry.movie = await this.api.movie.get({id: movieID})
			this.movieListEntry.movie.userMovieWatch = await this.api.movieWatch.get({movieID, userID: 1})
		}
	}
	
	isSelected: boolean = false
	
	showMovieDetail(){
		if(this.movieListEntry.movie)
			this.elementRef.nativeElement.dispatchEvent(
				new CustomEvent('showMovieDetail', {bubbles: true, detail: this.movieListEntry.movie})
			)
	}
}