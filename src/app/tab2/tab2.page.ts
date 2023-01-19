import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  
  API_KEY = 'ATyBuwROfrPLeyxjxCuS-vKTEQt9dSJwOHYb7tGUOGKnQr8V09cgBEQrxs4iOv5_xMRNz9QGB9eYKp9k';
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;
  constructor() {}
  
  async createMap(){
    this.map = await GoogleMap.create({
      id:'my-cool-map',
      apiKey:this.API_KEY,
      element: this.mapRef.nativeElement,
      config:{
        center:{
         lat:33.6,
         lng: -117.9, 
        },
        zoom:8,  
      }
    });
  }
  
}
