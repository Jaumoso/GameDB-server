import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginStatusService } from '../services/loginStatus.service';
import { Router } from '@angular/router';

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
      });
    }
  }

  ngOnInit(): void {
    // Empty
  }

}
