import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListsComponent } from './movielists.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: MovieListsComponent },
    // { path: 'movieList/:id', component: HeroDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}