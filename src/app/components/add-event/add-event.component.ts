import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Builder } from 'protractor';
//import { allevents } from 'src/app/data/CoursData';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  /////banner
  imagePreview:any;

  parentVariables: any = {
    variable1: "add event",//variable pour banner
    variable2: "", // Temp Number
  };
  addEventForm:FormGroup;
  //y:string="ADD EVENT";
  event:any;
  //events=allevents;//bech njib les var lil edit
  eventId:any;
  constructor(private X:FormBuilder ,private router:Router, private ActivateRoute:ActivatedRoute,private eventService:EventsService) { }

  ngOnInit() {
   // this.path = this.router.url;
   // console.log('here path', this.path);
   this.eventId = this.ActivateRoute.snapshot.paramMap.get("id");//njib l id ml url

    this.addEventForm = this.X.group({
        eventName:['',[Validators.required,Validators.minLength(3)]],//akther mn validateur n7oto []
                  eventDescription:['',[Validators.required,Validators.minLength(5)]],
                   eventDate:['',Validators.required],
                   eventPlace:['',Validators.required],  
                   eventPrice:['',Validators.required],
                   img: [''],
    });
   // this.event={}
   

      if (this.eventId) {
       // this.eventId = this.ActivateRoute.snapshot.paramMap.get("id");//njib l id ml url
    this.eventService.getEventById(this.eventId).subscribe((data) =>{
      this.event=data.pp;

  
            // console.log('cccc',this.event.eventName);
                // this.event=this.events.find(obj =>{return obj.id ==this.eventId});////jebna l objet
                 this.addEventForm=this.X.group({///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
                  eventName:[ this.event.eventName,[Validators.required,Validators.minLength(3)]],//akther mn validateur n7oto []
                   eventDescription:[this.event.eventDescription,[Validators.required,Validators.minLength(5)]],
                   eventDate:[this.event.eventDate,[Validators.required]],
                   eventPlace: [this.event.eventPlace,[Validators.required]],  
                   eventPrice: [this.event.eventPrice,[Validators.required]] ,
                  _id:[this.event._id]
                  // eventName:this.event.eventName,//akther mn validateur n7oto []
                  // eventDescription:this.event.eventDescription,
                  // eventDate:this.event.eventDate,
                  // eventPlace:this.event.eventPlace,
                  // eventPrice:this.event.eventPrice,
                  // _id:this.event._id,


                })
                   this.parentVariables.variable1="EDIT EVENT";  });
                 
             // alert('here into edit');
            }

  }
  
 addOrEdit(){
  this.eventId = this.ActivateRoute.snapshot.paramMap.get("id");//njib l id ml url

    //console.log('here my event',this.addEventForm.value);
    if (this.eventId) {
          ////call service to send math.find
          this.eventService.updateEvent(this.addEventForm.value).subscribe((data)=>{
            //call service to update match object
            
           // console.log('here data after edit',data.pp);
            this.router.navigate([`admin`]);
          });

    }else{
    ////call service 
    this.eventService.addEvents(this.addEventForm.value,this.addEventForm.value.img).subscribe(
      (data)=>{
       // console.log('here data after add',data.message);
        this.router.navigate([`admin`]);
      } );

    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('Here my file', file);
    
     this.addEventForm.patchValue({ img: file });
     this.addEventForm.updateValueAndValidity();
    const reader = new FileReader();
     reader.onload = () => {
       this.imagePreview = reader.result as string
   }; 
    reader.readAsDataURL(file);
  }
}
