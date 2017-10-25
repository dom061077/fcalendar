import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddTurnoPage } from '../pages/add-turno/add-turno';
import { PacientesPage } from '../pages/pacientes/pacientes';

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


@NgModule({
  declarations: [
    CalendarComponent,
    MyApp,
    HomePage,
    AddTurnoPage,
    ListPage,
    PacientesPage
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
    PacientesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutocompletePacienteServiceProvider
  ]
})
export class AppModule {}
