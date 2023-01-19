import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { ScanService } from '../scan.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
  
})

export class Tab3Page {
  
  results:any
  etudiants:any

  nb:any

  constructor(private scanservice:ScanService) {}

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
  }
  
  // if(!this.networkService.isOnline()){
  //   this.loadFromStorage();
  //   console.log('Offline');
  //   } else {
  //   console.log('Online');
  //   this.loadFromServer();
  //   }
    
}
