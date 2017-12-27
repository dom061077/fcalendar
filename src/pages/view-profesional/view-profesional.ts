import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

/**
 * Generated class for the ViewProfesionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-view-profesional',
  templateUrl: 'view-profesional.html',
})
export class ViewProfesionalPage {
  formAdd: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private formBuilder:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfesionalPage');
  }

  ngOnInit():any{
      this.formAdd = this.formBuilder.group({
            'matricula' : ['',[Validators.required]],
            'apellido'  : ['',[Validators.required]],
            'nombre'    : ['',[Validators.required]],
            'dni'       : ['',[Validators.required]]
      });
  }

}
