import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

public showCamera = false;
public textScanned: string = '';

  constructor(private qrScanner: QRScanner) {}

  scanCode() {
    this.showCamera = true;
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        console.log('Scan en cours...' + JSON.stringify(status));
        const scanSub = this.qrScanner.scan().subscribe((text: any) => {
          console.log('Scanned something', text.result);
          this.textScanned = text.result;
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.showCamera = false;
        });
      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeCamera(){
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }

}
