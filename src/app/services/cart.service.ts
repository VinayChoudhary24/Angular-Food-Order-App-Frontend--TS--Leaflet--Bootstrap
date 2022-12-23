import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, subscribeOn } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  // To add the Items to the Basket
  addToCart(food: Food) {
    // Check for the item In Cart
    let cartItem = this.cart.items.find( (item) => 
      item.food.id === food.id )
      // If the Item is Already Present we will return Nothing
    if(cartItem) {
      return;
    }
    // This will add the item if not present
    this.cart.items.push(new CartItem(food));
    // Update the Cart to LocalStorage
    this.setCartToLocalStorage();
  }

  // Remove the items from the Basket
  removeFromCart(foodId: string) {
    this.cart.items = this.cart.items.filter( (item) => 
      item.food.id != foodId ); 
     // Update the Cart to LocalStorage
    this.setCartToLocalStorage();  
  }

  // To Change the Quatity of the Cart
  changeQuantity(foodId: string, quantity: number) {
    // Finding the item in Cart
    let cartItem = this.cart.items.find( (item) => 
      item.food.id === foodId )
      // if item is not Available to change quantity return nothing
    if(!cartItem) {
      return
    };
    // if item is available we change the Quantity
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    // cartItem.tax = this.cart.totalPrice/10;
     // Update the Cart to LocalStorage
    this.setCartToLocalStorage();
  }

  // To Clear the Cart
  clearCart() {
    this.cart = new Cart();
     // Update the Cart to LocalStorage
    this.setCartToLocalStorage();
  }

  // to Inform About the State of the Cart to Other Components
  getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // For the Checkout Page
  getCart():Cart {
    return this.cartSubject.value;
  }

  // Setting Cart Data to LoaclStorage
  private setCartToLocalStorage():void {
    // Set the Value of TOTALPRICE
    this.cart.totalPrice = this.cart.items.reduce( (prevSum, currentItem) =>  
      prevSum + currentItem.price, 0);
      
    // Set the Value totalTax
    // this.cart.totalTax = this.cart.items.reduce( (prevSum, currentItem) => 
    //   prevSum + currentItem.tax, 0) 

      // Set the value of TOTALCOUNT
    this.cart.totalCount = this.cart.items.reduce( (prevSum, currentItem) => 
      prevSum + currentItem.quantity, 0);

    // Convert the Cart From Object to JSON STRING
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    // Notifying the observable
    this.cartSubject.next(this.cart); 
  }

  // Getting Cart data from LocalStorage
  private getCartFromLocalStorage():Cart {
    const cartJson = localStorage.getItem('Cart');
    // Convert Json String to Object
    return cartJson? JSON.parse(cartJson) : new Cart(); 
  }
}
