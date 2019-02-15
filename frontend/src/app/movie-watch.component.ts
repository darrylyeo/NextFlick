import { Component, Input, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieWatch } from './model'

@Component({
	selector: 'nextflick-movie-watch',
	templateUrl: './movie-watch.component.html',
	styleUrls: ['./movie-watch.component.css']
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
	
	isRating = false
	newRating: number
	
	get hasRating(){
		// C# serializes MySQL null values as {"Data":null,"UnityType":2,"AssemblyName":""} for some reason; temporary workaround
		if(typeof this.movieWatch.rating === 'object')
			this.movieWatch.rating = undefined
		
		return this.movieWatch.rating !== undefined
	}
	startRating(){
		this.isRating = true
		this.newRating = this.hasRating ? this.movieWatch.rating : 3
	}
	async saveRating(){
		this.movieWatch.rating = +this.newRating
		if(this.movieWatch.id){
			await this.api.movieWatch.update(this.movieWatch)
		}else{
			this.movieWatch = await this.api.movieWatch.create(this.movieWatch)
		}
		this.endRating()
	}
	endRating(){
		this.isRating = false
	}
	
	get canSaveRating(){
		return -5 <= this.newRating && this.newRating <= 5
	}
	
	get actions() {
		return this.isRating ? [
			this.canSaveRating && {
				name: 'Save Rating',
				callback: () => this.saveRating()
			},
			{
				name: 'Cancel',
				callback: () => this.endRating()
			}
		] : [
			{
				name: this.hasRating ? 'Edit Rating' : 'Rate This',
				callback: () => this.startRating()
			}
		]
	}
}