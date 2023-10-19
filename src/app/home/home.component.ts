import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // data: any[] = [];
  response: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.llenarData();
    this.realizarPost();
  }

  // llenarData() {
  //   this.apiService.getData().subscribe( (data: any )=> {
  //     this.data = Object.values(data);
  //     console.log(this.data);
  //   });
  // }

  realizarPost() {
    this.apiService.postData().subscribe((response: any) => {
      this.response = Object.values(response.data.data)
      console.log('Respuesta POST:', response.data.data);
    });
  }
}


