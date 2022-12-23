import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

// To Handle Multiple Requests throughout Application
var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  // Inject the Loading Service
  constructor( private loadingService: LoadingService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Test
    // alert("I am Interceptor!!!")

    // Show the Loading/Loader
    this.loadingService.showLoading();
    // Increase the requests by 1
    pendingRequests = pendingRequests  + 1;

    // Use Pipe() and Tap to Show Loading Without Changing the output
    return next.handle(request).pipe(
      tap({
        // Hide the Loading --Happy Part
        next:(event) => {
          if(event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        // Show the Loading --Unhappy Part
        // We use _ to Not Touch Anything Inside
        error:() => {
          this.handleHideLoading();
        }
      })
    )
  }

  handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0)
      this.loadingService.hideLoading();
  }
}
