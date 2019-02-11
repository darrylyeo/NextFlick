import { Component, OnInit } from '@angular/core';
import { NextFlickAPIService } from './api.service'
import { MovieList } from './model'

@Component({
	selector: 'nextflick-movie-lists',
	templateUrl: './movie-lists.component.html',
	providers: [ NextFlickAPIService ]
})
export class MovieListsComponent implements OnInit {
	movieLists: MovieList[];
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData();
	}

	getData() {
		this.api.movieList.list()
			.subscribe(movieLists =>{
				console.log(movieLists)
				this.movieLists = movieLists as MovieList[]
			})
	}

	add(movieList: MovieList): void {
		this.api.movieList.add(movieList)
			.subscribe(movieList =>
				this.movieLists.push(movieList as MovieList)
			)
	}

	delete(movieList: MovieList): void {
		this.api.movieList.delete({id: movieList.id})
			.subscribe(movieList =>
				this.movieLists.splice(this.movieLists.indexOf(movieList as MovieList), 1)
			)
	}
}