import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
@Input() R:any;//decorateur qui permet de passer l info de parent vers child
actualDate:Date;
isres:boolean=false;
message:string;
messageRes:number;
path:string;
connectedUserTab:any;
connectedUserId:any;
reserve:any={};
headerUser:boolean=false;
users:any;
constructor(private eventsService:EventsService) { }

  ngOnInit() {
    this.actualDate=new Date();

    this.connectedUserTab = JSON.parse(localStorage.getItem("ConnectedUser") || "[]"); // variable sabbit fiha tous le contenu de orders
    this.connectedUserId=this.connectedUserTab ._id;
    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");

    if (this.users.role=='student' && this.users.status=='ok') {
      this.headerUser=true;
    }
   }
  
   addToBasket(idEvent,eventsPlaces,eventsDate){
    var q = new Date();
    this.eventsService.getAllReservationsByIdUserAndEvents(this.connectedUserId,idEvent).subscribe((response) =>{
      this.messageRes = response.message;
     // this.title = response.response;
     console.log("here msg reser",response)
      
   
     console.log("messageres",this.messageRes)
if (eventsPlaces>0 &&  this.messageRes==0) {
  //if ( this.messageRes!="existe") {
    
  
  this.reserve.idEvent=idEvent;
  this.reserve.userId=this.connectedUserId;
  //console.log("here you can reserve",this.reserve);

  this.eventsService.addReservationEvent(this.reserve).subscribe(
    (data)=>{
     console.log('here data after add',data.message);
     // this.router.navigate([`admin`]);
     this.message=data.message;
     if (data.message==" registered with success") {
      this.headerUser=false;

      
     }
    } );
    this.eventsService.updatePlaces(this.reserve).subscribe((data)=>{
      // this.course=data.pp;
      console.log('places edited with success',data);
      this.headerUser=false;
 
     });
    //}
    //else{
      //this.headerUser=true;

   // }
}

else{console.log("here you can t reserve");
      this.message="you are registered in this event ";

}  });
/////////////il faut que student dans un cours une seul inscrit!!!
  }

}
