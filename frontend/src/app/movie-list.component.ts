import { Component, Input, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieList, MovieListEntry } from './model'

@Component({
	selector: 'nextflick-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	@Input() movieList: MovieList
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieList.entries = await this.api.movieListEntry.list({movieListID: this.movieList.id})
	}
	
	selectedEntries: Set<MovieListEntry> = new Set()
	toggleSelect(entry: MovieListEntry): void {
		this.selectedEntries.has(entry) ? this.selectedEntries.delete(entry) : this.selectedEntries.add(entry)
	}
	
	get actions() {
		const {selectedEntries} = this
		if(selectedEntries.size){
			return [
				/*{
					name: 'Move To',
					callback: () => {
						
					}
				},*/
				{
					name: 'Remove Movies',
					callback: () => {
						selectedEntries.forEach(entry => this.remove(entry))
						// for(const entry of selectedEntries)
						// 	this.remove(entry)
					}
				},
				{
					name: 'Unselect All',
					callback: () => {
						selectedEntries.clear()
					}
				}
			]		
		}else{
			return [
				{
					name: 'Delete List',
					callback: () => {
						
					}
				}
			]
		}
	}
	
	remove(entry: MovieListEntry){
		const {entries} = this.movieList
		entries.splice(entries.indexOf(entry), 1)
	}
}