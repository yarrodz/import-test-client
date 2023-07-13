import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private http: HttpClient
  ) {}

  setSession() {
    this.http.post('http://localhost:3000/set-session/', {}, { withCredentials: true, responseType: 'text' }).subscribe((response) => { console.log(response); }, (error) => { console.log(error); });
  }

  getSession() {
    this.http.get('http://localhost:3000/get-session/', { withCredentials: true, responseType: 'text' }).subscribe((response) => { console.log(JSON.stringify(response)); }, (error) => { console.log(error); });
  }

}
