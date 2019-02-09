import { Component, OnInit } from '@angular/core';

import { NextFlickAPIService } from './api.service'
import { MovieListComponent } from './movielist.component'

@Component({
	selector: 'nextflick-movielists',
	templateUrl: './movielists.component.html',
	providers: [ NextFlickAPIService ]
})
export class MovieListsComponent implements OnInit {
	movieLists: MovieListComponent[];
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData();
	}

	getData(): void {
		this.api.getMovieLists()
			.subscribe(movieLists => {
				this.movieLists = movieLists as MovieList[];
			})
	}

	add(name: string): void {
		// name = name.trim();
		// if (!name) { return; }
		// this.heroService.addHero({ name } as Hero)
		// 	.subscribe(hero => {
		// 		this.heroes.push(hero);
		// 	});
	}

	delete(movieList: MovieListComponent): void {
		// this.heroes = this.heroes.filter(h => h !== hero);
		// this.heroService.deleteHero(hero).subscribe();
	}
}