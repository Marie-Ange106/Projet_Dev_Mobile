import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProfilPageRoutingModule } from './modal-profil-routing.module';

import { ModalProfilPage } from './modal-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ModalProfilPageRoutingModule
  ],
  declarations: [ModalProfilPage]
})
export class ModalProfilPageModule {}
