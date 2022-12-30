import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { User } from '../shared/models/User';

// For Handling Firebase Errors
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Firebase user Sign up Response Data
interface FirebaseSignUpResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// The Key to Store the User in LocalStorage
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Store the Authenticated User
  // user = new Subject<User>()

  // To Emit and Catch Events of Users
  private userSubject = new BehaviorSubject<User>(new User());

  // To Emit and Catch Events of Users
  // private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

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
  // login(userLogin: UserLogin):Observable<User> {
  //   // Request Api
  //   // Pipe the TAP Method to Show a DIALOG MESSAGE BOX for Successful Login
  //   return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
  //     tap({
  //       // Successfull Login
  //       next: (user) => {
  //         // Set the User to LocalStorage After Successful Login
  //         this.setUserToLocalStorage(user);
  //         //  To Notify/update all the observables
  //         this.userSubject.next(user);
  //       },
  //       // Login Failed
  //       error: (errorResponse) => {
  //         alert("Login Failed...");
  //       }
  //     })
  //   )
  // }

  // the Login Method
  login(userLogin: UserLogin) {
    return this.http.post<FirebaseSignUpResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmQBCxcAUosBT1G29qYk9bUl957GGuRO4', userLogin)
    // Error Handling With Firebase With the Help of RxJS Operator i.e catchError
    .pipe(catchError( errorRes => {
      let errorMessage = 'An error occurred...';
      // User Network Errors
      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record for this email.'
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid.'
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator.'
          break;
      }
      return throwError(errorMessage);
    }))
  }


  // Register the New User
  register(userRegister: UserRegister) {
    // Send Http Request to Firebase
       // Firebase Endpoint
      //  We Attach the Response Data Interface
      return this.http.post<FirebaseSignUpResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmQBCxcAUosBT1G29qYk9bUl957GGuRO4', userRegister)
      // Error Handling With Firebase With the Help of RxJS Operator i.e catchError
      .pipe(catchError( errorRes => {
        let errorMessage = 'An error occurred...';
        // User Network Errors
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.'
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.'
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
            break;
        }
        return throwError(errorMessage);
      }))
  }

  // This will logout the User
  logout() {
    // set the Value of userSubject to NULL User
    this.userSubject.next(new User());
    // Remove the User from LocalStorage
    // localStorage.removeItem('User');
    // This Will Re-fresh the Page
    window.location.reload();
  }

}
