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
    this.users = [];
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe((data) => {
      if (data) {
        this.users = data;
      }
    });
  }

  generateId() {
    return Math.max(...this.users.map((o: any) => o.value.id)) + 1;
  }

  createUser() {
    this.userForm.disable();
    this.userForm.patchValue({id: this.users?.length === 0 ? "1" : this.generateId().toString()});
    let user = new User(this.userForm.value);
    this.api.createUser(user).subscribe((data: any) => {
      console.log('Unique Id: ' + data.name);
      this.users.push({key: data.name, value: user});
      this.userForm.reset();
      this.userForm.enable();
    });
  }

  showHideDetails() {
    this.showDetails = !this.showDetails;
  }

  getSortedUsers() {
    return this.users?.sort((a: any, b: any) => a.value.id - b.value.id);
  }

  deleteUser(userId: any) {
    this.api.deleteUsers(userId).subscribe(() => {
      console.log('User deleted successfully');
      this.users = this.users.filter((user: any) => user.key !== userId);
    });
  }
}
