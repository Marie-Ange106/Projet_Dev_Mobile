import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ScanService } from '../scan.service';

import { OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { InfiniteScrollCustomEvent, ToastController, Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';


import { Marker } from '@capacitor/google-maps/dist/typings/definitions';

const apiKey = 'AIzaSyB6xaISf7UKYbFgJUfxCH8MRbMaJw-mxvY';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loaded = true;
  
  //map: GoogleMa: Trajet = new Trajet();p;
  
 
  lattitudePast = 0;
  longitudePast = 0;
  lattitudePastBus = 0;
  longitudePastBus = 0;

  newMap!: GoogleMap;
 
  
  map!: google.maps.Map;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  id = 0;


  
  
  address!: string;
  lattitude = 0;
  longitude = 0;
 
  

  googleMaps: any;
  center = { lat: 28.649944693035188, lng: 77.23961776224988 };
  

  me:any
  constructor(
   
    private renderer: Renderer2,
  
  ) {
    setInterval((data:any) => {
      this.printCurrentPosition();
      //this.me=new this.googleMaps.LatLng(this.lattitude, this.longitude);
    }, 1000);
  }

  ngOnInit() {
    

  }
 
  

  onIonInfinite(ev:any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  async ionViewDidEnter() {
    //const googleMaps: any = await this.loadGoogleMaps();
    //console.log(googleMaps);

    //**this.createMap();
    this.printCurrentPosition().then(data => {
      //this.loadMap();
      this.initMap();
    });
  }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        apiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }

  async loadMap() {
    try {
      const mapRef = document.getElementById('map');
      const googleMaps: any = await this.loadGoogleMaps();
      const directionsService = new googleMaps.DirectionsService();
      const directionsRenderer = new googleMaps.DirectionsRenderer();
      this.googleMaps = googleMaps;
      const location = new googleMaps.LatLng(this.lattitude, this.longitude);
      this.map = new googleMaps.Map(document.getElementById('map') as HTMLElement, {
        center: location,
        zoom: 12,
      });
      directionsRenderer.set(this.map);
      //this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      this.renderer.addClass(document.getElementById('map') as HTMLElement, 'visible');
      this.addMarker(location,this.map);
      this.onMapClick();
    } catch(e) {
      console.log(e);
    }
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(this.map, 'click', (mapsMouseEvent:any) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      //this.addMarker(mapsMouseEvent.latLng);
    });
  }



  // addMarker(location:any) {
  //   const googleMaps: any = this.googleMaps;
  //   const icon = {
  //     url: 'assets/icons/location-pin.png',
  //     scaledSize: new google.maps.Size(50, 50),
  //   };
  //   const marker = new google.maps.Marker({
  //     position: location,
  //     map: this.map,
  //     icon,
  //     // draggable: true,
  //     animation: google.maps.Animation.DROP
  //   });
  //   this.markers.push(marker);
  //   // this.presentActionSheet();
  //   this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
  //     console.log('markerclick', marker);
  //     this.checkAndRemoveMarker(marker);
  //     console.log('markers: ', this.markers);
  //   });
  // }

  checkAndRemoveMarker(marker:any) {
    const index = this.markers.findIndex(x => x.position.lat() === marker.position.lat() && x.position.lng() === marker.position.lng());
    console.log('is marker already: ', index);
    if(index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }

 

  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if(this.mapClickListener) {this.googleMaps.event.removeListener(this.mapClickListener);}
    if(this.markerClickListener) {this.googleMaps.event.removeListener(this.markerClickListener);}
  }

  // printCurrentPosition = async () => {
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   //console.log('Current :', coordinates);
  //   const googleMaps: any = await this.loadGoogleMaps();
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRenderer = new google.maps.DirectionsRenderer();
  //     this.googleMaps = googleMaps;
    
  //   this.lattitude = coordinates.coords.latitude;
  //   this.longitude = coordinates.coords.longitude;
  //   this.me = new google.maps.LatLng(this.lattitude, this.longitude);
  //   this.addMarker(this.me);
  //   console.log('Current position:', this.lattitude, this.longitude);
  // }
  printCurrentPosition = async () => {

    const coordinates = await Geolocation.getCurrentPosition();
    this.lattitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    //Si les coordonnées ont changé on actualise aussi la map
    if(this.map !== null && this.map !== undefined) {
      if(this.lattitude !== this.lattitudePast || this.longitude !== this.longitudePast) {
        console.log(this.lattitudePast, this.longitudePast);

        this.map.setCenter({
          lat: this.lattitude,
          lng: this.longitude
        });
        this.lattitudePast = this.lattitude;
        this.longitudePast = this.longitude;
        const locationLast = new google.maps.LatLng(this.lattitudePast, this.longitudePast);
        this.checkAndRemoveMarker(locationLast);
        const locationNew = new google.maps.LatLng(this.lattitude, this.longitude);
        this.addMarker(locationNew, this.map);
      }
      // this.busService.getById(this.id).subscribe((bus: Bus) => {
      //   this.busDetail = bus;
      //  // this.initMap();

      //  if(this.lattitudePastBus !== bus.laltitude || this.longitudePastBus !== bus.longitude) {
      //   this.directionsRenderer.setMap(this.map);
      //  // this.calculateAndDisplayRoute1(this.directionsService, this.directionsRenderer);
      //   this.lattitudePastBus = bus.laltitude;
      //   this.longitudePastBus = bus.longitude;
      //  }
      // });

    }
    console.log('Current position:', this.lattitude, this.longitude);
  };



//   //  printCurrentPosition = async () => {

//     const coordinates = await Geolocation.getCurrentPosition();
//     this.lattitude = coordinates.coords.latitude;
//     this.longitude = coordinates.coords.longitude;

//     //Si les coordonnées ont changé on actualise aussi la map
//     if(this.map !== null && this.map !== undefined) {
//       if(this.lattitude !== this.lattitudePast || this.longitude !== this.longitudePast) {
//         console.log(this.lattitudePast, this.longitudePast);

//         this.map.setCenter({
//           lat: this.lattitude,
//           lng: this.longitude
//         });
//         this.lattitudePast = this.lattitude;
//         this.longitudePast = this.longitude;
//         const locationLast = new google.maps.LatLng(this.lattitudePast, this.longitudePast);
//         this.checkAndRemoveMarker(locationLast);
//         const locationNew = new google.maps.LatLng(this.lattitude, this.longitude);
//         this.addMarker(locationNew, this.map);
//       }
//       this.busService.getById(this.id).subscribe((bus: Bus) => {
//         this.busDetail = bus;
//        // this.initMap();

//        if(this.lattitudePastBus !== bus.laltitude || this.longitudePastBus !== bus.longitude) {
//         this.directionsRenderer.setMap(this.map);
//         this.calculateAndDisplayRoute1(this.directionsService, this.directionsRenderer);
//         this.lattitudePastBus = bus.laltitude;
//         this.longitudePastBus = bus.longitude;
//        }
//       });

//     }
//     console.log('Current position:', this.lattitude, this.longitude);
//  // };



  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  
  ) {
    // directionsService  directionsRenderer: google.maps.DirectionsRenderer
    //   .route({
    //     origin: {
    //       lat: this.lattitude,
    //       lng: this.longitude
    //     },
    //     // destination: {
    //     //   lat: 3.8600704,
    //     //   lng: 11.4
    //     // },
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     directionsRenderer.setDirections(response);
    //   })
    //   .catch((e) => window.alert('Directions request failed due to ' + e));
  }
  addMarker(location:any, googleMapAdd:any) {
    const googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icons/location-pin.png',
      scaledSize: new google.maps.Size(50, 50),
    };
    const marker = new google.maps.Marker({
      position: location,
      map: googleMapAdd,
      icon,
      // draggable: true,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(marker);
    // this.presentActionSheet();
    this.markerClickListener = google.maps.event.addListener(marker, 'click', () => {
      console.log('markerclick', marker);
      this.checkAndRemoveMarker(marker);
      console.log('markers: ', this.markers);
    });
  }


  // addMarker(location:any) {
  //   const googleMaps: any = this.googleMaps;
  //   const icon = {
  //     url: 'assets/icons/location-pin.png',
  //     scaledSize: new google.maps.Size(50, 50),
  //   };
  //   const marker = new google.maps.Marker({
  //     position: location,
  //     map: this.map,
  //     icon,
  //     // draggable: true,
  //     animation: google.maps.Animation.DROP
  //   });
  //   this.markers.push(marker);
  //   // this.presentActionSheet();
  //   this.markerClickListener = google.maps.event.addListener(marker, 'click', () => {
  //     console.log('markerclick', marker);
  //     this.checkAndRemoveMarker(marker);
  //     console.log('markers: ', this.markers);
  //   });
  // }

  

  initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const location = new google.maps.LatLng(this.lattitude, this.longitude);
    this.lattitudePast = this.lattitude;
    this.longitudePast = this.longitude;
    const map = new google.maps.Map(document.getElementById('map')!, {
      zoom: 7,
      center:{
        lat: this.lattitude,
        lng: this.longitude
      },
    });
    this.map = map;
    this.addMarker(location,map);
    directionsRenderer.setMap(map);
   // this.calculateAndDisplayRoute1(directionsService, directionsRenderer);

  }


  // initMap() {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   const map = new google.maps.Map(document.getElementById('map')!, {
  //     zoom: 7,
  //     center:{
  //       lat: this.lattitude,
  //       lng: this.longitude
  //     },
  //   });
  //  directionsRenderer.setMap(map);

  // }



  // calculateAndDisplayRoute1(directionsService:any, directionsRenderer:any) {
  //   directionsService
  //     .route({
  //       origin: {
  //         // lat: this.lattitude,
  //         // lng: this.longitude
  //          lat: 3.8600704,
  //         lng: 11.4
  //       },
  //       destination: {
  //         // lat: this.lattitude,
  //         // lng: this.longitude
  //         lat: 3.8600704,
  //         lng: 11.4
  //       },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     .then((response:any) => {
  //       directionsRenderer.setDirections(response);
  //     })
  //     .catch((e:any) => window.alert('Directions request failed due to ' + status));
  // }
}
