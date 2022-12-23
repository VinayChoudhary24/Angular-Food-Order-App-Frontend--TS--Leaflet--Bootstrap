import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page-title',
  templateUrl: './cart-page-title.component.html',
  styleUrls: ['./cart-page-title.component.css']
})
export class CartPageTitleComponent implements OnInit {

  // The Heading of the Cart Page
  @Input() title!: string;

  // Style for Title
  @Input() margin? = '1rem 0 1rem 0.2rem';

  @Input() fontSize? = '1.7rem';

  constructor() { }

  ngOnInit(): void {
  }

}
