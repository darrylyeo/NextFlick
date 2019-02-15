import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Movie, TMDBMovie, MovieList, MovieListEntry, MovieWatch, User } from './model'

const headers = new HttpHeaders({
	'Content-Type': 'application/json'
})

@Injectable()
export class NextFlickAPIService {
	constructor(private http: HttpClient) { }
	
	/*get(url): any {
		return this.http.get(url).toPromise().then(r => console.log('GET', url, r) || r)
	}
	post(url, body): any {
		return this.http.post(url, body, {headers}).toPromise()
	}
	put(url, body): any {
		return this.http.put(url, body, {headers}).toPromise()
	}
	delete(url): any {
		return this.http.delete(url, {headers}).toPromise()
	}*/
	
	movieList = {
		list: () =>
			this.http.get<MovieList[]>(`/api/movielist`).toPromise(),
		// list: async () =>
		// 	(await this.get(`/api/movielist`)) as MovieList[],
		
		get: ({id, userID = ''}) =>
			this.http.get<MovieList>(`/api/movielist/${id}?user=${userID}`).toPromise(),
			
		create: ({title, userID}) =>
			this.http.post<MovieList>(`/api/movielist`, {title, userID}, {headers}).toPromise(),
		
		update: ({id, title, userID}) =>
			this.http.put<MovieList>(`/api/movielist/${id}`, {title, userID}, {headers}).toPromise(),
		
		delete: ({id}) =>
			this.http.delete(`/api/movielist/${id}`, {headers}).toPromise(),
	}
	
	movieListEntry = {
		list: ({movieListID}) =>
			this.http.get<MovieListEntry[]>(`/api/movielistentry?movieListID=${movieListID}`).toPromise(),
		
		get: ({id}) =>
			this.http.get<MovieListEntry>(`/api/movielistentry/${id}`).toPromise(),
			
		create: ({movieListID, movieID}) =>
			this.http.post<MovieListEntry>(`/api/movielistentry`, {movieListID, movieID}, {headers}).toPromise(),
			
		update: ({id, movieListID}) =>
			this.http.put(`/api/movielistentry/${id}`, {movieListID}, {headers}).toPromise(),
		
		delete: ({id}) =>
			this.http.delete(`/api/movielistentry/${id}`, {headers}).toPromise(),
	}
	
	movieWatch = {
		list: ({userID, movieID}: {userID?: number, movieID?: number} = {}) =>
			userID && movieID ? this.movieWatch.get({userID, movieID}) :
			movieID ? this.http.get<MovieWatch[]>(`/api/moviewatch?movieID=${movieID}`).toPromise() :
			userID ? this.http.get<MovieWatch[]>(`/api/moviewatch?userID=${userID}`).toPromise() :
			this.http.get<MovieWatch[]>(`/api/moviewatch`).toPromise(),
		
		get: ({userID, movieID}) =>
			this.http.get<MovieWatch>(`/api/moviewatch?movieID=${movieID}&userID=${userID}`).toPromise(),
		
		getFromID: ({id}) =>
			this.http.get<MovieWatch>(`/api/moviewatch/${id}`).toPromise(),
		
		// getByTMDBID: ({id, userID}) =>
		// 	? this.http.get<MovieWatch[]>(`/api/moviewatch?user=${userID}`).toPromise()
		// 	this.http.get<MovieWatch>(`/api/moviewatch/${id}`).toPromise(),
		
		create: ({userID, movieID, rating}: {userID: number, movieID: number, rating?: number}) =>
			this.http.post<MovieWatch>(`/api/moviewatch`, rating === undefined ? {userID, movieID} : {userID, movieID, rating}, {headers}).toPromise(),
		
		update: ({id, rating}: {id: number, rating?: number}) =>
			this.http.put(`/api/moviewatch/${id}`, {rating}, {headers}).toPromise(),
		
		delete: ({id}) =>
			this.http.delete(`/api/moviewatch/${id}`, {headers}).toPromise(),
	}
	
	movie = {
		get: ({id, tmdbID}: {id?: number, tmdbID?: number}) =>
			this.http.get<Movie>(id ? `/api/movie/${id}` : `/api/movie?tmdbID=${tmdbID}`).toPromise().then(async movie => {
				if(!movie) return undefined
				
				let {tmdbData, tmdbID} = movie
				if(tmdbData){
					if(typeof tmdbData === 'string') tmdbData = JSON.parse(tmdbData)
				}else if(tmdbID){
					tmdbData = await this.http.get<TMDBMovie>(`/api/moviedb/${tmdbID}`).toPromise()
				}
				movie.tmdbData = tmdbData
				return movie
			}),
		
		create: ({tmdbID}) =>
			this.http.post(`/api/movie`, {tmdbID}, {headers}).toPromise()
	}
	
	user = {
		list: () =>
			this.http.get<User[]>(`/api/user`).toPromise(),
		
		get: ({id}) =>
			this.http.get<User>(`/api/user/${id}`).toPromise(),
			
		create: ({name}) =>
			this.http.post(`/api/user`, {name}, {headers}).toPromise(),
		
		update: ({id, name}) =>
			this.http.put<User>(`/api/user/${id}`, {name}, {headers}).toPromise(),
		
		delete: ({id}) =>
			this.http.delete(`/api/user/${id}`, {headers}).toPromise(),
	}
	
	movieDB = {
		search: (searchQuery: string) =>
			this.http.get(`/api/moviedb?search=${searchQuery}`).toPromise(),
		
		get: ({tmdbID}) =>
			this.http.get<TMDBMovie>(`/api/moviedb/${tmdbID}`).toPromise(),
	}
}