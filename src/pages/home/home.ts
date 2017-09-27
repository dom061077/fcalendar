import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { ListPage } from "../list/list";
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

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
       slotDuration: '00:15:00',
        selectable: true,
        selectHelper: true,
        height: 'parent',
        fixedWeekCount : false,
        defaultDate: '2017-09-12',
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
      this.turnosList = this.database.list('turnos');
  }

  private eventDrop( event, delta, revertFunc, jsEvent, ui, view ){
      console.log('Drop el event title: '+event.title+' id: '+event.id);
      
      console.log('Drop event start: '+event.start.format());
  }

  private loadEvents(start, end, timezone, callback){
      
      callback(this.events$);  
          
                
  }

  private dayClick(date, jsEvent, view){
     console.log('Fecha: '+date);
     this.selectedDay = date;
     this.navCtrl.push(ListPage);

  }

  private eventClick(start, end, allDay){
          //alert('Seleccionado');
            console.log('Seleccionado');

  }

  volverFecha(){
    console.log('Volviendo a fecha: '+this.selectedDay);
    this.myCalendar.fullCalendar('gotoDate','2017-10-06T17:00:00');
  }

  ngAfterViewInit(){
      this.turnosList.subscribe(items=>{
              
              while (this.events$.length>0){
                this.events$.pop();

              }
              items.forEach(element => {
                
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
