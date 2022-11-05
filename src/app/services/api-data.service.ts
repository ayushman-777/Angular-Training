import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  url: string = "https://pixabay.com/api/?key=18454687-fa0fc023835bd9e0777b0e8d7&q=ocean&image_type=photo&pretty=true";
  constructor(private http: HttpClient) {
  }

  getPhotos(): Observable<any> {
    return this.http.get(this.url);
  }

}
