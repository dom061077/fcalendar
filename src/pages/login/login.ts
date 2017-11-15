import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage  } from '../home/home';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

//https://chriztalk.com/ionic-3-and-firebase-authentication/ pagina para ver codigo de autenticacion
//https://reviblog.net/tag/ionic-3-firebase/

export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }
 
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }  
    }
    catch (e) {
      console.error(e);
    }
  }
 
  async register(user: User) {
    //try {
      /*const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );*/
      //if (result) {
        this.navCtrl.push(PerfilPage);
      //}
    /*} catch (e) {
      console.error(e);
    }*/
  }
}