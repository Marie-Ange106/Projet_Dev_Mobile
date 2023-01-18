import { Component, ElementRef, ViewChild , OnInit} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ScanService } from '../scan.service';


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
  constructor(public scanservice:ScanService) {}
  
  async createMap(){
    this.map = await GoogleMap.create({
      id:'map',
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

  results:any
  etudiants:any

  nb:any
  ngOnInit() {
    setTimeout(() => {
      this.scanservice.list().subscribe((reponse: any) => {
        console.log(reponse);
        this.results = reponse;

        this.etudiants =this.results;

      });
      this.scanservice.count().subscribe((data: any) => {
        //console.log(data);
        this.nb = data;
      });
    }
    , 3);

   
   
    // const a = localStorage.getItem("i");
    // console.log(a);
    // this.i=JSON.parse(a!);
    // console.log(this.i);
  }
//   ionViewWillEnter(){
//  setTimeout(() => {
//       this.scanservice.list().subscribe((reponse: any) => {
//         console.log(reponse);
//         this.results = reponse;
//         this.results = this.etudiants;
//       });
//       this.scanservice.count().subscribe((data: any) => {
//         console.log(data);
//         this.nb = data;
//       });
//     }
//     , 3);

    
//   }

handleChange(event: any) {
  const query = event.target.value.toLowerCase();
  this.results = this.etudiants.filter(
    (d: any) => d.name.toLowerCase().indexOf(query) > -1
  );
  console.log(this.results[0]);
  if (this.results[0] == undefined) {
    this.results = this.etudiants.filter(
      (d: any) => d.family.toLowerCase().indexOf(query) > -1
    );
    console.log(this.results);
  }
}
  
}
