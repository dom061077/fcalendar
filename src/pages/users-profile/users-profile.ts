import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage  } from '../profile/profile';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Subscription  } from 'rxjs/Subscription';
import { ViewProfilePage  } from '../view-profile/view-profile';
import { SeguridadServiceProvider } from '../../providers/usuarios-service/seguridad-service';


/**
 * Generated class for the UsersProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-profile',
  templateUrl: 'users-profile.html',
})
export class UsersProfilePage {
  showSpinner:boolean;
  completedSubscription : Subscription;
  myInput:string;


  constructor(public navCtrl: NavController, public navParams: NavParams
            ,private usersService:UsuariosServiceProvider ,private seguridadService:SeguridadServiceProvider) {
              this.showSpinner = true;
              this.completedSubscription = this.usersService.completedQueryObs.subscribe((data)=>{

                  if(data){
                      this.showSpinner = false;
                  }

              });

  }

  ionViewDidLoad() {
    this.usersService.endat.next('\uf8ff');
    this.usersService.startat.next('');

  }

  onAdd(){
      this.navCtrl.push(ProfilePage);
  }

  onAddRole(){
      var pages = {} as Array<string>;
      pages=['UsersProfilePage','AddPacientePage'];
      this.seguridadService.agregarRolesandPages('ADMINISTRADOR',pages);
  }

  onAddRoles(){

  }

  onClickItem(item){
      
      this.navCtrl.push(ViewProfilePage,{profileId:item.$key});
  }

  onInput(event){
      this.showSpinner = true;
      this.usersService.getUsers(event.target.value);
      return true;
  }

  ionViewWillLeave(){
      this.usersService.subscriptionGetUserCount.unsubscribe();
      this.usersService.subscriptionGetUserItems.unsubscribe();
      this.completedSubscription.unsubscribe();

  }


}
