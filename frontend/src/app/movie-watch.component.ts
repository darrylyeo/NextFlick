import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './model'

@Component({
	selector: 'nextflick-moviewatch',
	templateUrl: './movie-watch.component.html'
})
export class MovieWatchComponent {
	@Input() movieWatch: MovieWatch
}