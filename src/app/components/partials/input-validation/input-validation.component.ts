import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// Define the Error Messages
const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})

// Add OnChanges so that the Validators Apply Whenever there is a Change
export class InputValidationComponent implements OnInit, OnChanges {

  // Getting the Control of Validation
  @Input() control!: AbstractControl;

  // When to Show the Error Messages
  @Input() showErrorsWhen: boolean = true;

  // Store the Messages
  errorMessages: string[] = [];

  constructor() { }

  // Call checkValidation Function on Any Change
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  // Call checkValidation when the Value and Status Changes
  ngOnInit(): void {
    this.control.statusChanges.subscribe( () => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe( () => {
      this.checkValidation();
    })
  }

  // Function to Access the FormControl/Input Fileds Properties i.e errors
  checkValidation() {
    // Access and Stroe the errors property of Fileds
    const errors = this.control.errors;
    // Check if the errors property is Empty or Not
    if(!errors) {
      this.errorMessages = [];
      return;
    }
    // when errors are not Empty
    const errorKeys = Object.keys(errors);
    // set the Values of Keys i.e email, required, password to Validators_messages
    this.errorMessages = errorKeys.map( key => VALIDATORS_MESSAGES[key]);
  }

}
