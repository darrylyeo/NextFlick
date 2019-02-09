import { Component, OnInit } from '@angular/core';

import { NextFlickAPIService } from './api.service'

@Component({
	selector: 'nextflick-movielist',
	templateUrl: './movielist.component.html',
	providers: [ NextFlickAPIService ]
})
export class MovieListComponent {
	id: number;
	name: string;
	movies: Movie[];
}