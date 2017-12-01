import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddTurnoPage } from '../pages/add-turno/add-turno';
import { PacientesPage } from '../pages/pacientes/pacientes';
import { AddPacientePage } from '../pages/add-paciente/add-paciente';
import { ViewPacientePage  } from '../pages/view-paciente/view-paciente';
import { PerfilPage } from '../pages/perfil/perfil';
import { ViewTurnoPage } from '../pages/view-turno/view-turno';

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
    PerfilPage,
    ViewTurnoPage
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
    PerfilPage,
    ViewTurnoPage
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
    DniValidator
  ]
})
export class AppModule {}
