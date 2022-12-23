import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

import { faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  // RuppeIcon
  rupeeIcon = faRupeeSign;

  // Store the Favorite Icon
  favoriteIcon = faHeart;

  // To Store the FoodData[]
  // It will Not be A Array[], because it is for the Single Food
  foodItem!: Food;

  // Inject the foodService call the Function getFoodById
  constructor( private foodService: FoodService,
                private activatedRoute: ActivatedRoute,
                // Inject CartService to Call the Functions
                private cartService: CartService,
                // Inject Router to Re-direct the User to the Cart Page
                private router: Router ) {}

  ngOnInit() {
  //  Calling and Storing the Function in the property
  this.activatedRoute.params.subscribe( (params) => {
    if(params.id) {
    this.foodItem = this.foodService.getFoodById(params.id);
    }
  })
  }

  //This will Add item to the Cart
  onAddToCart() {
    this.cartService.addToCart(this.foodItem);
    this.router.navigate(['/cart-page']);
  }
}
