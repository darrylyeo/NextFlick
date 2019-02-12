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
	newMovieList: MovieList
	
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
	
	get actions() {
		return [
			{
				name: 'New List',
				callback: () => {
					const newMovieList = this.newMovieList = new MovieList()
				}
			}
		]
	}

	async create(movieList: MovieList) {
		await this.api.movieList.create(movieList)
		this.movieLists.push(movieList)
		console.log(`Added movie list "${movieList.title}"`, movieList)
	}

	async removeList(movieList: MovieList) {
		await this.api.movieList.delete(movieList)
		this.movieLists.splice(this.movieLists.indexOf(movieList), 1)
		console.log(`Removed movie list "${movieList.title}"`, movieList)
	}
}