import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrls: ['./sign-up-admin.component.css']
})
export class SignUpAdminComponent implements OnInit {
  signupForm:FormGroup;///1
  imagePreview:any;

 message:string;
  constructor(private router:Router,private Y:FormBuilder,private userService:UsersService) { }

  ngOnInit() {
    this.signupForm=this.Y.group({///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
      firstName:['',[Validators.required,Validators.minLength(3)]],//akther mn validateur n7oto []
      lastName:['',[Validators.required,Validators.minLength(4)]],
      gender:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,12}$")]],  
      cin: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]],  
      tel: ['',[Validators.required,Validators.pattern("^(?=.*[0-9]).{8}$")]] ,
      status:['admin'],
      role:[''],

    
      img: [''],
    })

    
  }
  signup(obj) {
    this.signupForm.value.role =  'admin';
      this.signupForm.value.status = '';
      this.signupForm.value.speciality = '';
  //  this.signupForm.value.role = 'admin';

     this.userService.signUpUser(this.signupForm.value,this.signupForm.value.img).subscribe((data)=>{
     if(data.message== "0")  {
       //this.message=data.message;
       this.message="Email exist";
       console.log("data");
       }
      this.router.navigate([``]);
    console.log("not error");
     });
  }
//////////////


////multer 
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

