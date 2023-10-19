import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = "https://technical-frontend-api.bokokode.com/api/products/";

  constructor(private http: HttpClient) { }

  // public getData () : Observable<any> {
  //   return this.http.get<any>(this.URL);
  // }

  public postData(): Observable<any> {
    const body = {
      sort: {
        key: "price",
        type: "ASC"
      },
      categories: [
        "people", "food", "landmarks", "pets", "premium", "cities", "nature"
      ]
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.URL, body, httpOptions);
  }
}
