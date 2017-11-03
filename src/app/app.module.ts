import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddTurnoPage } from '../pages/add-turno/add-turno';
import { PacientesPage } from '../pages/pacientes/pacientes';
import { AddPacientePage } from '../pages/add-paciente/add-paciente';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { HttpModule } from '@angular/http';
import { AutoCompleteModule } from 'ionic2-auto-complete';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AutocompletePacienteServiceProvider } from '../providers/autocomplete-paciente-service/autocomplete-paciente-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteObrasocialServiceProvider } from '../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { TurnosServiceProvider } from '../providers/turnos-service/turnos-service';


@NgModule({
  declarations: [
    CalendarComponent,
    MyApp,
    HomePage,
    AddTurnoPage,
    ListPage,
    PacientesPage,
    AddPacientePage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddTurnoPage,
    PacientesPage,
    AddPacientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutocompletePacienteServiceProvider,
    AutocompleteObrasocialServiceProvider,
    TurnosServiceProvider
  ]
})
export class AppModule {}
