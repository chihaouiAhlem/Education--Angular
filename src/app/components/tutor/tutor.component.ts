import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
@Input() T:any;//decorateur qui permet de passer date de parent(tutors) vers child(tutor)
  constructor() { }

  ngOnInit() {
  }

}
