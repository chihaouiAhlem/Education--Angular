import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
//import { allTutors, allUsers } from "src/app/data/CoursData";

@Component({
  selector: "app-tutors",
  templateUrl: "./tutors.component.html",
  styleUrls: ["./tutors.component.css"],
})
export class TutorsComponent implements OnInit {
  //tutors:any=[];
  findId: any;
  findObj: any;
  findTab: any = [];
  //tutors=allTutors;
  users :any=[];
totalLength:any;
  page:number=1;

  constructor(private ActivatedRoute: ActivatedRoute,private usersService:UsersService) {}
  ngOnInit() {
  //  this.findTab=this.users;
    
   
    ////////dispaly :    a modifier gett all tutors find(role:tutor)
    this.usersService.getAllTutors().subscribe((response) => {
      this.users = response.users;
      //this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE

    });

    // this.findObj = this.users.find((obj) => {
    //   return obj.id == this.findId;
    // });
    // this.findTab.push(this.findObj);
    ///on a poucher l objet dans un tableau vide
    /////si on a un id dans puth
    ////on affiche un tableau contient que l obj
    /////on peut faire sa avec une methode: var bool=false et pui si on a id display false
    ///appel dans html avec *ngIf

    //alert(this.findId);
    /////njibou l obj l 3andou l id hetha
   
  }
  InfoOrAllDiv() {
    this.findId = this.ActivatedRoute.snapshot.paramMap.get("id");

    if (this.findId) {
      return true;
    }
    return false;
  }

  fnnn(){
    this.findId = this.ActivatedRoute.snapshot.paramMap.get("id");

    return this.findId ? 'col-lg-5' : 'col-lg-3';
  }
}
