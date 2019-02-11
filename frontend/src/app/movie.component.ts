import { Component, Input, OnInit } from '@angular/core';
import { Movie } from './model'

@Component({
	selector: 'nextflick-movie',
	templateUrl: './movie.component.html'
})
export class MovieComponent {
	@Input() movie: Movie
}