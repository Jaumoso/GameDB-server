import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initTE, Dropdown } from 'tw-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { baseURL } from './shared/baseurl';
import { AuthInterceptorService } from './services/authInterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    GamesComponent,
    LoginComponent,
    LibraryComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'BaseURL', useValue: baseURL },
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true 
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  ngOnInit() {
    initTE({ Dropdown });
  }
}
