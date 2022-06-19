import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {
  users:any;
isDisplayed:boolean=false;

  constructor(private router:Router) { }

  ngOnInit() {
    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user",this.users.role);
     if (this.users) {
         this.isDisplayed=true;
     }
    
  }

}
