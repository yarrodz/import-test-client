import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.scss']
})
export class TrelloComponent {
  constructor(private http: HttpClient) {}

  create() {
    const data = {
      "unit": "64835bd65cafe862fc0d323a",
      "source": "API",
      "api": {
          "method": "GET",
          "url": "https://api.trello.com/1/boards/l0jljshi/cards",
          "responseType": "JSON",
          "datasetsPath": "data",
          "auth": {
            "type": "API key",
            "apiKey": {
              "key": "key",
              "value": "ebc3526076b99ca3717178e4b9313ae4",
              "placement": "Query Parameters"
            }
          },
          "transferType": "Chunk",
          "params": {
            "token": "ATTA0e4ed4bb5efca8b517b44f2d7316cc56ec437062637ec233bb814be8aed562008C86493C",
            "limit": 500
          },
      },
      "idColumn": "id",
      "limitRequestsPerSecond": 1,
      "datasetsCount": 500
    };

    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from trello create');
            console.log(response.body);
          }
        },
        (error) => console.log('Error while sending trello create: ', error.message)
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
          "source": "name"
        },
      ]
    };
    
    this.http.post('http://localhost:3000/imports/setFields', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from trello setFields')
        console.log(response);
      },
      error => {
        console.log('Error while sending trello setFields: ', error.message);
      }
    );
  }
}
