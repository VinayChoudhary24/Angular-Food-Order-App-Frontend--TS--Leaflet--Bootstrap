import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserRegister } from 'src/app/shared/interfaces/UserRegister';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  // Store the User
  @Input() user!: User;

  // The Register Form
  registerForm!: FormGroup;

  // For Validations
  isSubmitted = false;

  // To Return the New User from where the User Started Register
  returnUrl = '';

  // To Buildd the Form
  constructor( private formBuilder: FormBuilder, private userService: UserService,
                private activatedRoute: ActivatedRoute, private router: Router ) { }

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
    };
    this.userService.register(user).subscribe( _ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
