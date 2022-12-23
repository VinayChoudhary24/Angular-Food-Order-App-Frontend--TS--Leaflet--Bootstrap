import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { User } from '../shared/models/User';

// The Key to Store the User in LocalStorage
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // To Emit and Catch Events of Users
  // private userSubject = new BehaviorSubject<User>(new User());

  // To Emit and Catch Events of Users
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  // Create an observable for User to Subscribe and Expose it Outside when Required
  public userObservable: Observable<User>;

  constructor( private http: HttpClient,
              //  Inject Toastr Message for Success and Login
                // private toastrService: ToastrService
                ) {
    // store the Subject in Observable
    this.userObservable = this.userSubject.asObservable();
  }

  // To get the User to Checkout Page
  public get currentUser():User {
    return this.userSubject.value;
  }

  // the Login Method
  login(userLogin: UserLogin):Observable<User> {
    // Request Api
    // Pipe the TAP Method to Show a DIALOG MESSAGE BOX for Successful Login
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        // Successfull Login
        next: (user) => {
          // Set the User to LocalStorage After Successful Login
          this.setUserToLocalStorage(user);
          //  To Notify/update all the observables
          this.userSubject.next(user);
        },
        // Login Failed
        error: (errorResponse) => {
          alert("Login Failed...");
        }
      })
    )
  }

  // Register the New User
  register(userRegister: UserRegister): Observable<User> {
    // Pipe the TAP Method to Show a DIALOG MESSAGE BOX for Successful Login
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        // Successful Register
        next: (user) => {
           // Set the User to LocalStorage After Successful Login
           //  To Notify/update all the observables
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        // Register Failed
        error: (errorResponse) => {
          alert("Registration Failed...")
        }
      })
    )
  }

  // This will logout the User
  logout() {
    // set the Value of userSubject to NULL User
    this.userSubject.next(new User());
    // Remove the User from LocalStorage
    localStorage.removeItem(USER_KEY);
    // This Will Re-fresh the Page
    window.location.reload();
  }

  // To Store the User Details in LocalStorage
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // To Get the User Details from LocalStorage
  private getUserFromLocalStorage():User {
    const userJson = localStorage.getItem(USER_KEY);
    // if User is Present in LocalStorage
    if(userJson) return JSON.parse(userJson) as User;
    // If User is Not Present in LocalStorage
    return new User();
  }

}
