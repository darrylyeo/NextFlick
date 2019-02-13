import { Component, OnInit, Input } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieListEntry, Movie } from './model'

@Component({
	selector: 'nextflick-movie-list-entry',
	templateUrl: './movie-list-entry.component.html',
	styleUrls: ['./movie-list-entry.component.css']
})
export class MovieListEntryComponent {
	@Input() movieListEntry: MovieListEntry
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		if(this.movieListEntry.movieID)
			this.movieListEntry.movie = await this.api.movie.get({id: this.movieListEntry.movieID})
	}
	
	isSelected: boolean = false
}