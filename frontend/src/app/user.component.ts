import { Component, OnInit } from '@angular/core';
import { User } from './model'

@Component({
	selector: 'nextflick-user',
	templateUrl: './user.component.html'
})
export class UserComponent {
	user: User
}