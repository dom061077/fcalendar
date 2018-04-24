import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfesionalesProvider } from '../../providers/profesionales/profesionales-service';
import { ViewProfesionalPage } from '../view-profesional/view-profesional';
import { AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the ProfesionalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-profesionales',
  templateUrl: 'profesionales.html',
})
export class ProfesionalesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
        ,private proService: ProfesionalesProvider
        ,private database: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesionalesPage');
  }

  onAdd(){
      //this.proService.initInstitucion();
      this.navCtrl.push(ViewProfesionalPage);
  }

  onCreateRoles(){
      alert('Hola');
  }

}
