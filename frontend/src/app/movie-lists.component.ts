import { Component, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieList } from './model'

@Component({
	selector: 'nextflick-movie-lists',
	templateUrl: './movie-lists.component.html',
	styleUrls: ['./movie-lists.component.css'],
	providers: [ NextFlickAPIService ]
})
export class MovieListsComponent implements OnInit {
	movieLists: MovieList[]
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieLists = await this.api.movieList.list()
		// this.api.movieList.list()
		// 	.then(movieLists =>{
		// 		console.log(movieLists)
		// 		this.movieLists = movieLists as MovieList[]
		// 	})
	}

	async create(movieList: MovieList) {
		await this.api.movieList.create(movieList)
		this.movieLists.push(movieList)
		
		// this.api.movieList.create(movieList)
		// 	.then(movieList =>
		// 		this.movieLists.push(movieList as MovieList)
		// 	)
	}

	async delete(movieList: MovieList) {
		await this.api.movieList.delete(movieList)
		this.movieLists.splice(this.movieLists.indexOf(movieList), 1)
		// this.api.movieList.delete({id: movieList.id})
		// 	.then(movieList =>
		// 		this.movieLists.splice(this.movieLists.indexOf(movieList as MovieList), 1)
		// 	)
	}
}