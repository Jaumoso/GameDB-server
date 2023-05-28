import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../services/loginStatus.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isProfileDropdownOpen: boolean = false;
  loggedIn: boolean = false;
  loginSubscription: Subscription | undefined;
  username: string | undefined

  constructor(
    private loginStatusService: LoginStatusService,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('GameDB_token')){
      this.loggedIn = true;
      const decoded_token = this.jwtService.decodeToken(localStorage.getItem('GameDB_token')!);
      this.userService.getUser(decoded_token._id)
      .then((user) => {
        this.username = user.username;
      });
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
