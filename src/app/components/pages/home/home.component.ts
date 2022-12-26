import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { faHeart, faClock, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // To Store the Tags
  tags?: Tag[];

  // To Store the Carousel Images
  carouselImages: Food[] = [];

  // Store the Rupees Icon
  rupeeIcon = faRupeeSign;

  // Store the cookTimeIcon
  cookTimeIcon = faClock;

  // Store the Favorite Icon
  favoriteIcon = faHeart;

  // To Store the sampleFoods, Food[] from data.ts
  foods:Food[] = [];

  // Inject the food.service to get the food data i.e getFoodData
  constructor( private foodService: FoodService,
    // Inject Router to Naviagte to the Searched Item
    private activatedRoute: ActivatedRoute ) {
    }

  ngOnInit()  {
          // To Get the Images from Food[]
          this.carouselImages = this.foodService.getCarouselImages();

    // For Tags
          //Frontend-- To get the Food Tags
          this.tags = this.foodService.getAllTags();

      // Listen to the Route Params to Show the Searched Item From the Search BAR
      this.activatedRoute.params.subscribe( (params) => {
        // This will Show the Searched Results in HomeComponent
        if(params.searchTerm) {
          // Calling the Searched Item Function from foodService
          this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
        }else if(params.tag) {
          this.foods = this.foodService.getAllFoodByTag(params.tag);
        }else {
          // When there is No Searched Item i.e Initial Stage
          // Call the getFoodData Function Here From foodService
          this.foods = this.foodService.getFoodData();
          }
        })
      }
    }




