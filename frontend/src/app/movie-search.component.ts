import { Component, Input } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { Movie, MovieListEntry } from './model'

@Component({
	selector: 'nextflick-movie-search',
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.css', './movie-list.component.css']
})
export class MovieSearchComponent {
	searchEntries: MovieListEntry[] = []
	
	constructor(private api: NextFlickAPIService) { }
	
	@Input() additionalActions: Array<any> = []
	get actions(){
		return (
			this.isSelecting ? [
				this.hasSelectedEntries && {
					name: 'Deselect All',
					callback: () => this.clearSelectedEntries()
				},
				{
					name: 'Cancel',
					callback: () => this.endSelect()
				}
			] : [
				{
					name: 'Select',
					callback: () => this.startSelect()
				}
			]
		).concat(this.additionalActions).filter(_ => _)
	}
	
	isSelecting = false
	
	startSelect(){
		this.isSelecting = true
	}
	endSelect(){
		this.isSelecting = false
		this.clearSelectedEntries()
	}
	
	selectedEntries: Set<MovieListEntry> = new Set()
	get hasSelectedEntries(){
		return this.selectedEntries.size > 0
	}
	clearSelectedEntries(){
		this.selectedEntries.clear()
	}
	toggleSelectEntry(entry: MovieListEntry): void {
		this.selectedEntries.has(entry) ? this.selectedEntries.delete(entry) : this.selectedEntries.add(entry)
	}
	
	isSearching = false
	search = debounce(function(searchQuery: string){
		if(!searchQuery){
			this.isSearching = false
			return
		}
		
		this.isSearching = true
		this.api.movieDB.search(searchQuery).then(results => {
			this.isSearching = false
			console.log(results)
			this.searchEntries = results['results'].map(tmdbMovie =>
				new MovieListEntry({ movie: Movie.fromTMDB(tmdbMovie) })
			)
		})
	}, 500)
}

// https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
function throttle(callback, wait, immediate = false) {
	let timeout = null, initialCall = true
	return function() {
		const callNow = immediate && initialCall
		const next = () => {
			callback.apply(this, arguments)
			timeout = null
		}
		if (callNow) { 
			initialCall = false
			next()
		}
		if (!timeout) {
			timeout = setTimeout(next, wait)
		}
	}
}

// https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
function debounce(callback, wait, immediate = false) {
	let timeout = null
	return function() {
		const callNow = immediate && !timeout
		const next = () => callback.apply(this, arguments)
		clearTimeout(timeout)
		timeout = setTimeout(next, wait)
		if (callNow) {
			next()
		}
	}
}