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
	
	isShowingMovieDetail = false
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieLists = await this.api.movieList.list()
	}
	
	get actions() {
		return [
			{
				name: 'New List',
				callback: () => this.createList()
			}
		]
	}

	async createList() {
		const movieList = new MovieList({userID: 1, entries: []})
		console.log('movieList', movieList)
		this.movieLists.push(movieList)
		await this.api.movieList.create(movieList)
		console.log(`Added movie list "${movieList.title}"`, movieList)
	}

	async removeList(movieList: MovieList) {
		this.movieLists.splice(this.movieLists.indexOf(movieList), 1)
		await this.api.movieList.delete(movieList)
		console.log(`Removed movie list "${movieList.title}"`, movieList)
	}
}