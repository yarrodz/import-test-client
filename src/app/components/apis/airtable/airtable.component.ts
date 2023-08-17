import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-airtable',
  templateUrl: './airtable.component.html',
  styleUrls: ['./airtable.component.scss']
})
export class AirtableComponent {
  constructor(private http: HttpClient) {}

  createConnection() {
    const data = {
      "name": "Airtale connection",
      "source": "API",
      "type": "OAuth 2.0",
        "oauth2": {
          "client_id": "3b4f65dc-fb59-49e0-b8d6-28a45364b617",
          "scope": "data.records:read",
          "auth_uri": "https://airtable.com/oauth2/v1/authorize",
          "token_uri": "https://www.airtable.com/oauth2/v1/token",
          "use_code_verifier": true
        },
        "__": {
          "inUnit": {
              "id": 1880374,
              "_d": "out"
          }
      }
    };
    this.http.post('http://localhost:3000/connections/', data, { withCredentials: true })
      .subscribe(
        (response) => {
            console.log('Response from create airtable connection');
            console.log(response);
        },
        (error) => console.log('Error while create airtable connection: ', error)
      );
  };


  createImport(connectionId: string) {
    const data = {
      "name": "Airtable import",
      "type": "Import",
      "source": "API",
      "idKey": "fields.Organization_Id",
      "limitRequestsPerSecond": 1,
      "retryOptions": {
          "maxAttempts": 3,
          "attemptTimeDelay": 1000
      },
      "request": {
        "method": "GET",
        "url": "https://api.airtable.com/v0/app21mGIM0s2BEm27/tbl3y4w8RsZO2mhbu"
      },
      "transferMethod": "Cursor Pagination",
      "paginationOptions": {
        "placement": "Query Parameters",
        "cursorKey": "offset",
        "cursorPath": "data.offset",
        "limitKey": "maxRecords",
        "limitValue": 1000
      },
      "datasetsPath": "data.records",
      "idPath": "fields.Organization_Id",
      "__": {
        "inUnit": {
            "id": 1880374,
            "_d": "out"
        },
        "hasConnection": {
            "id": Number(connectionId),
            "_d": "out"
        }
    },
   }
      

  this.http.post('http://localhost:3000/imports/', data, { withCredentials: true })
      .subscribe(
        (response) => {
            console.log('Response from airtable import create');
            console.log(response);
        },
        (error) => console.log('Error while airtable import create: ', error)
      );
  }

  setFields(importId: string) {
    let data = {
      "id": importId,
      "source": 'API',
      "fields": [
        {
          "feature": {
            "name": "Organization_Id",
            "type": "text",
            "id": "1880162"
          },
          "source": "fields.Organization_Id"
        },  
        { 
          "feature": {
            "name": "Name",
            "type": "text",
            "id": "1880162"
          },
          "source": "fields.Name"
        },
        {
          "feature": {
            "name": "Description",
            "type": "text",
            "id": "1880162"
          },
          "source": "fields.Description"
        },
      ]
    };
    
    this.http.patch('http://localhost:3000/imports/', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from airtable setFields')
        console.log(response);
      },
      error => {
        console.log('Error while airtable setFields: ', error);
      }
    );
  }
}
