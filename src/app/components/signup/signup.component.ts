import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;///1
  message:string;
  url :string;
  constructor(private X:FormBuilder,private userService:UsersService,private router:Router) { }

  ngOnInit() {
    this.url = this.router.url;

    this.signupForm=this.X.group({///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
      firstName:['',[Validators.required,Validators.minLength(3)]],//akther mn validateur n7oto []
      lastName:['',[Validators.required,Validators.minLength(4)]],
      gender:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,12}$")]],  
      cin: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]],  
      tel: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]] })

    
  }
  signup(user) {

    console.log("Signup user: ",this.signupForm.value);

    user.role = (this.url =="/signup" ) ? 'Student' : 'Tutor';
    user.status = 'notOk';
    console.log("Signup user: ",this.signupForm.value);
    // this.userService.signUpUser(user).subscribe((data)=>{
    //   if(data.message=="0"){
    //     this.message="email exist";
    //   } 
      
      
    //   else{
    //     //sinon navigate to home
    //     this.router.navigate(['']);
    //   }
    //   });
    
    }

}
