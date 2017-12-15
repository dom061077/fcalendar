import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,FirebaseObjectObservable } from 'angularfire2/database';
import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { UserValidator } from '../../validators/user.validator';
import { Subscription  } from 'rxjs/Subscription';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  
  profileUser = {} as ProfileUserItem;
  formView: FormGroup;
  subscriptorObject : Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,private database:AngularFireDatabase
      ,public formBuilder: FormBuilder,private userValidator:UserValidator
      ,private userService:UsuariosServiceProvider) {
        
        this.subscriptorObject = this.database.object('profiles/'+navParams.get('profileId'))
                .subscribe(data=>{
                    this.profileUser.profile={apellido:data.apellido,apellido_nombre:data.apellido_nombre
                        ,email:data.email,nombre:data.nombre,tipoUsuario:data.tipoUsuario};
                    this.profileUser.user={email:data.email,password:''};
      
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }

  isValid(){
    return !this.formView.valid;
  }  

  confirmar(){
      this.userService.changePassword('probando');
  }

  ngOnInit(){
      this.formView = this.formBuilder.group({
        'apellido'   : ['', [Validators.required]],
        'nombre'   : ['', [Validators.required]],
        'tipoUsuario' : ['',[Validators.required]],
        'email' : ['',[Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
              ,Validators.required]],
        'password' : ['',[Validators.required]],
      });
  }

  ionViewWillLeave(){
      this.subscriptorObject.unsubscribe();
  }

}