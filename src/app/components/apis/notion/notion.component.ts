import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notion',
  templateUrl: './notion.component.html',
  styleUrls: ['./notion.component.scss']
})
export class NotionComponent {
  constructor(private http: HttpClient) {}

  
  createConnection() {
    const data = {
      "name": "Notion connection",
      "source": "API",
      "type": "OAuth 2.0",
        "oauth2": {
        "client_id": "47365d8c-515d-4ebe-a5d6-2dc38e0ce9c3",
        "client_secret": "secret_zknVrrVC5KPYbktGjUxO1T4NTw6lIX1iL3ardCKKQcP",
        "auth_uri": "https://api.notion.com/v1/oauth/authorize",
        "token_uri": "https://api.notion.com/v1/oauth/token",
        "use_code_verifier": false
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
            console.log('Response from create notion connection');
            console.log(response);
        },
        (error) => console.log('Error while sending create notion connection: ', error)
      );
  };

  createImport(connectionId: string) {
    const data = {
      "name": "Notion import",
      "type": "Import",
      "source": "API",
      "idKey": "id",
      "request": {
        "method": "POST",
        "url": "https://api.notion.com/v1/databases/45863548df61474797b96653e7f38faa/query",
        "headers": {
          "Notion-Version": "2022-06-28"
        },
      },
      "transferMethod": "Cursor Pagination",
      "paginationOptions": {
        "placement": "Body",
        "cursorKey": "start_cursor",
        "cursorPath": "data.next_cursor",
        "limitKey": "page_size",
        "limitValue": 1000
      },
      "idPath": "id",
      "datasetsPath": "data.results",
      "limitRequestsPerSecond": 1,
      "retryOptions": {
        "maxAttempts": 3,
        "attemptTimeDelay": 1000
      },
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
    };
    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from notion import create');
            console.log(response.body);
          }
        },
        (error) => console.log('Error while sending notion create: ', error)
      );
  }

  setFields(importId: string) {
    let data = {
      "id": importId,
      "source": "API",
      "fields": [
        {
          "feature": {
            "name": "Index",
            "type": "number",
            "id": "1880162"
          },
          "source": "properties.Index.number"
        },
        {
          "feature": {
            "name": "Name",
            "type": "text",
            "id": "1880162"
          },
          "source": "properties.Name.rich_text[0].text.content"
        },
        {
          "feature": {
            "name": "Description",
            "type": "text",
            "id": "1880162"
          },
          "source": "properties.Description.rich_text[0].text.content"
        },
      ]
    };
    
    this.http.patch('http://localhost:3000/imports', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from notion setFields')
        console.log(response);
      },
      error => {
        console.log('Error while sending notion setFields: ', error);
      }
    );
  }
}
