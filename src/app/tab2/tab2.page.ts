import { Component } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public showCamera = false;
  public textScanned: string = '';

  constructor() {}

  // ionViewDidEnter() {
  //   this.showCamera = true;
  //   // Optionally request the permission early
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //     if (status.authorized) {
  //       // start scanning
  //       console.log('Scan en cours...' + JSON.stringify(status));
  //       const scanSub = this.qrScanner.scan().subscribe((text: any) => {
  //         console.log('Scanned something', text.result);
  //         this.textScanned = text.result;
  //         this.qrScanner.hide(); // hide camera preview
  //         scanSub.unsubscribe(); // stop scanning
  //         this.showCamera = false;
  //       });
  //     } else if (status.denied) {
  //       // camera permission was permanently denied
  //     } else {
  //       // permission was denied, but not permanently. You can ask for permission again at a later time.
  //     }
  //   })
  //   .catch((e: any) => console.log('Error is', e));
  // }

}
