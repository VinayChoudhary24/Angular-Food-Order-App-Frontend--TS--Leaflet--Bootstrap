import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {

  // Store the OrderModel From Server
  order!: Order;

  // Inject ActivatedRoutes to Get the orderId
  constructor( private activatedRoute: ActivatedRoute, private orderService: OrderService ) { }

  ngOnInit(): void {
    // Store and get the Params
    const params = this.activatedRoute.snapshot.params;
    // When orderId is Not Present
    if(!params.orderId) return;

    // When orderId is Present
    this.orderService.trackOrderById(params.orderId).subscribe( order => {
      this.order = order;
    })
  }

}
