import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postgres',
  templateUrl: './postgres.component.html',
  styleUrls: ['./postgres.component.scss']
})
export class PostgresComponent implements OnInit {

  constructor(
    private http: HttpClient
   ) {}

  create() {
    const data = {
      "unit": "646cd1accef0e54e78f8aec0",
      "source": "SQL",
      "sql": {
        "dialect": "PostgreSQL",
        "connection": {
          "host": "snuffleupagus.db.elephantsql.com",
          "port": 5432,
          "username": "xbjpfeyi",
          "password": "YDLqCtSmFNp_MEdcMW6Kd12Fv7BUDbhZ",
          "database": "xbjpfeyi"
        },
        "target": "Select",
        "select": "SELECT * FROM operations ORDER BY {{id}} LIMIT {{limit}} OFFSET {{offset}}",
        "limit": 100
      },
      "limitRequestsPerSecond": 1,
      "idColumn": "id",
      "datasetsCount": 2750
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
            "name": "number",
            "type": "number",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "id"
        },
        {
          "feature": {
            "name": "name",
            "type": "text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "name"
        },
        {
          "feature": {
            "name": "long-text",
            "type": "long-text",
            "_id": "64835bd65cafe862fc0d323a"
          },
          "source": "name"
        },
        {
          "feature": {
            "name": "time",
            "type": "time",
            "_id": "64835bd65cafe862fc0d323b"
          },
          "source": "time"
        },
        {
          "feature": {
            "name": "date",
            "type": "date",
            "_id": "64835bd65cafe862fc0d323b"
          },
          "source": "date"
        },
        {
          "feature": {
            "name": "datetime",
            "type": "datetime",
            "_id": "64835bd65cafe862fc0d323b"
          },
          "source": "datetime"
        }
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
