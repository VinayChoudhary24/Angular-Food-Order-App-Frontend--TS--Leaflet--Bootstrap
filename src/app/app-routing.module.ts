import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { RazorpayButtonComponent } from './components/partials/razorpay-button/razorpay-button.component';

const routes: Routes = [

  // To Load the Home Component
  { path: '', component: HomeComponent },

  // To Load the Searched Item in the Search Bar
  { path: 'search/:searchTerm', component: HomeComponent },

  // To Load the Food Items By Tags
  { path: 'tag/:tag', component: HomeComponent },

  // To load the Specific Page when Click on any Food Item
  { path: 'food/:id', component: FoodPageComponent },

  // To Load the Cart Page
  { path: 'cart-page', component: CartPageComponent },

  // To Load the Login Page
  { path: 'login', component: LoginPageComponent },

  // To Load the Register Page
  { path: 'register', component: RegisterPageComponent },

  // To Load the Checkout Page
  { path: 'checkout', component: CheckoutPageComponent },
  // canActivate: [AuthGuard]

  // To Load the Payment Page
  { path: 'payment', component: PaymentPageComponent, },
  // canActivate: [AuthGuard]

  // To Load the Order Tracking Page
  { path: 'track/:orderId', component: OrderTrackPageComponent, },
  // /canActivate: [AuthGuard]

  // To Load the Profile Section of the User
  { path: 'profile', component: ProfilePageComponent, },
  // canActivate: [AuthGuard]

  // To Load the RazorPay Payment Section For the User
  { path: 'razorpay', component: RazorpayButtonComponent, },
  // canActivate: [AuthGuard] 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
