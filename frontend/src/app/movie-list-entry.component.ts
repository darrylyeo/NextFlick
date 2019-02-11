import { Component, OnInit, Input } from '@angular/core';

import { NextFlickAPIService } from './api.service'

import { MovieListEntry, Movie } from './model'

@Component({
	selector: 'nextflick-movie-list-entry',
	templateUrl: './movie-list-entry.component.html'
})
export class MovieListEntryComponent {
	@Input() movieListEntry: MovieListEntry;
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData();
	}

	getData() {
		this.api.movie.get(this.movieListEntry)
			.subscribe(movie =>{console.log(this, movie)
				this.movieListEntry.movie = movie as Movie
			})
	}
}