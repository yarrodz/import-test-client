import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postgres',
  templateUrl: './postgres.component.html',
  styleUrls: ['./postgres.component.scss']
})
export class PostgresComponent implements OnInit {

  constructor(private http: HttpClient) {}

   createConnection() {
    const data = {
      "name": "Postgres connection",
      "source": "SQL",
      "config": {
          "dialect": "PostgreSQL",
          "host": "snuffleupagus.db.elephantsql.com",
          "port": 5432,
          "username": "xbjpfeyi",
          "password": "YDLqCtSmFNp_MEdcMW6Kd12Fv7BUDbhZ",
          "database": "xbjpfeyi"
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
            console.log('Response from create postres connection');
            console.log(response);
        },
        (error) => console.log('Error while sending create postres connection: ', error.message)
      );
  };


  createImport(connectionId: string) {
    const data = {
      "name": "postgres select",
      "type": "Import",
      "source": "SQL",
      "idKey": "id",
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
      "target": "Select",
      "select": "SELECT * FROM operations ORDER BY {{id}} LIMIT {{limit}} OFFSET {{offset}}",
      "limit": 100
    };

    this.http.post('http://localhost:3000/imports/', data, { withCredentials: true })
      .subscribe(
        (response) => {
            console.log('Response from create postgres import');
            console.log(response);
        },
        (error) => console.log('Error while create postgres import: ', error.message)
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
            "id": "1880162"
          },
          "source": "id"
        },
        {
          "feature": {
            "name": "name",
            "type": "text",
            "id": "1880162"
          },
          "source": "name"
        },
        {
          "feature": {
            "name": "long-text",
            "type": "long-text",
            "id": "1880162"
          },
          "source": "name"
        },
        {
          "feature": {
            "name": "time",
            "type": "time",
            "id": "1880162"
          },
          "source": "time"
        },
        {
          "feature": {
            "name": "date",
            "type": "date",
            "id": "1880162"
          },
          "source": "date"
        },
        {
          "feature": {
            "name": "datetime",
            "type": "datetime",
            "id": "1880162"
          },
          "source": "datetime"
        }
      ]
    };
    
    this.http.patch('http://localhost:3000/imports', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from set postgres import fields')
        console.log(response);
      },
      error => {
        console.log('Error while postgres set postgres import fields: ', error.message);
      }
    );
  }

  ngOnInit(): void {}
}
