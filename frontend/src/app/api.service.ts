import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
	'Content-Type': 'application/json'
})

@Injectable()
export class NextFlickAPIService {
	constructor(private http: HttpClient) { }
	
	movieList = {
		list: () =>
			this.http.get(`/api/movielist`),
		
		get: ({id, userID = ''}) =>
			this.http.get(`/api/movielist/${id}?user=${userID}`),
			
		add: ({title, userID}) =>
			this.http.post(`/api/movielist`, {title, userID}, {headers}),
		
		update: ({id, title, userID}) =>
			this.http.put(`/api/movielist/${id}`, {title, userID}, {headers}),
		
		delete: ({id}) =>
			this.http.delete(`/api/movielist/${id}`, {headers}),
	}
	
	movieListEntry = {
		get: ({id}) =>
			this.http.get(`/api/movielistentry/${id}`),
			
		add: ({movieListID, movieID}) =>
			this.http.post(`/api/movielistentry`, {movieListID, movieID}, {headers}),
		
		delete: ({id}) =>
			this.http.delete(`/api/movielistentry/${id}`, {headers}),
	}
	
	movieWatch = {
		get: ({id}) =>
			this.http.get(`/api/moviewatch/${id}`),
			
		add: ({userID, movieID, rating}) =>
			this.http.post(`/api/moviewatch`, {userID, movieID, rating}, {headers}),
		
		update: ({id, rating}) =>
			this.http.put(`/api/moviewatch/${id}`, {rating}, {headers}),
		
		delete: ({id}) =>
			this.http.delete(`/api/moviewatch/${id}`, {headers}),
	}
	
	movie = {
		get: ({id}) =>
			this.http.get(`/api/movie/${id}`),
		
		add: ({tmdbID}) =>
			this.http.post(`/api/movie`, {tmdbID}, {headers})
	}
	
	user = {
		list: () =>
			this.http.get(`/api/user`),
		
		get: ({id, userID}) =>
			this.http.get(`/api/user/{id}`),
			
		add: ({name}) =>
			this.http.post(`/api/user`, {name}, {headers}),
		
		update: ({id, name}) =>
			this.http.put(`/api/user/${id}`, {name}, {headers}),
		
		delete: ({id}) =>
			this.http.delete(`/api/user/${id}`, {headers}),
	}
}