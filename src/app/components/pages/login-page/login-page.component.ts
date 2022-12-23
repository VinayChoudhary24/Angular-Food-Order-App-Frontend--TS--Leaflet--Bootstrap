import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // to Show the Success/Failed Login Message
  loginMessage = '';

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
              private activatedRoute: ActivatedRoute, private router: Router ) { }

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
  onSubmit() {
    this.isSubmitted = true;
    // The Cnditions of Valid and Invalid
    if(this.loginForm.invalid)
        this.loginMessage = "Login Failed...";
    else {
    // If thelogin Form is valid
    // Show the Toastr Message For Succcess and Failed
    this.userService.login({
      email: this.formControl.email.value,
      password: this.formControl.password.value
    })
    }
  }

}
