import { JwtResponse } from './../class/jwt-response';
import { LoginForm } from './../class/login-form';
import { Injectable } from '@angular/core';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private storage: Storage) { }

  async initialisationDB() {
    await this.storage.create();
    //Quel type de driver on souhaite utiliser pour notre application
    await this.storage.defineDriver(cordovaSQLiteDriver);
  }

  setLogin() {
    this.storage.set('isLogin', true);
  }



  saveLoginInfo(loginForm: LoginForm, jwtResponse: JwtResponse) {
    this.setLogin();
    this.storage.set('loginInfos', loginForm);
    this.saveJwtInfo(jwtResponse);
  }

  saveJwtInfo(jwtInfos: JwtResponse) {
    this.storage.set('jwtInfos', jwtInfos);
  }

  async getIsLogin() {
    return await this.storage.get('isLogin');
  }

  async getLoginInfos() {
    return await this.storage.get('loginInfos');
  }
}

