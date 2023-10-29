import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface FilterData {
  sort: { key: string; type: string };
  categories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = 'https://technical-frontend-api.bokokode.com/api/products';

  constructor(private http: HttpClient) {}

  postPagination(page: number, productsPerPage: number): Observable<any> {
    const postData = {
      page: page.toString(),
      per_page: productsPerPage.toString(),
    };
    return this.http.post(
      `https://technical-frontend-api.bokokode.com/api/products?page=${page}`,
      postData
    );
  }

  public postData(filterData: FilterData | {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(
      'https://technical-frontend-api.bokokode.com/api/products',
      filterData,
      httpOptions
    );
  }
}
