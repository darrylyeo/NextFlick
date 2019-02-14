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
	
	@Input() actions: Array<any>
	
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
	search(searchQuery: string){
		this.isSearching = true
		this.api.movieDB.search(searchQuery).then(results => {
			this.isSearching = false
			console.log(results)
			this.searchEntries = results['results'].map(tmdbMovie =>
				({ movie: Movie.fromTMDB(tmdbMovie) }) as MovieListEntry
			)
		})
	}
}