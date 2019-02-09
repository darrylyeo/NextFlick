import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movielist.component';
import { MovieListsComponent } from './movielists.component';
import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';

@NgModule({
	declarations: [
		AppComponent,
		MovieComponent,
		MovieListComponent,
		MovieListsComponent,
		UserComponent,
		UsersComponent
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