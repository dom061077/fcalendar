import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddTurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-turno',
  templateUrl: 'add-turno.html',
})
export class AddTurnoPage {
  date:any;
  dateFormat:any;
  hora:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.date = navParams.get('date');
      this.dateFormat = navParams.get('dateFormat');
      this.hora = navParams.get('hora');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurnoPage');
  }

}
