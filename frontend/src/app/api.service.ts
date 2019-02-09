import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NextFlickAPIService {
	constructor(private http: HttpClient) { }
	
	getMovieLists(){
		return this.http.get('/api/movielist');
	}
}