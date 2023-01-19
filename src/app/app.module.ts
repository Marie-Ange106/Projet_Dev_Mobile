import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpInterceptorDev } from './interceptor/http-interceptor';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {HttpClientModule,HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'bus_etudiant',
      // eslint-disable-next-line no-underscore-dangle
      driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB]
    })],
  providers: [BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient,
    Storage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorDev,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
