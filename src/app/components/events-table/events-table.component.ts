import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
//import { allevents } from 'src/app/data/CoursData';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {
  pageOfItems: Array<any>;

event:any =[];
obj:any={};
formSearch:FormGroup;
newTab:any=[];
newT:any=[];
isDisplayed:boolean=false;
myDate :Date;
m:any='';
title:string;
  constructor( private router:Router,private eventService:EventsService) { }

  ngOnInit() {
   // this.event=allevents; //test statique
   this.eventService.getAllEvents().subscribe((response) => {
    this.event = response.events;
    this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE

  });

   this.myDate= new Date();

  }
  goToDisplay(id:any){
    /////bech n9ollou yemchi lil page ili fiha les events lkol w ba3d naffichi b condition
   ////najm nhezou l autre component nsammih infoevent

    this.router.navigate([`EventInfo/${id}`]);

    ////ba3d  n7ot path fil rooting
  }
  goToEdit(id){
///na3ml redirection w n5abbi id fil url :Router
 this.router.navigate([`editEvent/${id}`]);
 //path ba3d  

  }
///
goToDelete(x) {
  ////loulanya une methode tab3a html
  this.eventService.deleteEventById(x).subscribe((data)=>{
    console.log('here after delete',data.pp);///reponse pp tjih fi data
    ////refresh sans reload
    ////sna3na fct kma on init bech ya3ml refresh automatique
    this.allEvents();
  }
  ); ///meth teb3a service
}
search(){
this.newTab=[];

///on va afficher tous les events  qui ont date comprise entre 2  date donees..
  console.log(this.obj);
  if (this.obj.dateStart >= this.obj.dateEnd) {
  return(this.isDisplayed);
  }
  for (let i = 0; i < this.event.length; i++) {
if (this.event[i].eventDate >= this.obj.dateStart && this.event[i].eventDate <= this.obj.dateEnd ) {
  //alert("ok");
  this.newTab.push(this.event[i]);
  
}    
  }

this.event=this.newTab;

}

///refrech apres delete
allEvents(){

  this.eventService.getAllEvents().subscribe((response) => {
    this.event = response.events;
    this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE

  });
}

////Pagination
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
  }

  

}
