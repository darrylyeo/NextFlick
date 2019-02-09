import { Component, OnInit } from '@angular/core';

import { NextFlickAPIService } from './api.service'
import { UserComponent } from './users.component'

@Component({
	selector: 'nextflick-movielists',
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
		this.api.getUsers()
			.subscribe(users => {
				this.users = users as User[];
			})
	}

	add(name: string): void {
	    
	}

	delete(user: UserComponent): void {
	    
	}
}