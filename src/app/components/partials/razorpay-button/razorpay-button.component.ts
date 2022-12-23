import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Adding the RazorPay SDk to Component
// Window.razorPay
// declare var RazorPay: any;

// to get Razorpay instance
// Key ID : rzp_test_kSgN7hKTuBkAxI
// Key Secret : 3p6xCXqabG0exsGMsq0J9jwO

@Component({
  selector: 'razorpay-button',
  templateUrl: './razorpay-button.component.html',
  styleUrls: ['./razorpay-button.component.css']
})
export class RazorpayButtonComponent implements OnInit {

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    alert("UPI Payments will be Updated Soon...")
  }

}
