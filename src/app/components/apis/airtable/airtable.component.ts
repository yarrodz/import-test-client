import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-airtable',
  templateUrl: './airtable.component.html',
  styleUrls: ['./airtable.component.scss']
})
export class AirtableComponent {
  constructor(private http: HttpClient) {}

  create() {
    const data = {
      "unit": "64835bd65cafe862fc0d323a",
      "source": "API",
      "api": {
        "method": "GET",
        "url": "https://api.airtable.com/v0/app21mGIM0s2BEm27/tbl3y4w8RsZO2mhbu",
        "responseType": "JSON",
        "datasetsPath": "data.records",
        "transferType": "Cursor Pagination",
        "paginationOptions": {
          "placement": "Query Parameters",
          "cursorParameterPath": "data.offset",
          "cursorParameter": "offset",
          "limitParameter": "maxRecords",
          "limitValue": 1000
        },
        "auth": {
          "type": "OAuth 2.0",
          "oauth2": {
            "client_id": "3b4f65dc-fb59-49e0-b8d6-28a45364b617",
            "scope": "data.records:read",
            "auth_uri": "https://airtable.com/oauth2/v1/authorize",
            "token_uri": "https://www.airtable.com/oauth2/v1/token",
            "use_code_verifier": true
          },
        }
      },
      "idColumn": "fields.Organization_Id",
      "limitRequestsPerSecond": 1,
      "datasetsCount": 1000
    };

    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from airtable create');
            console.log(response.body);
          }
        },
        (error) => console.log('Error while sending airtable create: ', error.message)
      );
  }

  setFields(importId: string) {
    let data = {
      "id": importId,
      "fields": [
        {
          "feature": {
            "name": "Organization_Id",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Organization_Id"
        },
        {
          "feature": {
            "name": "Name",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Name"
        },
        {
          "feature": {
            "name": "Description",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "fields.Description"
        },
      ]
    };
    
    this.http.post('http://localhost:3000/imports/setFields', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from airtable setFields')
        console.log(response);
      },
      error => {
        console.log('Error while sending airtable  setFields: ', error);
      }
    );
  }
}
