import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage  } from '../profile/profile';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersProfilePage');
  }

  onAdd(){
      this.navCtrl.push(ProfilePage);
  }

}
