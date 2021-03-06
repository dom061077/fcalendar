import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage  } from 'ionic-angular';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { ListPage } from "../list/list";
import { AddTurnoPage } from "../add-turno/add-turno";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { Globals } from '../../app/globals'
import * as moment from 'moment';
import { TurnosServiceProvider  } from '../../providers/turnos-service/turnos-service';
import { ViewTurnoPage } from '../../pages/view-turno/view-turno';

//@IonicPage()
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
        allDaySlot : false,    
        buttonText : {today:'hoy',month:'Mes',week:'Semana',day:'Día',list:'Lista'},
        monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        minTime: '06:00:00',    
        slotDuration: Globals.slotDuration,
        selectable: true,
        defaultView: 'agendaWeek' ,
        selectHelper: true,
        height: 'parent',
        fixedWeekCount : false,
        defaultDate: new Date().toISOString(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventDrop: this.eventDrop.bind(this),
        //dayClick: this.dayClick.bind(this),
        select : this.selectEvent.bind(this),
        eventClick: this.eventClick.bind(this),
        eventResize: this.onEventResize.bind(this),
        events: this.loadEvents.bind(this)
  
      };
  constructor(public navCtrl: NavController 
        ,private database: AngularFireDatabase
        ,private turnosService: TurnosServiceProvider
        ) {
      const momento = moment();
      momento.month(9).date(25).minute(0).second(0).hour(0);

      this.turnosList = this.database.list('turnos',{
          query:{
              orderByChild:'start',
              startAt: momento.format()
              
              
          }
      });
  }

  private eventDrop( event, delta, revertFunc, jsEvent, ui, view ){
      this.turnosService.moverTurno(event.id,event.start,event.end);
  }

  private loadEvents(start, end, timezone, callback){
      callback(this.events$);  
  }
 
  private onEventResize( event, delta, revertFunc, jsEvent, ui, view ){
      this.turnosService.moverTurno(event.id,event.start,event.end);
  }

  
  private dayClick(date, jsEvent, view){
     this.selectedDay = date;
     this.navCtrl.push(AddTurnoPage,{id:date.id,date:date
        ,duracion:Globals.duracion
        ,dateFormat:date.locale('es').format('L'),hora:date.format('LT')});

  }

  private selectEvent(start, end, allDay){
          this.navCtrl.push(AddTurnoPage,{startDate:start,endDate:end});
  }

  private eventClick(event,jsEvent,view){
        this.navCtrl.push(ViewTurnoPage,{id:event.id
                ,dni:event.dni,apellido:event.apellido,nombre:event.nombre
                ,start:event.start,end:event.end,title:event.title});


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
