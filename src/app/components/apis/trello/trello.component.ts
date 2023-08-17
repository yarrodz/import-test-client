import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.scss']
})
export class TrelloComponent {
  constructor(private http: HttpClient) {}

  createConnection() {
    const data = {
      "name": "Trello connection",
      "source": "API",
      "type": "API key",
      "apiKey": {
        "key": "key",
        "value": "ebc3526076b99ca3717178e4b9313ae4",
        "placement": "Query Parameters"
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
            console.log('Response from trello connection');
            console.log(response);
        },
        (error) => console.log('Error while create trello connection: ', error)
      );
  };

  createImport(connectionId: string) {
      const data = {
        "name": "Trello import",
        "type": "Import",
        "source": "API",
        "idKey": "id",
        "request": {
          "method": "GET",
          "url": "https://api.trello.com/1/boards/l0jljshi/cards",
          "params": {
            "token": "ATTA0e4ed4bb5efca8b517b44f2d7316cc56ec437062637ec233bb814be8aed562008C86493C",
            "limit": 500
          },
        },
        "transferMethod": "Chunk",
        "idPath": "id",
        "datasetsPath": "data",
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

    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true })
      .subscribe(
        (response) => {
            console.log('Response from trello import create');
            console.log(response);
        },
        (error) => console.log('Error while trello import create: ', error)
      );
    }

  setFields(importId: string) {
    let data = {
      "id": importId,
        "source": "API",
        "fields": [
        {
          "feature": {
            "name": "name",
            "type": "text",
            "id": "1880162"
          },
          "source": "name"
        },
      ]
    };
    
    this.http.patch('http://localhost:3000/imports/', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from trello setFields')
        console.log(response);
      },
      error => {
        console.log('Error while trello setFields: ', error);
      }
    );
  }
}
