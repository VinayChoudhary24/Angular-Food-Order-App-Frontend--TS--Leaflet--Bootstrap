import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

// Adding the Paypal SDk to Component
// Window.paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  // Store the order to Pass
  @Input() order!: Order;

  // To Show the Paypal Button
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;

  constructor( private orderService: OrderService, private cartService: CartService, private router: Router ) { }

  ngOnInit(): void {
    const self = this;
    // Adding the Paypal Button
    // Render the PayPal button into #paypal-button-container
    paypal
      .Buttons({
        // Set up the transaction
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        // Finalize the transaction
        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                if(orderId) {
                  alert("Payment Was Successfull");
                }else {
                  alert("Payment Failed...")
                }
              },
            }
          )
        }
        // For Paypal Button to Render We Need to Assign it to HTMLElement
      }).render(this.paypalElement.nativeElement);
  }

}
