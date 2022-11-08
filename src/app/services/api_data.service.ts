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

    createUser(user: User) {
        return this.http.post(this.url + "users.json", user);
    }
    getUsers(): Observable<any> {
        return this.http.get(this.url + "users.json").pipe(map((data: any) => {
          if (data) {
            let result = [];
            for (let user in data) {
              result.push({key: user, value: data[user]});
            }
            return  result;
          }
          return data;
        }));
    }
  deleteUsers(id: string) {
    return this.http.delete(this.url + "users/" + id + ".json");
  }
}
