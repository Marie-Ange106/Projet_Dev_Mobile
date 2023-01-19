import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../class/login-form';

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
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  public login(loginForm: LoginForm) {
    return this.httpClient.post(BASE_API+'api/v1/login', loginForm);
  }


  





}
