import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
//import { allevents } from "src/app/data/CoursData";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  //events:any;
  searchhForm:FormGroup;

  events: any = [];
  //eventsTab:any=allevents;
  eventId: any; /////bech n7ot fih l id ml nav
  
  findedEvent: any = {}; ///// var bch n7ot fiha l object l 3andou id eventId
  ///search
  findedObj:any;
  path :any;
  newTab:any=[];
event:any={};
  /////pour le decorateur

 parentVariables: any = {
    variable1: "all Events",
    variable2: "we have:", // Temp Number
  };
  constructor(private activateRoute: ActivatedRoute ,private router:Router,private eventService:EventsService) {}
  connectedUserId: any;
  url: string;
  ngOnInit() {
    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser")); // variable sabbit fiha tous le contenu de orders
    this.url = this.router.url;
    if (this.url == "/myEvent") {
      ///espace student :cours reservés: 2 search 
      this.eventService.getAllReservationsStudentEvent(this.connectedUserId._id).subscribe((response) => {
          console.log('here into my events ', response.events);
          
          this.events = response.events;
         // this.title=response.title;
          
       }); 
        } else{
    //this.events = allevents;
    this.eventService.getAllEvents().subscribe((response) => {
      this.events = response.events;
      //this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE
  
    });
  }
    this.eventId = this.activateRoute.snapshot.paramMap.get("id");
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((data)=>{
        console.log('here data',data.pp);
    this.findedEvent=data.pp});
      this.parentVariables.variable1 = "More Informations about:"; ////banner
      this.parentVariables.variable2 = this.findedEvent.eventName; ////pkoi erreur!!!
    } ///jibt id ml url
    
    ////
this.path=this.router.url;
//alert(this.path);
// this.findedObj=(JSON.parse(localStorage.getItem("objectSearch")));
// for (let i = 0; i < this.events.length; i++) {
//  if (this.events[i].eventName==this.findedObj.searchVal) {
//  this.newTab.push(this.events[i]);
   
//  }
  
// }

if (this.path=="/searchEvent") {

this.events=this.newTab;
  
}

  }

  searchh(){
      console.log('here data after search',this.event);

    this.eventService.searchEventByDate(this.event).subscribe((data) => {
      //this.messsage=data.message;
      this.events = data.events;

    }); 
  }

}
