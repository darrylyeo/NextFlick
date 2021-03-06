import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { MovieList, MovieListEntry } from './model'

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

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
		
		if(!this.movieList.title)
			this.startEdit()
	}

	async getData() {
		this.movieList.entries = []
		if(this.movieList.id)
			this.movieList.entries = await this.api.movieListEntry.list({movieListID: this.movieList.id})
	}
	
	get actions() {
		return (this.isEditing ? [
			this.canSaveEdit && {
				name: 'Save Title',
				callback: () => this.saveEdit()
			},
			{
				name: 'Cancel',
				callback: () => this.endEdit()
			}
		] : this.isSelecting ? [
			this.hasSelectedEntries && {
				name: 'Remove Selected',
				callback: () => this.removeSelectedEntries()
			},
			this.hasSelectedEntries && {
				name: 'Deselect All',
				callback: () => this.clearSelectedEntries()
			},
			{
				name: 'Done',
				callback: () => this.endSelect()
			}
		] /*this.hasSelectedEntries ? [
			{
				name: 'Remove Selected',
				callback: () => this.removeSelectedEntries()
			},
			{
				name: 'Cancel',
				callback: () => this.clearSelectedEntries()
			}
		]*/ : [
			this.hasEntries && {
				name: 'Select',
				callback: () => this.startSelect()
			},
			{
				name: 'Delete List',
				callback: () => this.removeList.emit()
			}
		]).filter(_ => _)
	}
	
	
	get hasEntries(){
		return this.movieList.entries.length > 0
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
	
	removeSelectedEntries(){
		this.selectedEntries.forEach(entry => this.removeEntry(entry))
		this.selectedEntries.clear()
		if(!this.hasEntries)
			this.endSelect()
	}
	async removeEntry(entry: MovieListEntry){
		const {entries} = this.movieList
		entries.splice(entries.indexOf(entry), 1)
		await this.api.movieListEntry.delete(entry)
		
		console.log(`Removed movie "${entry.movie.title}" from list "${this.movieList.title}"`, entry)
	}
	
	
	@ViewChild('titleInput') titleInput: ElementRef
	isEditing = false
	newTitle = ''

	startEdit(){
		this.isEditing = true
		this.newTitle = this.movieList.title
		requestAnimationFrame(() => this.titleInput.nativeElement.focus())
	}
	get canSaveEdit(){
		return this.newTitle.trim().length
	}
	async saveEdit(){
		const newTitle = this.newTitle.trim()
		if(newTitle){
			this.endEdit()
			this.movieList.title = newTitle
			if(this.movieList.id){
				await this.api.movieList.update(this.movieList)
			}else{
				// this.movieList.userID = 1
				Object.assign(this.movieList, await this.api.movieList.create(this.movieList))
			}
		}
	}
	endEdit(){
		this.isEditing = false
	}
	
	
	drop(event: CdkDragDrop<MovieListEntry[]>){
		const item = new MovieListEntry(event.previousContainer.data[event.previousIndex])
		if(event.previousContainer === event.container){
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
		}else{
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
			this.transferMovieEntry(item)
		}
	}
	
	async transferMovieEntry(movieListEntry: MovieListEntry){
		if(movieListEntry.movieListID){
			// Already came from a movie list
			movieListEntry.movieListID = this.movieList.id
			await this.api.movieListEntry.update(movieListEntry)
			console.log(`Transferred movie "${movieListEntry.movie.title}" to list ${this.movieList.title}`, movieListEntry)
		}else{
			// Came from search
			movieListEntry.movieListID = this.movieList.id
			// Check if movie already exists in database
			let movie = await this.api.movie.get(movieListEntry.movie)
			if(!movie){
				console.log(await this.api.movie.create(movieListEntry.movie))
				console.log(`Added movie "${movieListEntry.movie.title}" to database`)
				movie = await this.api.movie.get(movieListEntry.movie)
			}
			movieListEntry.movieID = movie.id
			movieListEntry.movie = movie
			await this.api.movieListEntry.create(movieListEntry)
			console.log(`Added movie "${movieListEntry.movie.title}" to list ${this.movieList.title}`, movieListEntry)
		}
	}
}