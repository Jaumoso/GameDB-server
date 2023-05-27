import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../services/loginStatus.service';
import { Subscription } from 'rxjs';

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
    private loginStatusService: LoginStatusService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
    
    this.loginSubscription = this.loginStatusService.loginChanges.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

}
