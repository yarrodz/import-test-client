import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notion',
  templateUrl: './notion.component.html',
  styleUrls: ['./notion.component.scss']
})
export class NotionComponent {
  constructor(private http: HttpClient) {}

  create() {
    const data = {
      "unit": "64835bd65cafe862fc0d323a",
      "source": "API",
      "api": {
          "method": "POST",
          "url": "https://api.notion.com/v1/databases/45863548df61474797b96653e7f38faa/query",
          "headers": {
            "Notion-Version": "2022-06-28"
          },
          "datasetsPath": "data.results",
          "transferType": "Cursor Pagination",
          "paginationOptions": {
            "placement": "Body",
            "cursorParameterPath": "data.next_cursor",
            "cursorParameter": "start_cursor",
            "limitParameter": "page_size",
            "limitValue": 1000
          },
          "responseType": "JSON",
          "auth": {
            "type": "OAuth 2.0",
            "oauth2": {
              "client_id": "47365d8c-515d-4ebe-a5d6-2dc38e0ce9c3",
              "client_secret": "secret_zknVrrVC5KPYbktGjUxO1T4NTw6lIX1iL3ardCKKQcP",
              "auth_uri": "https://api.notion.com/v1/oauth/authorize",
              "token_uri": "https://api.notion.com/v1/oauth/token",
              "use_code_verifier": false
            }
          }
        },
        "idColumn": "id",
        "limitRequestsPerSecond": 1,
        "datasetsCount": 1000
    };
    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from notion create');
            console.log(response.body);
          }
        },
        (error) => console.log('Error while sending notion create: ', error)
      );
  }

  setFields(importId: string) {
    let data = {
      "id": importId,
      "fields": [
        {
          "feature": {
            "name": "Index",
            "type": "number",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "properties.Index.number"
        },
        {
          "feature": {
            "name": "Name",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "properties.Name.rich_text[0].text.content"
        },
        {
          "feature": {
            "name": "Description",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "properties.Description.rich_text[0].text.content"
        },
      ]
    };
    
    this.http.post('http://localhost:3000/imports/setFields', data, { withCredentials: true }).subscribe(
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
