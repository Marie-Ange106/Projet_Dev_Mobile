import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Conducteur } from '../class/conducteur';

const BASE_API = environment.api;


@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  constructor(private httpClient: HttpClient) { }
  public save(conducteur: Conducteur) {
    return this.httpClient.post(BASE_API+'conducteur/save', conducteur);
  }

  

}
