import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up-tutor',
  templateUrl: './sign-up-tutor.component.html',
  styleUrls: ['./sign-up-tutor.component.css']
})
export class SignUpTutorComponent implements OnInit {
  imagePreview:any;

  signupForm:FormGroup;///1
  messageError:string;
url:string;
isDisplayed:boolean=false;
passDiplayed:boolean=false;
userId:any;
user:any;
connectedUserId:any;
title:string="Signup";
  constructor(private activatedRoute:ActivatedRoute,private Y:FormBuilder,private userService:UsersService,private router:Router) { }
  ngOnInit() {
    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser")); // variable sabbit fiha tous le contenu de orders

    this.userId = this.activatedRoute.snapshot.paramMap.get("id");//njib l id ml url

    this.url = this.router.url;

  this.isDisplayed = (this.url =="/signup" ) ? false : true;
  this.passDiplayed = (this.userId  ) ? false : true;


    this.signupForm=this.Y.group({///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
      firstName:['',[Validators.minLength(3),Validators.required]],//akther mn validateur n7oto []
      lastName:['',[Validators.required,Validators.minLength(4)]],
      speciality:['',[Validators.required,Validators.minLength(4)]],
      gender:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,12}$")]],  
      cin: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]],  
      tel: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]],
     // user.role = (this.url =="/signup" ) ? 'student' : 'tutor';
   // user.status = 'notOk';
      status:(this.url =="/signup" )? ['student']:['tutor'],
      role:['notOk'],

      img: [''],
     });  
      
      if (this.userId) {
this.title="edit";
        this.isDisplayed = (this.connectedUserId.role=="tutor" ) ? true : false;
        // this.eventId = this.ActivateRoute.snapshot.paramMap.get("id");//njib l id ml url
     this.userService.getUserById(this.userId).subscribe((data) =>{
       this.user=data.pp;
 
   
             // console.log('cccc',this.event.eventName);
                 // this.event=this.events.find(obj =>{return obj.id ==this.eventId});////jebna l objet
                  this.signupForm=this.Y.group({///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
                    firstName:[ this.user.firstName,[Validators.required,Validators.minLength(3)]],//akther mn validateur n7oto []
                    lastName:[this.user.lastName,[Validators.required,Validators.minLength(4)]],
                    speciality:[this.user.speciality,[Validators.required]],
                    gender: [this.user.gender,[Validators.required]],  
                    email: [this.user.email,[Validators.email,Validators.required]] ,
                   /// password: [this.user.pwd,[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,12}$")]] ,
                    // cin: [this.user.cin,[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]] ,
                    tel: [this.user.tel,[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]] ,
                   _id:[this.user._id],
                 
                   // eventName:this.event.eventName,//akther mn validateur n7oto []
                   // eventDescription:this.event.eventDescription,
                   // eventDate:this.event.eventDate,
                   // eventPlace:this.event.eventPlace,
                   // eventPrice:this.event.eventPrice,
                   // _id:this.event._id,
 
 
                 })
                     });
                  
              // alert('here into edit');
             }



  }
  signup(user) {
    this.userId = this.activatedRoute.snapshot.paramMap.get("id");//njib l id ml url

    //console.log('here my event',this.addEventForm.value);
    if (this.userId) {
          ////call service to send math.find
          this.userService.updateUser(this.signupForm.value).subscribe((data)=>{
            //call service to update match object
            
           // console.log('here data after edit',data.pp);
            this.router.navigate([``]);
          });

    }else{
      this.signupForm.value.role = (this.url =="/signup" ) ? 'student' : 'tutor';
      this.signupForm.value.status = 'notOk';
    this.userService.signUpUser(this.signupForm.value,this.signupForm.value.img).subscribe((data)=>{

      if(data.message=="0")  {
      //this.message=data.message;
      this.messageError="Email exist";
      console.log("data");
      }
      else{
        //sinon navigate to home
        this.router.navigate(['']);
      }
    });
  }
  }
  passStyle(id) {
    if (id) {
      return "hidden";
    }  else {
      return "visible";
    }
  }

 // if(data.message=="0"){
   // this.messageError="email exist";
 // }
  //else  {
    //sinon navigate to home
    //this.router.navigate(['']);
 // }
  
 
 // });

//}


/////multer 
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  console.log('Here my file', file);
  
   this.signupForm.patchValue({ img: file });
   this.signupForm.updateValueAndValidity();
  const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result as string
 }; 
  reader.readAsDataURL(file);
}
}
