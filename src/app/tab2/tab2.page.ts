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
  
  address!: string;
  lattitude = 0;
  longitude = 0;
 
  newMap!: GoogleMap;

  googleMaps: any;
  center = { lat: 28.649944693035188, lng: 77.23961776224988 };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];

  constructor(
   
    private renderer: Renderer2,
  
  ) {
    setInterval((data:any) => {
      this.printCurrentPosition();
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


/*
  createMap() {
    const mapRef = document.getElementById('map');
    console.log(mapRef);
    this.printCurrentPosition().then(async (data) => {
      this.newMap = await GoogleMap.create({
        id: 'my-map', // Unique identifier for this map instance
        element: mapRef, // reference to the capacitor-google-map element
        // eslint-disable-next-line object-shorthand
        apiKey: apiKey, // Your Google Maps API Key
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: this.lattitude,
            lng: this.longitude
          },
          zoom: 11, // The initial zoom level to be rendered by the map
        },
      });
      //this.newMap.enableTrafficLayer(true);
      this.newMap.enableClustering();
      await this.addMarkers();

    });

  }

  async addMarkers() {
    const markers: Marker[] = [];
    this.bus.forEach(element => {
      markers.push({
        coordinate: {
          lat: element.laltitude,
          lng: element.longitude
        },
        title: element.surnom,
        snippet: element.idConducteur.nomComplet
      });
    });
    markers.push({
      coordinate: {
        lat: this.lattitude,
        lng: this.longitude
      },
      title: 'Vous',
      snippet: 'Vous',
      isFlat: true,
      opacity: 17,
      iconSize: {
        width: 20,
        height: 20
      }
    });
    await this.newMap.addMarkers(markers);

  }


  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  } */

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
      this.addMarker(location);
      this.onMapClick();
    } catch(e) {
      console.log(e);
    }
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(this.map, 'click', (mapsMouseEvent:any) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      this.addMarker(mapsMouseEvent.latLng);
    });
  }

  addMarker(location:any) {
    const googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icons/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50),
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon,
      // draggable: true,
      animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);
    // this.presentActionSheet();
    this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
      console.log('markerclick', marker);
      this.checkAndRemoveMarker(marker);
      console.log('markers: ', this.markers);
    });
  }

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

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lattitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Current position:', this.lattitude, this.longitude);
  }


  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    // directionsService
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

  calculDuree(heurearrive: string, heuredepart: string) {
    const heureA = parseInt(heurearrive.split(':')[0], 10);
    const minuteA = parseInt(heurearrive.split(':')[1], 10);

    const heureD = parseInt(heuredepart.split(':')[0], 10);
    const minuteD = parseInt(heuredepart.split(':')[1], 10);
    return (heureA - heureD)*60 + minuteA - minuteD;
  }

  /* loadGoogleMaps(): Promise<any> {
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
 */

  initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('map')!, {
      zoom: 7,
      center:{
        lat: this.lattitude,
        lng: this.longitude
      },
    });
    directionsRenderer.setMap(map);
    this.calculateAndDisplayRoute1(directionsService, directionsRenderer);

  }

  calculateAndDisplayRoute1(directionsService:any, directionsRenderer:any) {
    directionsService
      .route({
        origin: {
          lat: this.lattitude,
          lng: this.longitude
        },
        destination: {
          lat: 3.8600704,
          lng: 11.4
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response:any) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e:any) => window.alert('Directions request failed due to ' + status));
  }
}
