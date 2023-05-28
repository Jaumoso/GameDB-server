import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../services/loginStatus.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isProfileDropdownOpen: boolean = false;
  loggedIn: boolean = false;
  loginSubscription: Subscription | undefined;

  constructor(
    private loginStatusService: LoginStatusService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('GameDB_token')){
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
    
    this.loginSubscription = this.loginStatusService.loginChanges.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  logOut(){
    if(
      this.router.url != '/home' && 
      this.router.url != '/games'){

      this.router.navigateByUrl('/home');
    }
    this.authService.closeSession();
    this.loggedIn = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  hideProfileDropdown() {
    this.isProfileDropdownOpen = false;
  }

}
