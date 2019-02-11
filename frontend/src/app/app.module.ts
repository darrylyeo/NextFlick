import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie.component';
import { MovieListEntryComponent } from './movie-list-entry.component';
import { MovieListComponent } from './movie-list.component';
import { MovieListsComponent } from './movie-lists.component';
import { MovieWatchComponent } from './movie-watch.component';
import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';

import { TmdbImagePipe } from './tmdb-image.pipe'

@NgModule({
	declarations: [
		AppComponent,
		MovieComponent,
		MovieListEntryComponent,
		MovieListComponent,
		MovieListsComponent,
		MovieWatchComponent,
		UserComponent,
		UsersComponent,
		
		TmdbImagePipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }