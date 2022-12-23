// The Model of the Food Data
// ! -This Means Required
// ? -This Means Optional
export class Food {
  id!: string;
  name!: string;
  price!: number;
  tags?: string[];
  favorite!: boolean;
  stars!: number;
  imageUrl!: string;
  origins!: string[];
  cookTime!: string;
  description!: string;
}

  // constructor( id: string, name: string, price: number, tags: string[], favorite: boolean, stars: number,
  //               imageUrl: string, origins: string[], cookTime: string ) {

  //                 this.id = id;
  //                 this.name = name;
  //                 this.price = price;
  //                 this.tags = tags;
  //                 this.favorite = favorite;
  //                 this.stars = stars;
  //                 this.imageUrl = imageUrl;
  //                 this.origins = origins;
  //                 this.cookTime = cookTime;
  //               }


