import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLng, latLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  // Set the User Address According to the LatLng i.e CurrentLocation
  @Input() order!: Order;

  // Make the map component readonly
  @Input() readonly = false;

  // To Show the Marker on the Map
  private readonly MARKER_ZOOM_LEVEL = 16;
  // To Show the Marker Icon Perfectly for the User
  // Create a Icon From Leaflet
  private readonly MARKER_ICON = icon({
    iconUrl:
        'http://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  })

  // To Show Default Lat and Lng
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  // Selecting the #MAP Reference i.e @viewChild
  @ViewChild('map', {static: true})
  mapRef!: ElementRef;

  // Store the Map from Leaflet
  map!: Map;

  // For the Marker icon
  currentMarker!: Marker;

  // Inject LocationService to use the Method getCurrentLocation
  constructor( private locationService: LocationService ) { }

  ngOnChanges(): void {
    if(!this.order) return;
    // Call the InitializeMap Method
    this.initializeMap();

    // Showing Map in ReadOnly Mode
    if(this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    // Making the Map read Only
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    // Disable All the Possible Action over Map
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  // This Will Initialize the Map
  initializeMap() {
    // When map is Already Initialized
    if(this.map) return;

    // When it is not Initialized YEt
    // Here map is a Leaflet Function different From Map Above
    // map() function will Create the Map
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
      // setView is Use to Set the view of the Map, 1 is the Zoom Level
    }).setView(this.DEFAULT_LATLNG, 1)
    // Show the Default View of Map
    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Moving the Map MARKER_ICON when Clicked on map
    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  // This will get the Current Location of the User
  findMyLocation() {
    // Subscribe to the locationService Method
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        // console.log(latlng);
        // set the View and Zoom Level
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    })
  }

  // Set the Marker On the Map
  setMarker(latlng: LatLngExpression) {
    // set Address of User from Method Set addressLatLng
    this.addressLatLng = latlng as LatLng;

    // check if the Marker is Already Available
    if(this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    // Marker is Not Available
    // use the marker() Function from Leaflet to Create One
      this.currentMarker = marker(latlng, {
        draggable: true,
        icon: this.MARKER_ICON
      }).addTo(this.map);

      // Get the Current Mark Location After Dragging
      this.currentMarker.on('dragend', () => {
        this.addressLatLng = this.currentMarker.getLatLng();
      })
  }

  // this Function will set the LatLng to the Order Address
  set addressLatLng(latlng: LatLng) {
    if(!latlng.lat.toFixed) return;
    // Parse the Lat and Lng Floating Point Numbers to 8 For MongoDB
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    // Set the Address  of the User according to the Current Location
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  // Getter Function to Get the location of User in the Payment Page
  get addressLatLng() {
    return this.order.addressLatLng!;
  }

}
