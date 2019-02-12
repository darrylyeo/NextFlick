import { Component, Input, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieWatch } from './model'

@Component({
	selector: 'nextflick-movie-watch',
	templateUrl: './movie-watch.component.html'
})
export class MovieWatchComponent {
	@Input() movieWatch: MovieWatch
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieWatch.user = await this.api.user.get({id: this.movieWatch.userID})
	}
}