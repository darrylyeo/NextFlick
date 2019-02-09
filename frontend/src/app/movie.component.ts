import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'nextflick-movie',
	templateUrl: './movie.component.html'
})
export class MovieComponent {
	id: int;
	title: string;
	// tmdbData: object;
	createdTimestamp: Date;
	modifiedTimestamp: Date;
}