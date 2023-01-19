import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const BASE_API = environment.api;
const httpOptions = {
  headers: new HttpHeaders(
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(private httpClient: HttpClient) { }

  public scan(qrcode:any) {
    return this.httpClient.get(BASE_API+'etudiant/email/', qrcode.email);
  }

  public list() {
    return this.httpClient.get(BASE_API+'etudiantcount/all');

  }
  public count() {
    return this.httpClient.get(BASE_API+'etudiantcount/count');

  }

  email='honorenkot@gmail.com'
  public findStudentByEmail(email: any) {
    return this.httpClient.get(BASE_API+'/emailqr/'+ this.email);
  }
}
