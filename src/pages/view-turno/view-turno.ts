import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';


//https://medium.com/google-developer-experts/deploy-your-app-to-firebase-in-seconds-b3a9a37dff47

/**
 * Generated class for the ViewTurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-turno',
  templateUrl: 'view-turno.html',
})
export class ViewTurnoPage {

  turnoItem : TurnoItem = {$key:'',paciente:{},start:'',end:'',title:''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTurnoPage');
  }

}
