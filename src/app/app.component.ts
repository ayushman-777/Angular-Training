import {Component, OnInit} from '@angular/core';
import {ApiDataService} from "./services/api-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Training';
  constructor(private data: ApiDataService) {
  }
  showSpinner: boolean = false;
  apiData: any;
  ngOnInit(): void {
    this.showSpinner = true;
    this.data.getPhotos().subscribe((data) => {
      this.apiData = data.hits;
      this.showSpinner = false;
    });
  //   setTimeout(() => {
  //     this.showSpinner = false;
  //   }, 5000);
  }
}
