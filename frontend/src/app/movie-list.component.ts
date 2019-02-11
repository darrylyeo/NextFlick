import { Component, OnInit, Input } from '@angular/core';

import { NextFlickAPIService } from './api.service'

import { MovieList, MovieListEntry } from './model'

@Component({
	selector: 'nextflick-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	@Input() movieList: MovieList;
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		console.log('movieList', this.movieList, this)
		this.getData();
	}

	getData() {
		this.api.movieListEntry.get(this.movieList)
			.subscribe(movieListEntries =>
				this.movieList.entries = movieListEntries as MovieListEntry[]
			)
	}
}