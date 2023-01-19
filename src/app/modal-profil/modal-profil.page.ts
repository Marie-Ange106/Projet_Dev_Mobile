import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-profil',
  templateUrl: './modal-profil.page.html',
  styleUrls: ['./modal-profil.page.scss'],
})
export class ModalProfilPage implements OnInit {
   recuperer:any;
  constructor(private modalController: ModalController, private router:Router) { }

  ngOnInit() {
    const retrieve =localStorage.getItem('username')
    this.recuperer = JSON.parse(retrieve!) 
    console.log(this.recuperer)
  }
  
  async close() {
    return await this.modalController.dismiss();
  }

  async out(){
    this.router.navigate(['/login']);
    return await this.modalController.dismiss();
  }
}
