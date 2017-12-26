import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddTurnoPage } from '../pages/add-turno/add-turno';
import { PacientesPage } from '../pages/pacientes/pacientes';
import { AddPacientePage } from '../pages/add-paciente/add-paciente';
import { ViewPacientePage  } from '../pages/view-paciente/view-paciente';
import { ViewTurnoPage } from '../pages/view-turno/view-turno';
import { UsersProfilePage } from '../pages/users-profile/users-profile';
import { ProfilePage  } from '../pages/profile/profile';
import { ViewProfilePage  } from '../pages/view-profile/view-profile';
import { HistoriaClinicaPage } from '../pages/historia-clinica/historia-clinica';
import { ProfesionalesPage } from '../pages/profesionales/profesionales';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { HttpModule } from '@angular/http';
import { AutoCompleteModule } from 'ionic2-auto-complete';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AutocompletePacienteServiceProvider } from '../providers/autocomplete-paciente-service/autocomplete-paciente-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteObrasocialServiceProvider } from '../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider } from '../providers/autocomplete-localidad/autocomplete-localidad';
import { TurnosServiceProvider } from '../providers/turnos-service/turnos-service';
import { IonicPageModule } from "ionic-angular";
import { PacienteServiceProvider } from '../providers/paciente-service/paciente-service';
import { DniValidator  } from '../validators/dni.validator';
import { UserValidator } from '../validators/user.validator';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfesionalesProvider } from '../providers/profesionales/profesionales';


@NgModule({
  declarations: [
    CalendarComponent,
    MyApp,
    HomePage,
    AddTurnoPage,
    ListPage,
    PacientesPage,
    AddPacientePage,
    ViewPacientePage,
    ViewTurnoPage,
    ViewProfilePage,
    UsersProfilePage,
    ProfilePage,
    ChangePasswordPage,
    HistoriaClinicaPage,
    ProfesionalesPage

  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(HomePage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddTurnoPage,
    PacientesPage,
    AddPacientePage,
    ViewPacientePage,
    ViewTurnoPage,
    UsersProfilePage,
    ProfilePage,
    ViewProfilePage,
    ChangePasswordPage,
    HistoriaClinicaPage,
    ProfesionalesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutocompletePacienteServiceProvider,
    AutocompleteObrasocialServiceProvider,
    AutocompleteProvinciaProvider,
    AutocompleteLocalidadProvider,
    TurnosServiceProvider,
    PacienteServiceProvider,
    DniValidator,
    UserValidator,
    UsuariosServiceProvider,
    ProfesionalesProvider
  ]
})
export class AppModule {}
