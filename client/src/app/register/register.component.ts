import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  user: User | undefined;
  invalidUser: boolean = false;

  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmation = new FormControl('', [Validators.required, this.passwordsMatchValidator.bind(this)]);

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirmation')?.value;
  
    if (password !== confirmPassword) {
      return { 'passwordsNotMatch': true };
    }
  
    return null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { 
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    },
    {
      validator: this.checkPasswords
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('passwordConfirmation')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  onSubmit() {
    if(this.username.value && this.password.value && this.passwordConfirmation.value) {
      this.userService.checkExistingUser(this.username.value)
      .then((existingUser) => {
        
        if(existingUser){
          this.invalidUser = true;
          setTimeout(() => {
            this.invalidUser = false;
          }, 5000);
        }
        else {
          let user = new User;
          user.username = this.username.value!;
          user.password = this.password.value!;
          user.joined = new Date();
          user.lastSeen = new Date();
          this.userService.createUser(user)
          .then(() => {
            this.router.navigateByUrl('/login');
          });
        }

      });
    }
  }

  ngOnInit(): void {
    // Empty
  }

}
