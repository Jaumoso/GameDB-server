import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../services/loginStatus.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isProfileDropdownOpen: Boolean = false;
  loggedIn: Boolean = false;
  loginSubscription: Subscription | undefined;
  username: String | undefined
  isSmallScreen = false;
  value: String = '';
  theme: boolean = false;

  constructor(
    private loginStatusService: LoginStatusService,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {

    // Detectar si la pantalla es pequeña 768
    this.isSmallScreen = window.innerWidth < 600;

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener('resize', () => {
      this.isSmallScreen = window.innerWidth < 1200;
    });

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

    this.themeService.themeChanges.subscribe((theme) => {
      this.theme = theme;
    });
  }

  toggleDarkTheme() {
    this.themeService.setDarkTheme();
  }

  logOut(){
    if(
      this.router.url != '/home' && 
      this.router.url != '/games'){

      this.router.navigateByUrl('/home');
    }
    this.authService.closeSession();
    this.loggedIn = false;
    this.snackBar.open(
      "Session closed", 
      "OK",
      {
        verticalPosition: 'bottom',
        duration: 4000,
        panelClass: ['snackbar']
      }
      );
  }

  goToProfile() {

  }

  openLoginForm(){

  }

}
