import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { UserValidator } from '../../validators/user.validator';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

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
  oldPassword:string;
  password:string;
  password2:string;
  showSpinner:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private userService:UsuariosServiceProvider
              ,private formBuilder:FormBuilder
              ,private userValidator:UserValidator
              ,private alertCtrl:AlertController
              ,private loadingCtrl: LoadingController
            ) {

  }

  confirmar(){
          //"auth/weak-password"
          //"auth/email-already-in-use"    
    let loading = this.loadingCtrl.create({content:'Por favor espere...'});
          
     loading.present();
     this.userService.changePassword(this.oldPassword,this.password).then(()=>{
            setTimeout(() => {
                loading.dismiss();
            }, 3000);
            this.navCtrl.setRoot(HomePage);
        }).catch(e=>{
            setTimeout(() => {
                loading.dismiss();
            }, 3000);
            
            var mensaje='';
            if(e.code=='auth/weak-password')
                mensaje = 'La contraseña debe tener al menos 6 caracteres';
            if(e.code=='auth/wrong-password')
                mensaje = 'La contraseña anterior es incorrecta';
            console.log('Excepción: '+e.code);
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: mensaje,
                buttons: ['OK']
            });
            alert.present();
     });
  } 

  ngOnInit(){
      this.formPass = this.formBuilder.group({
      'oldPassword' : ['',Validators.required]    ,
      'password' : ['',[Validators.required]/*,this.userValidator.passwordMatch.bind(this.userValidator)*/],
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
