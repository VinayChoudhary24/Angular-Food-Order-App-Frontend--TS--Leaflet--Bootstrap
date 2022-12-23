import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // This method will get the Current Location of the User
  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable( (observer) => {
      // Check if the Browser Supports Navigation/GeoLocation
      if(!navigator.geolocation) return;
      
      // When Browser Supports GeoLocation/Navigation
      return navigator.geolocation.getCurrentPosition(
        // SuccessFul Case i.e we Get the Position
        (pos) => {
          observer.next({
            // Set the Lat and Lng
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        // Failed i.e Error Occured
        (error) => {
          observer.error(error);
        }
      ) 
    })
  }

}
