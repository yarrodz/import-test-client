import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notion',
  templateUrl: './notion.component.html',
  styleUrls: ['./notion.component.scss']
})
export class NotionComponent implements OnInit {

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
          "url": "https://api.notion.com/v1/databases/483dfa9aecbb4255963d63065d43f9be/query",
          "headers": {
            "Notion-Version": "2022-06-28"
          },
          "responsePath": "data.results",
          "auth": {
            "type": "OAuth 2.0",
            "oauth2": {
              "client_id": "46b3e2f4-e62d-4887-9b8e-cbda8468d178",
              "client_secret": "secret_ecVcteJKNbqs3Gyvbkotu59CZaHmqdKnfvnibp5xHzl",
              "auth_uri": "https://api.notion.com/v1/oauth/authorize",
              "token_uri": "https://api.notion.com/v1/oauth/token",
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
  // secret_T8HwSIvRTRsLOB3OmkR2MzPvJSQOOn6qVliZbYmTbQc
  // 46b3e2f4-e62d-4887-9b8e-cbda8468d178
  // secret_ecVcteJKNbqs3Gyvbkotu59CZaHmqdKnfvnibp5xHzl
  // https://api.notion.com/v1/oauth/authorize?client_id=46b3e2f4-e62d-4887-9b8e-cbda8468d178&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-callback%2F
  // https://api.notion.com/v1/oauth/token
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
          "source": "properties.Name.title.0.text.content"
        },
      ]
    };
    
    // c624d99c9e6809c6195c946431e64ec5
    // c624d99c9e6809c6195c946431e64ec5
    // c45f90c6ac63580bc2a85f8bff642b279ec6c505e0f2d324a968f073d2735845
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
