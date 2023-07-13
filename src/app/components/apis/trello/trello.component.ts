import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.scss']
})
export class TrelloComponent implements OnInit {
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
          "url": "https://api.trello.com/1/boards/iiq7jiPl/cards",
          "params": {
            "key": "c624d99c9e6809c6195c946431e64ec5",
            "token": "ATTAbb2d82a9f59a804b7ba1680dedf609ee34a489fff5090e0f702074df093434edD91A9C25"
          },
          "responsePath": "data",
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
