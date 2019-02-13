import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { MovieListsComponent } from './movie-lists.component'
import { MovieListComponent } from './movie-list.component'
import { MovieSearchComponent } from './movie-search.component'
import { MovieListEntryComponent } from './movie-list-entry.component'
import { MovieComponent } from './movie.component'
import { MovieWatchComponent } from './movie-watch.component'
import { UserComponent } from './user.component'
import { UsersComponent } from './users.component'

import { TmdbImagePipe } from './tmdb-image.pipe'

@NgModule({
	declarations: [
		AppComponent,
		MovieListsComponent,
		MovieListComponent,
		MovieSearchComponent,
		MovieListEntryComponent,
		MovieComponent,
		MovieWatchComponent,
		UserComponent,
		UsersComponent,
		TmdbImagePipe
	],
	imports: [
		BrowserModule,
		DragDropModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }