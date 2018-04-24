import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';
import { TurnosServiceProvider } from '../../providers/turnos-service/turnos-service';
import * as moment from 'moment';


//https://medium.com/google-developer-experts/deploy-your-app-to-firebase-in-seconds-b3a9a37dff47

/**
 * Generated class for the ViewTurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-view-turno',
  templateUrl: 'view-turno.html',
})
export class ViewTurnoPage {
  turnoItem = {} as TurnoItem;
  paciente$Key = '';

  constructor(public navCtrl: NavController, public navParams: NavParams
          ,private turnosService: TurnosServiceProvider ) {
        this.turnoItem = turnosService.getTurno(this.navParams.get('id'));
        this.paciente$Key = Object.keys(this.turnoItem.paciente).toString();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTurnoPage');
  }

  deleteTurno(){
      this.turnosService.deleteTurno(this.turnoItem);
      this.navCtrl.pop();
  }

  ionViewWillLeave(){
    // Unsubscribe from the Observable when leaving the page
  }
  

}
