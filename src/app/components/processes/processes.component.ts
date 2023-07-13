import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/enums/action.enum';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {
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
          "method": "GET",
          "url": "https://api.airtable.com/v0/apprK7nZPyUs8NYPp/tblnUkpnYHhfresQn",
          "responsePath": "data.records",
          "auth": {
            "type": "OAuth 2.0",
            "oauth2": {
              "client_id": "901cdb99-7ab8-4b98-9b53-71ed73d05606",
              "scope": "data.records:read",
              "auth_uri": "https://airtable.com/oauth2/v1/authorize",
              "token_uri": "https://www.airtable.com/oauth2/v1/token",
              "use_code_verifier": true
            }
          }
        },
        "transferType": "Chunk",
        "idColumn": "id",
        "limitPerSecond": 4,
        "datasetsCount": 550
      }
    };

    // https://www.notion.so/b5a20101f85d435a8c73cfeaf9abfe25?v=cc5f228dd5314f12bc59f8806fc569b3&pvs=4
    // https://www.notion.so/cdc4ad432e734df590f542193cf90abc?v=8ecee50b82454196bdf008daeb6628d7&pvs=4
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

  pause(processId: string) {
    const data = {
      id: processId
    };
    
    this.http.post('http://localhost:3000/import-processes/pause/', data, { withCredentials: true }).subscribe(
      response => {
        console.log('pause')
        console.log(response);
      },
      error => {
        console.log('Error while sending pause: ', error.message);
      }
    );
  }

  reload(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/import-processes/reload', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from reload');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while sending reload: ', error.message);
        }
      );
  }

  retry(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/import-processes/retry', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from retry');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while sending retry: ', error.message);
        }
      );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const { action, id } = params;
      if (action && id) {
        switch(action) {
          case Action.RELOAD: {
            console.log('connect dd')
            this.reload(id)
            break;
          }
          case Action.START: {
            console.log('start dd');
            this.retry(id)
            break;
          }
          default: 
            console.log('Unknown action');
        }
      }
    });
  }
}
