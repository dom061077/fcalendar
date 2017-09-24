import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { ListPage } from "../list/list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedDay:any;
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
        dayClick: this.dayClick.bind(this),
        select : this.eventClick.bind(this),
        eventClick: function(calEvent, jsEvent, view){
              console.log('Evento eventClick');
        },
        events: [
          {
            title: 'All Day Event',
            start: '2017-09-01'
          },
          {
            title: 'Long Event',
            start: '2017-09-07',
            end: '2017-09-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2017-09-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2017-09-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2017-09-11',
            end: '2017-09-13'
          },
          {
            title: 'Meeting',
            start: '2017-09-12T10:30:00',
            end: '2017-09-12T11:45:00'
          },
          {
            title: 'Lunch',
            start: '2017-09-12T10:15:00'
          },
          {
            title: 'Meeting',
            start: '2017-09-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2017-09-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2017-09-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2017-09-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2017-09-28'
          }
        ]
      };
  constructor(public navCtrl: NavController) {

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

  }

}
