import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faShoppingBasket, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { RegisterPageComponent } from '../../pages/register-page/register-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  // To Check the Type i.e seller and User
  switchMode: string = '';

  user!: User;

   // To Store the Name of the User
   userName: string = '';

  // To Store the Change in the Cart Section
  cartQuantity = 0;

  // Store the DropDown Icon
  dropDownIcon = faCaretDown;

  // To Store the Searched Term
  searchTerm = '';

  // Store Search Icon
  searchIcon = faSearch;

  // Store Basket Icon
  basketIcon = faShoppingBasket;

  // Inject two Dependencies For the Searched Input
  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    // Inject CartService to Change the header Cart Quantity
    private cartService: CartService,
    // Inject UserService to Get the Name of the User in the Header
    private userService: UserService
    ) {
      this.activatedRoute.params.subscribe( (params) => {
        if(params.searchTerm) {
          this.searchTerm = params.searchTerm;
        }
      })
    }

  ngOnInit(): void {
    // Update the cart
    this.cartService.getCartObservable().subscribe( (newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
    if(localStorage.getItem('User')) {
      let userData = localStorage.getItem('User');
      let userStoredData = userData && JSON.parse(userData);
      this.userName = userStoredData.name;
      this.switchMode = 'user';
    }
    // // Get the Name of the User in Header Section
    // this.userService.userObservable.subscribe( newUser => {
    //   this.user = newUser;
    // })
  }

  // Condition to Check if the User is Valid to Show and Hide Different Options i.e Login, Logout, details...
  // get isAuth() {
  //   return this.user.email;
  // }

   // To show the Searched Results
  search(term: string) {
    if(term) {
      this.router.navigateByUrl('/search/' + term)
    }
  }

  // This will Call the Function logout from userService
  onLogout() {
    this.userService.logout();
  }

}
