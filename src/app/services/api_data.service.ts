import {Injectable} from "@angular/core";
import {User} from "../modals/user";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
    url: string = "https://learing-angular-default-rtdb.firebaseio.com/";

    constructor(private http: HttpClient) { }

    createUser(user: User): void {
        this.http.post(this.url + "users.json", user).subscribe((data: any) => {
            console.log('Unique Id: ' + data.name);
        });
    }
    getUsers(): Observable<any> {
        return this.http.get(this.url + "users.json").pipe(map((data: any) => {
          var users: any[] = [];
          for (let key in data) {
            this.http.get(this.url + "users/" + key + ".json").subscribe((data: any) => {
              users.push(data);
            });
          }
          return users;
        }));
    }

}
