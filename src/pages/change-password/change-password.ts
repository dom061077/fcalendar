import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  formPass : FormGroup;
  password:string;
  password2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private userService:UsuariosServiceProvider
              ,private formBuilder:FormBuilder) {

  }

  confirmar(){
     this.userService.changePassword(this.password);
  }

  ngOnInit(){
      this.formPass = this.formBuilder.group({
        'password' : ['',[Validators.required]],
        'password2' : ['',[Validators.required]]
      });


  }

  isValid(){
      return !this.formPass.valid;
  }

  ionViewDidLoad() {
    
  }

  ionViewWillLeave(){
      this.userService.unsubscribeAll();
  }

}
