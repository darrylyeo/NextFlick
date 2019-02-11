import { Component, OnInit } from '@angular/core';
import { NextFlickAPIService } from './api.service'
import { User } from './model'

@Component({
	selector: 'nextflick-movie-lists',
	templateUrl: './users.component.html',
	providers: [ NextFlickAPIService ]
})
export class UsersComponent implements OnInit {
	users: User[];
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData();
	}

	getData(): void {
		this.api.user.list()
			.subscribe(users => {
				this.users = users as User[];
			})
	}

	add(name: string): void {
	    
	}

	delete(user: User): void {
	    
	}
}