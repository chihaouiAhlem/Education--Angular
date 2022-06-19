import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
user:any={};
currentUser:any;

message:string;

//etape2

constructor (private userService:UsersService,private router:Router) { }

  ngOnInit() {
  }
 
//   login(){
//     // console.log('here my user',this.user);
//      this.userService.loginUser(this.user).subscribe((data)=>{
//       // console.log(data);
//        if (data.message !="2") {
//          this.message="Echec login";
//  console.log(data.message);
//        }
//        else {
//          this.userFind=data.user;
//      /// console.log('login with success',this.user.role);
//          // 
//          if (this.userFind.role == "student") {
//           if (this.userFind.role == "student" && this.userFind.status == "notOk") {
//              this.message= "Account Not Verified";
//       console.log('Account Not Verified',this.user);
 
//           }
//           else if ( this.user.role == "student" && this.user.status =="ok") {
//                 localStorage.setItem("connectedUserId", JSON.stringify(this.user));
//             /*   localStorage.setItem("connectedUserRole", this.user.role);
//               localStorage.setItem("connectedUserRole", this.user.firstName);
//               localStorage.setItem("connectedUserRole", this.user.lastName); */
//               this.router.navigate(["admin"]);
//              console.log('i am in LS');
 
//            }
//          }
//         else if (this.userFind.role == "tutor") {
//            if (this.userFind.role == "tutor" && this.userFind.status == "notOk") {
//              this.message= "Account Not Verified";
//              console.log("notok");
 
//            } 
//            else if ( this.userFind.role == "tutor" && this.userFind.status == "ok") {
 
//              localStorage.setItem("connectedUserId", this.userFind._id);
//              localStorage.setItem("connectedUserRole", this.userFind.role);
//              localStorage.setItem("connectedUserRole", this.userFind.firstName);
//              localStorage.setItem("connectedUserRole", this.userFind.lastName);
//              this.router.navigate([``]);
//               console.log("notok");
//            }
//        } 
//        else if (this.userFind.role == "admin") {
//          localStorage.setItem("connectedUserId", this.userFind._id);
//          localStorage.setItem("connectedUserRole", this.userFind.role);
//          localStorage.setItem("connectedUserRole", this.userFind.firstName);
//          localStorage.setItem("connectedUserRole", this.userFind.lastName);
//          this.router.navigate([``]);
//        }
//        else{
//          console.log("error!!!!");
//        }
//        }
//      });
//    }

/////
login(){
 // console.log('here my user', this.user);
  this.userService.loginUser(this.user).subscribe((data)=>{
    console.log("here user after login",data.user)
  this.currentUser=data.user;
 // console.log("here user after login",this.currentUser)
    if(data.message !="2"){
      data.message="echec authentification"
      this.message="echec authentification";
    } else 
    if(this.currentUser.role=="tutor" && this.currentUser.status=="notOk"){
      this.message="please wait for confirmation from the administration";

      } else if (this.currentUser.role=="student" && this.currentUser.status=="notOk") {
        this.message="please wait for confirmation from the administration";

        
      }
    else {
      localStorage.setItem('ConnectedUser', JSON.stringify(this.currentUser ));
      if(this.currentUser.role=="tutor" && this.currentUser.status=="ok"){
      this.router.navigate([''])
      }
      
      else if (this.currentUser.role=="student")
      
        {
          this.router.navigate([''])
      }
      else if (this.currentUser.role=="admin")
      
        {
          this.router.navigate(['admin'])
      }
        else{
        //  simple user
          this.router.navigate([''])

        }
    }
  });
}
}
