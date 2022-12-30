import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/shared/interfaces/UserLogin';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

   // To Emit and Catch Events of Users
   private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

   // Create an observable for User to Subscribe and Expose it Outside when Required
   public userObservable: Observable<User>;

  // to Show the Success/Failed Login Message
  userLoginError: string = '';

  // To Return the User where user Was before Login
  returnUrl = '';

  // To Store the Reactive FormGroup
  loginForm!: FormGroup;

  // For the Validation Process
  isSubmitted = false;

  // inject FormBuilder to Create Form
  constructor( private formBuilder: FormBuilder,
              //  Inject userService to use the login Function
              private userService: UserService,
              // Inject ActivatedRoute to get the State of User From params and Return User
              private activatedRoute: ActivatedRoute, private router: Router ) {
                // store the Subject in Observable
    this.userObservable = this.userSubject.asObservable();
               }

  ngOnInit(): void {
    // Building the Login Form
    this.loginForm = this.formBuilder.group({
      // The Fields Required i.e Email formControlName/Input
      email:['', [Validators.required, Validators.email]],
      // The Password formControlName/Input
      password:['', Validators.required],
    });
    // get the State of User From Params i.e Using snapshot-- the LAtest Value
    // Store the Vale in returnUrl
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // Creating a GETTER for Login Form i.e Making a GETTER Function Makes it
  // more Easy to interact with HTML Components, From loginForm.controls.email => Now formControl.email
  // GET the FormControl /Input Fields
  get formControl() {
    return this.loginForm.controls;
  }

  // This Will Submit the Form
  onLogin() {
    this.isSubmitted = true;
    // The Cnditions of Valid and Invalid
    if(this.loginForm.invalid) return;

      // get All the Values of the Form
    const fv = this.loginForm.value;
    const user : UserLogin = {
      email: fv.email,
      password: fv.password,
      returnSecureToken: true,
    };
    this.userService.login(user).subscribe( resdata => {
      // console.log(resdata);
      this.handleAuthentication();
      this.router.navigateByUrl(this.returnUrl);
    }, errorMessage => {
      console.log(errorMessage);
      this.userLoginError = errorMessage;
    })
  }

   // To Handle Authentication
   private handleAuthentication() {
    // Create New User
    const fv = this.loginForm.value;
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
      window.location.reload();
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
