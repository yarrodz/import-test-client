import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airtable',
  templateUrl: './airtable.component.html',
  styleUrls: ['./airtable.component.scss']
})
export class AirtableComponent implements OnInit {
  constructor(private http: HttpClient) { }
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
        "datasetsCount": 96
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

  setFields(importId: string) {
    let data = {
      "id": importId,
      "fields": [
        {
          "feature": {
            "name": "name",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Name"
        },
        {
          "feature": {
            "name": "notes",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Notes"
        },
        {
          "feature": {
            "name": "status",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Status"
        },
      ]
    };
    
    this.http.post('http://localhost:3000/imports/setFields', data, { withCredentials: true }).subscribe(
      response => {
        console.log('setFields')
        console.log(response);
      },
      error => {
        console.log('Error while sending setFields: ', error.message);
      }
    );
  }

 
  ngOnInit(): void {
  }

}
