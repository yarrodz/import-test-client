import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-sheets',
  templateUrl: './google-sheets.component.html',
  styleUrls: ['./google-sheets.component.scss']
})
export class GoogleSheetsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
   ) {}

  create() {
    const data = {
      "unit": "64835bd65cafe862fc0d323a",
      "source": "API",
      "api": {
        "request": {
          "method": "POST",
          "url": "https://sheets.googleapis.com/v4/spreadsheets/17u-WQtUHCcsUVhWdK8Vzj3cI7On4e3fRn3_R1cvb5dM/values/A1:Z",
          "responsePath": "data",
          "auth": {
            "type": "OAuth 2.0",
            "oauth2": {
              "client_id": "300374312324-f4gfm18rti9vrb91vofpod2if1s5nre4.apps.googleusercontent.com",
              "client_secret": "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",
              "auth_uri": "https://accounts.google.com/o/oauth2/v2/auth",
              "token_uri": "https://oauth2.googleapis.com/token",
              "scope": "https://www.googleapis.com/auth/userinfo.profile",
              "use_code_verifier": false
            }
          }
        },
        "transferType": "Chunk",
        "idColumn": "id",
        "limitPerSecond": 4,
        "datasetsCount": 4
      }
    };

    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from create');
            console.log(response.body);
          }
        },
        (error) => console.log('Error while sending create: ', error.message)
      );
  }

  ngOnInit(): void {
  }
}
