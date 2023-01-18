import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-success',
  templateUrl: './scan-success.page.html',
  styleUrls: ['./scan-success.page.scss'],
})
export class ScanSuccessPage implements OnInit {

  constructor() { }

  tab:any
  i:any
  ngOnInit() {
    const a = localStorage.getItem("info");
    console.log(a);
     this.i=JSON.parse(a!);
     console.log('info i ',this.i);
     console.log('info i ',this.i.nomComplet);
     console.log('info i ',this.i.matricule);
    

   this.tab=localStorage.getItem('info')
   console.log('tab',this.tab)
  }

}
