import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { UserValidator } from '../../validators/user.validator';

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
              ,private formBuilder:FormBuilder
              ,private userValidator:UserValidator) {

  }

  confirmar(){
     this.userService.changePassword(this.password).catch(e=>{
          console.log('Error: '+e);
     });
  } 

  ngOnInit(){
      this.formPass = this.formBuilder.group({
        'password' : ['',[Validators.required],this.userValidator.passwordMatch.bind(this.userValidator)],
        'password2' : ['',[Validators.required],this.userValidator.password2Match.bind(this.userValidator)]
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
