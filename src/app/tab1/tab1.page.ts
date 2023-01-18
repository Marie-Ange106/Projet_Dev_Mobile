import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScannerOptions,BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Conducteur } from '../class/conducteur';
import { ScanService } from '../scan.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

public showCamera = false;
scannedData!: {}; // variable qui va récuperer les informations scannées
barcodeScannerOptions!: BarcodeScannerOptions ;


  constructor(private barcodeScanner: BarcodeScanner,public alertController: AlertController,
    public scanservice:ScanService, public route:Router) {
    this.barcodeScannerOptions = {
      showTorchButton: true, //afficher le bouton de la torche
      showFlipCameraButton: true //afficher le bouton pour retourner la caméra avant ou arrière
    };
  }

  bar:any

  scanCode() {
    this.showCamera = true;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        
        // alert("Student Informations " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        // this.openDialog(barcodeData);

        console.log(barcodeData);
        this.bar=JSON.stringify(this.scannedData)
        console.log('scann', this.bar)
        this.scanservice.scan(barcodeData).subscribe(
          (data: any) => {
           // console.log('infosetu',data.profil);
           // console.log('infosetumat',data.matricule);
           this.bar=JSON.stringify(data)
           console.log('scann', this.bar)
            localStorage.setItem('info',JSON.stringify(data));
           // localStorage.setItem('username', data.username);
            this.route.navigate(['/scan-success']);
          }
        );
        
        this.showCamera = false;
      })
      .catch(err => {
        err="This student is not registered!!!";
        alert(err);
        console.log("Error", err );
      });
  }


  

  async openDialog(obj:any) {

    const alert = await this.alertController.create({

      header: 'Student informations', 
      message: obj.text, 
      buttons: [ 
        { 
        text: 'Okay', 
        role: 'Okay', 
        cssClass: 'secondary'
        , 
        handler: () => { console.log('Confirm Okay'); } 
        }
      ]
        
    }); 
    await alert.present(); 
    const { role } = await alert.onDidDismiss(); 
    console.log('onDidDismiss resolved with role', role); 
    
  }
    

}
