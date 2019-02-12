import { Component, OnInit } from '@angular/core'
import { NextFlickAPIService } from './api.service'
import { User } from './model'

@Component({
	selector: 'nextflick-users',
	templateUrl: './users.component.html',
	providers: [ NextFlickAPIService ]
})
export class UsersComponent implements OnInit {
	users: User[]
	
	constructor(private api: NextFlickAPIService) { }

	ngOnInit() {
		this.getData()
	}

	async getData() {
		this.users = await this.api.user.list()
	}

	create(name: string) {
	    
	}

	delete(user: User) {
	    
	}
}