import { Component } from '@angular/core';
import { BarcodeScannerOptions,BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

public showCamera = false;
scannedData!: {}; // variable qui va récuperer les informations scannées
barcodeScannerOptions!: BarcodeScannerOptions ;

  constructor(private barcodeScanner: BarcodeScanner) {
    this.barcodeScannerOptions = {
      showTorchButton: true, //afficher le bouton de la torche
      showFlipCameraButton: true //afficher le bouton pour retourner la caméra avant ou arrière
    };
  }

  scanCode() {
    this.showCamera = true;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Informations de l'étudiant " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        this.showCamera = false;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }



}
