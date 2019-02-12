import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieList, MovieListEntry } from './model'

@Component({
	selector: 'nextflick-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	@Input() movieList: MovieList
	@Output() removeList = new EventEmitter()
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.movieList.entries = await this.api.movieListEntry.list({movieListID: this.movieList.id})
	}
	
	get actions() {
		return (this.isEditing ? [
			this.canSaveEdit && {
				name: 'Save',
				callback: () => this.saveEdit()
			},
			{
				name: 'Cancel',
				callback: () => this.endEdit()
			}
		] : this.hasSelectedEntries ? [
			/*{
				name: 'Move To',
				callback: () => {
					
				}
			},*/
			{
				name: 'Remove Selected',
				callback: () => this.removeSelectedEntries()
			},
			{
				name: 'Cancel',
				callback: () => this.clearSelectedEntries()
			}
		] : [
			{
				name: 'Select',
				callback: () => {
					
				}
			},
			{
				name: 'Delete List',
				callback: () => this.removeList.emit()
			}
		]).filter(_ => _)
	}
	
	
	selectedEntries: Set<MovieListEntry> = new Set()
	toggleSelect(entry: MovieListEntry): void {
		this.selectedEntries.has(entry) ? this.selectedEntries.delete(entry) : this.selectedEntries.add(entry)
	}
	
	
	@ViewChild('titleInput') titleInput: ElementRef;
	isEditing = false
	
	startEdit(){
		this.isEditing = true
		this.titleInput.nativeElement.focus()
	}
	get canSaveEdit(){
		return !!this.titleInput.nativeElement.value.trim()
	}
	async saveEdit(){
		const newTitle = this.titleInput.nativeElement.value.trim()
		if(newTitle){
			this.movieList.title = newTitle
			await this.api.movieList.update(this.movieList)
			this.endEdit()
		}
	}
	endEdit(){
		this.isEditing = false
	}
	
	clearSelectedEntries(){
		this.selectedEntries.clear()
	}
	
	get hasSelectedEntries(){
		return this.selectedEntries.size > 0
	}
	removeSelectedEntries(){
		this.selectedEntries.forEach(entry => this.removeEntry(entry))
		this.selectedEntries.clear()
	}
	
	async removeEntry(entry: MovieListEntry){
		const {entries} = this.movieList
		entries.splice(entries.indexOf(entry), 1)
		await this.api.movieListEntry.delete(entry)
		
		console.log(`Removed movie ${entry.movie.title} from list "${this.movieList.title}"`, entry)
	}
}