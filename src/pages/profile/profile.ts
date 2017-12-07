import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';
import { ProfileItem  } from '../../models/profile/profile-item.interface';
import { User  } from '../../models/user';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  formAdd: FormGroup;
  profileUser = {} as ProfileUserItem;

  constructor(public navCtrl: NavController, public navParams: NavParams
            ,public formBuilder: FormBuilder, private usuarioService : UsuariosServiceProvider ) {
      this.profileUser.profile = {} as ProfileItem;
      this.profileUser.user = {} as User;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  isValid(){
      return !this.formAdd.valid;
  }

  confirmar(){
      this.usuarioService.addUser(this.profileUser);
  }

  ngOnInit():any{
    //https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      
          this.formAdd = this.formBuilder.group({
              'apellido'   : ['', [Validators.required]],
              'nombre'   : ['', [Validators.required]],
              'tipoUsuario' : ['',[Validators.required]],
              'email' : ['',[Validators.required]],
              'password' : ['',[Validators.required]],
          });
    
  }    

}
