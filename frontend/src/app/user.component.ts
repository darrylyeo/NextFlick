import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'nextflick-user',
	templateUrl: './user.component.html'
})
export class UserComponent {
	id: int;
	name: string;
	createdTimestamp: Date;
	modifiedTimestamp: Date;
}