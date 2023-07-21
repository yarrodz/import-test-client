import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/enums/action.enum';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})
export class ImportsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
   ) {}

  connect(importId: string) {
    const data = {
      id: importId
    };
    
    this.http.post('http://localhost:3000/imports/connect/', data, { withCredentials: true, observe: "response" }).subscribe(
      (response) => {
        if (response.status == 201) {
          window.location.href = response.body as string;
        } else {
          console.log('Response from connect');
          console.log(response.body);
        }
      },
      error => {
        console.log('Error while sending connect: ', error.message);
      }
    );
  }
  // secret_T8HwSIvRTRsLOB3OmkR2MzPvJSQOOn6qVliZbYmTbQc
  // 46b3e2f4-e62d-4887-9b8e-cbda8468d178
  // secret_ecVcteJKNbqs3Gyvbkotu59CZaHmqdKnfvnibp5xHzl
  // https://api.notion.com/v1/oauth/authorize?client_id=46b3e2f4-e62d-4887-9b8e-cbda8468d178&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-callback%2F
  // https://api.notion.com/v1/oauth/token

  start(importId: string) {
    const data = {
      "id": importId
    };
    
    this.http.post('http://localhost:3000/imports/start', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from start');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while sending start: ', error.message);
        }
      );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const { action, id } = params;
      
      if (action && id) {
        switch(action) {
          case Action.CONNECT: {
            this.connect(id)
            break;
          }
          case Action.START: {
            this.start(id)
            break;
          }
          default: 
            console.log('Unknown action');
        }
      }
    });
  }
}
