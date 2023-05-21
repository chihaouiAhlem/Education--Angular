import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})
export class SearchEventComponent implements OnInit {
  searchForm:FormGroup;
  obj:any={};
  constructor(private router: Router) { }

  ngOnInit() {
  }
  searchEvent(){
    ///search et affichage ens une autre page
    //alert(this.obj);
    localStorage.setItem(("objectSearch"),JSON.stringify(this.obj));
    this.router.navigate(["searchEvent"]);




  }

}
