import {Component, OnInit} from '@angular/core';
import {ApiDataService} from "./services/api_data.service";
import {User} from "./modals/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Training';

  constructor(private api: ApiDataService) {
  }

  showDetails: boolean = false;
  users: any;
  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    id: new FormControl('')
  });

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe((data) => {
      if (data) {
        this.users = data;
      }
    });
  }

  createUser() {
    this.userForm.patchValue({id: (this.users?.length + 1) || 1});
    this.users.push(new User(this.userForm.value));
    this.api.createUser(this.users[this.users.length - 1]);
    this.userForm.reset();
    this.userForm.patchValue({id: (this.users?.length + 1) || 1});
  }

  showHideDetails() {
    this.showDetails = !this.showDetails;
  }

  getSortedUsers() {
    return this.users?.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
  }
}
