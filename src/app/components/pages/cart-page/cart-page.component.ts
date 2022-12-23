import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // Store the Rupee Icon
  rupeeIcon = faRupeeSign;

  // To Store the cart model
  cart!: Cart;

  constructor( private cartService: CartService ) { }

  ngOnInit(): void {
    // get the Cart Observable and Update Cart each Time Any Change Happens
    this.cartService.getCartObservable().subscribe( (cart) => {
      this.cart = cart;
    })
  }

  // To Remove the Item From Cart
  onRemoveFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  // On Change Quatity of Any Item in Cart
  onChangeQuantity(cartItem: CartItem, quantityInString: string) {
    // Convert quantity in Strng to NUmber
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

}
