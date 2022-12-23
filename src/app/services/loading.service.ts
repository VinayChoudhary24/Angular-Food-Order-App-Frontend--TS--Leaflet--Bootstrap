import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // For the Loading State
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  // To Show the Loading
  showLoading() {
    this.isLoadingSubject.next(true);
  }

  // To Hide the loading
  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  // Getter Function to get isLoadingSubject
  get isLoadingGetter() {
    return this.isLoadingSubject.asObservable();
  }

}
