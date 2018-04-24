import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PacientesPage  } from '../pages/pacientes/pacientes';
import { LoginPage  } from '../pages/login/login';
import { UsersProfilePage } from '../pages/users-profile/users-profile';
import { ChangePasswordPage  } from '../pages/change-password/change-password';
import { HistoriaClinicaPage } from '../pages/historia-clinica/historia-clinica';
import { ProfesionalesPage } from '../pages/profesionales/profesionales';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(app: App,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Turnos', component: HomePage },
      { title: 'Pacientes', component: PacientesPage },
      { title: 'Historia Clínica' ,component:HistoriaClinicaPage},
      { title: 'Profesionales' ,component:ProfesionalesPage},
      { title: 'Usuarios' ,component:UsersProfilePage},
      { title: 'Contraseña',component: ChangePasswordPage}
    ];
    app.viewWillEnter.subscribe(
        (view) =>{ 
          console.log(view);
        }

    );    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    console.log('Nombre de component: '+page.component.name);
    
  }
}
