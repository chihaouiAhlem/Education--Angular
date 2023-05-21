import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
// Inject the main list of objects as an input to this component
@Input() objects: Object[];

// Output an event when the language selection changes, passing the selected value
@Output() languageChanged = new EventEmitter<string>();

// Handle the language selection change event
onLanguageChange(language: string) {
// Emit the selected language value to the main component
this.languageChanged.emit(language);
}
}
