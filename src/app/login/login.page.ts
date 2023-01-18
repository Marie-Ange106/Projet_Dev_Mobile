import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtResponse } from '../class/jwt-response';
import { LoginForm } from '../class/login-form';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: LoginForm = new LoginForm();

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private db: DbService
  ) { }

  onSubmit(){
    this.login();
    this.route.navigate(['/tabs/tab1']);
    //console.log(this.loginForm.value);
  }
  registerForm(){
    //this.route.navigate(['/register']);
  }

  ngOnInit() {
  }
  login() {
    console.log('moi',this.loginForm);
    this.authService.login(this.loginForm).subscribe(
      (data: any) => {
      console.log('moimeme',data);
      localStorage.setItem('jwt', data.accessToken);
      localStorage.setItem('username', data.username);
      this.db.initialisationDB();
      this.db.saveLoginInfo(this.loginForm, data);
      this.route.navigate(['/tabs/tab1']);
    });
  }

}
