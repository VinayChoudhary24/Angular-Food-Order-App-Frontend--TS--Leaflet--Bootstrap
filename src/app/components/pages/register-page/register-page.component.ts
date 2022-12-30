import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserRegister } from 'src/app/shared/interfaces/UserRegister';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

// The Key to Store the User in LocalStorage
// const USER_KEY = 'User';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  // To Emit and Catch Events of Users
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  // Create an observable for User to Subscribe and Expose it Outside when Required
  public userObservable: Observable<User>;

  // To Show the Error Message
  userRegisterError: string = '';

  // The Register Form
  registerForm!: FormGroup;

  // For Validations
  isSubmitted = false;

  // To Return the New User from where the User Started Register
  returnUrl = '';

  // To Buildd the Form
  constructor( private formBuilder: FormBuilder, private userService: UserService,
                private activatedRoute: ActivatedRoute, private router: Router ) {
    // store the Subject in Observable
    this.userObservable = this.userSubject.asObservable();
        }

  ngOnInit(): void {
    // Create the Register Form
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required, Validators.minLength(5)],
    },{
      // to Check the Password and confirmPassword is the Same
      // Create a Custom Validator inside shared/validators/password_match_validator.ts
      Validators: PasswordsMatchValidator('password', 'confirmPassword')
    }
    );
    // To return to user to the page before Register
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // Create a getterfor the Registration Form
  get fc() {
    return this.registerForm.controls;
  }

  // this Will Register the New User
  onRegister() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    // get All the Values of the Form
    const fv = this.registerForm.value;
    const user : UserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address,
      returnSecureToken: true,
    };
    this.userService.register(user).subscribe( resdata => {
      // console.log(resdata);
      this.handleAuthentication();
      this.router.navigateByUrl(this.returnUrl);
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    }, errorMessage => {
      console.log(errorMessage);
      this.userRegisterError = errorMessage;
    })
  }

  // To Handle Authentication
  private handleAuthentication() {
    // Create New User
    const fv = this.registerForm.value;
    // const user = new User();
    const user: User = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      address: fv.address,
    }
    // To Store the User Details in LocalStorage
    this.setUserToLocalStorage(user);
      this.userSubject.next(user);
  }

   // To Store the User Details in LocalStorage
   private setUserToLocalStorage(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
  }


   // // To Get the User Details from LocalStorage
   private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('User');
  //   // if User is Present in LocalStorage
    if(userJson) return JSON.parse(userJson) as User;
  //   // If User is Not Present in LocalStorage
    return new User();
  }


}
