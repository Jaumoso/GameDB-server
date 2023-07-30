import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginStatusService } from '../services/loginStatus.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  invalidCredentials: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginStatusService: LoginStatusService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {
    if(this.username.value && this.password.value) {
      this.authService.login(this.username.value, this.password.value)
      .then((token) => {
        console.log("User logged in successfully");
        this.loginStatusService.loggedIn = true;
        this.authService.setSession(token);
        this.router.navigateByUrl('/home');

        this.snackBar.open(
          "Logged In", 
          "OK",
          {
            verticalPosition: 'top',
            duration: 4000,
            panelClass: ['snackbar']
          }
          );
      }).catch(() => {
        this.snackBar.open(
          "Wrong username or password", 
          "OK",
          {
            verticalPosition: 'top',
            duration: 6000,
            panelClass: ['snackbar']
          }
          );
      });
    }
  }

  ngOnInit(): void {
    // Empty
  }

}
