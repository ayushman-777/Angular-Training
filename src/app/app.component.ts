import {Component, OnInit} from '@angular/core';
import {ApiDataService} from "./services/api-data.service";
import {tap} from "rxjs";

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
  users$: any;
  ngOnInit(): void {
    this.showSpinner = true;
    this.users$ = this.data.getPhotos().pipe(tap(() => this.showSpinner = false));
  }
}
