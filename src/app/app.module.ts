import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions, ConnectionBackend } from '@angular/http';

import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { ApiService } from './services/api-service/api.service';
import { AuthService } from './services/auth-service/auth.service';
import { UserProfileService } from './components/views/start/user-profile.service';
import { UserService } from './services/user-service/user.service';
import { ProductService } from './services/product-service/product.service';
import { FilterProductsPipe } from './pipes/FilterProductsPipe';

/**
* Bootstrap Modules - Start
*/
import { routing } from './routes/app.routing';
import { StartComponent } from './components/views/start/start.component';
import { ProfileCoverComponent } from './components/common/profile-cover/profile-cover.component';
import { ProfileAvatarComponent } from './components/common/profile-avatar/profile-avatar.component';
import { ProfileDetailsComponent } from './components/common/profile-details/profile-details.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { PanelModalComponent } from './components/common/panel-modal/panel-modal.component';
import { CreateProductComponent } from './components/partials/create-product/create-product.component';
import { ProductsComponent } from './components/common/products/products.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/*const appRoutes: Routes = [
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'crisis-center', component: CrisisListComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: {
      title: 'Heroes List'
    }
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];*/

let providers = {
    "google": {
      "clientId": "856923517509-v0ni54imi5ovffjf4825rspecb3qtjs6.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "316460475454817",
      "apiVersion": "v2.9"
    }
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    StartComponent,
    ProfileDetailsComponent,
    ProfileCoverComponent,
    ProfileAvatarComponent,
    LoaderComponent,
    PanelModalComponent,
    CreateProductComponent,
    ProductsComponent,
    FilterProductsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    NgbModule.forRoot()
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ProductService,
    AuthService,
    ApiService,
    UserService,
    UserProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }