import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
smsForm:FormGroup;
user:any={};
  constructor(private usersService:UsersService) { }

  ngOnInit() {
  }

sms(){
  this.usersService.sendSms(this.user).subscribe((data)=>{
    console.log("here add",this.user);
   // this.router.navigate([``]);
  
  });


}



}
