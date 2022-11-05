import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {ApiDataService} from "./services/api-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Training';
  showSpinner: boolean = false;
  apiData: any;
  ngOnInit(): void {
    this.showSpinner = true;
    this.data.getPhotos().subscribe((data) => {
      this.apiData = data.hits;
      this.showSpinner = false;
    });
  //   setTimeout(() => {
  //     this.spinnerShow = false;
  //   }, 5000);
  }
  constructor(private data: ApiDataService) {
  }
}
