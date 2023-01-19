import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtResponse } from '../class/jwt-response';
import { LoginForm } from '../class/login-form';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: LoginForm = new LoginForm();
  ionicForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private db: DbService,
    public loadingController: LoadingController
  ) { }

 ngOnInit() {
  // this.ionicForm= this.formBuilder.group({
  //   mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  //   password: ['', [Validators.required, Validators]]
  // })
  }

  get errorControl(){
    return this.ionicForm.controls;
  }

  onSubmit(){
    this.login();
    // this.route.navigate(['/tabs/tab1']);

    this.isSubmitted=true;
    if (!this.ionicForm.valid){
      console.log('Please provide all the required values!')
      
    } else{
      console.log(this.ionicForm.value)
    }
    //console.log(this.loginForm.value);
  }
  


  registerForm(){
    //this.route.navigate(['/register']);
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

  //loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait for a few moment',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
