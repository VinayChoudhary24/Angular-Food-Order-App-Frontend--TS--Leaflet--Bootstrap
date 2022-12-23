import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  // Store the Order Model
  order: Order = new Order();

  // The Checkout Form
  checkoutForm!: FormGroup;

  constructor( private cartService: CartService, private formBuilder: FormBuilder,
                private userService:UserService, private orderService: OrderService, private router: Router ) {
                      // Get the Cart from CartService and Set it to Order
                      // here, We dont want Observable Because we Only want the Latest Values Directly
                        const cart = this.cartService.getCart();
                        this.order.items = cart.items;
                        this.order.totalPrice = cart.totalPrice;
                      }

  ngOnInit(): void {
    // Creating the Form
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }

  // the Getter for Checkout form
  get fc() {
    return this.checkoutForm.controls;
  }

  // CreateOrder Function
  createOrder() {
      if(this.checkoutForm.invalid) {
      // show Warning Message
      alert("Please fill the inputs...");
      return;
      }
      // Validating the User Address before Connecting to the oder.service
      // the User has NOT Selected the Address
      if(!this.order.addressLatLng) {
        alert("Please, Select Your Location on the map");
        return;
      }
    //  Checkout Form is Valid
    // the User has Selected Address
    // set the Value To Send to Server
      this.order.name = this.fc.name.value;
      this.order.address = this.fc.address.value;
      // console.log(this.order);
      // call the OrderService Create() Function and Subscribe
      this.orderService.create(this.order);
      // .subscribe({
      //   next:() => {
      //     // Happy Part-- Re-directs the User to the Payments Page
      //     this.router.navigateByUrl('/payment');
      //   },
      //   // Error Part
      //   error:(errorResponse) => {
      //     alert(errorResponse.error)
      //   }
      // })
  }

}
