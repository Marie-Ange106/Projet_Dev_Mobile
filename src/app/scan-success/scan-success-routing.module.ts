import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanSuccessPage } from './scan-success.page';

const routes: Routes = [
  {
    path: '',
    component: ScanSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanSuccessPageRoutingModule {}
