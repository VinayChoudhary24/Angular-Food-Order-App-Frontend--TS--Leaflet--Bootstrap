import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sampleFoods, sampleTags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // Inject HttpClient to Request Backend API's
  constructor( private http: HttpClient ) { }

  // Frontend-- To get the Food Data From data.ts File
  getFoodData():Food[] {
    return sampleFoods.slice();
  }

  //Frontend To get the Food items by Searching in the Search Bar
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getFoodData().filter( (food) =>
      // Use .toLowerCase() to Make Sure Every Searched Item in the Search Bar by User is of Same CASE i.e PIZZA is same as pizza
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) )
  }

  // To get the Carousel Images from Food[]
  getCarouselImages() {
    return this.getFoodData();
  }

  //Frontend To get all the Tags i.e Tag[]
  getAllTags():Tag[] {
    return sampleTags;
  }


  //Frontend-- to get the Food Items by Tags
  getAllFoodByTag(tag: string):Food[] {
    return this.getFoodData().filter( (food) =>
      food.tags?.includes(tag)
    )
  }

  // To get the Single Food from home Page by ID
  getFoodById(foodId: string): Food {
    return this.getFoodData().find( (food) =>
      food.id == foodId) ?? new Food();
  }
}
