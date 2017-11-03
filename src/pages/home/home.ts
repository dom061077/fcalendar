import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { ListPage } from "../list/list";
import { AddTurnoPage } from "../add-turno/add-turno";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { Globals } from '../../app/globals'
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedDay:any;
  turnosList: FirebaseListObservable<any>;
  events$=[];
  
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
    calendarOptions:Object = {
			header: {
				left: 'prev,next today',

				right: 'month,agendaWeek,agendaDay',
        center: 'title'
			},      
       slotDuration: Globals.slotDuration,
        selectable: true,
        selectHelper: true,
        height: 'parent',
        fixedWeekCount : false,
        defaultDate: new Date().toISOString(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventDrop: this.eventDrop.bind(this),
        dayClick: this.dayClick.bind(this),
        select : this.eventClick.bind(this),
        eventClick: function(calEvent, jsEvent, view){
              console.log('Evento eventClick');
        },
        events: this.loadEvents.bind(this)
  
      };
  constructor(public navCtrl: NavController ,private database: AngularFireDatabase) {
      const momento = moment();
      console.log('Momento de filtro antes: '+momento.format());
      momento.month(9).date(25).minute(0).second(0).hour(0);
      console.log('Momento de filtro: '+momento.format());

      this.turnosList = this.database.list('turnos',{
          query:{
              orderByChild:'start',
              startAt: momento.format()
              
              
          }
      });
  }

  private eventDrop( event, delta, revertFunc, jsEvent, ui, view ){
      console.log('Drop el event title: '+event.title+' id: '+event.id);
      
      console.log('Drop event start: '+event.start.format());
  }

  private loadEvents(start, end, timezone, callback){
      
      callback(this.events$);  
          
                
  }

  private dayClick(date, jsEvent, view){
     
     this.selectedDay = date;
     

     this.navCtrl.push(AddTurnoPage,{id:date.id,date:date
        ,dateFormat:date.locale('es').format('L'),hora:date.format('LT')});

  }

  private eventClick(start, end, allDay){
          //alert('Seleccionado');
            console.log('Seleccionado');

  }

  volverFecha(){

      this.myCalendar.fullCalendar('gotoDate','2017-10-06T17:00:00');
  }

  ngAfterViewInit(){
      const momento = moment();
      momento.minutes(0);
      this.myCalendar.fullCalendar('gotoDate',momento.format());

      this.turnosList.subscribe(items=>{
              
              while (this.events$.length>0){
                this.events$.pop();

              }
              console.log('Antes de ingresar al foreach: ');
              items.forEach(element => {
                console.log('Start: '+element.start);
                this.events$.push({
                  id: element.$key,
                  title:element.title,
                  start:element.start,
                  end: element.end
                }); 
              });
              this.myCalendar.fullCalendar( 'refetchEvents' );
              
          
      });  

  }

}
