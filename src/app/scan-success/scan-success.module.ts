import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanSuccessPageRoutingModule } from './scan-success-routing.module';

import { ScanSuccessPage } from './scan-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanSuccessPageRoutingModule
  ],
  declarations: [ScanSuccessPage]
})
export class ScanSuccessPageModule {}
