import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) {}

  // Store the Order Model
  create(order: Order) {
    // return this.http.post<Order>(ORDER_CREATE_URL, order);
    return this.router.navigate(['/payment']);
  }

  // Method to Get the Order Details for Current User from Checkout Page
  // getNewOrderForCurrentUser(): Observable<Order>{
  //   return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  // }

   // Method to Get the Payment Details for Current User from Payment Page
  //  For PAYPAL payment we need to Pass the Order Model
   pay(order: Order): Observable<String>{
    return this.http.post<String>(ORDER_PAY_URL, order);
  }

  // Method to Get the Order Details for Current User from Payment Page
  //  For Getting the OrderId
  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

}
