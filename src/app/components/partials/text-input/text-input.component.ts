import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  // This Component Holds Both Input-Container and Input-Validation
  // This Component Contains the Structure of Inputs
  // Input-Validation
  @Input() control!: AbstractControl;

  @Input() showErrorsWhen: boolean = true;

  // Input-Container
  @Input() label!: string;

  @Input() type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
