import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from '../components/views/start/start.component';
import { PageNotFoundComponent } from '../components/views/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: StartComponent },
    { path: 'start', component: StartComponent },
  	{ path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);