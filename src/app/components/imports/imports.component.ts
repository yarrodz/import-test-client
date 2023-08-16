import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/enums/action.enum';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})
export class ImportsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
   ) {}

  getColumns(importId: string) {
    const data = {
      id: importId
    };
    
    this.http.post('http://localhost:3000/imports/columns/', data, { withCredentials: true, observe: "response" }).subscribe(
      (response) => {
        if (response.status == 201) {
          window.location.href = response.body as string;
        } else {
          console.log('Response from getting columns');
          console.log(response.body);
        }
      },
      error => {
        console.log('Error while getting columns: ', error.message);
      }
    );
  }

  import(importId: string) {
    const data = {
      "id": importId
    };
    
    this.http.post('http://localhost:3000/imports/import', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from starting import');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while starting import: ', error.message);
        }
      );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const { action, id, errorMessage } = params;
      
      if (action !== undefined && id !== undefined) {
        switch(action) {
          case Action.GET_COLUMNS: {
            this.getColumns(id)
            break;
          }
          case Action.IMPORT: {
            this.import(id)
            break;
          }
          default: 
            console.log(`Unknown action: ${action}`);
            break;
        }
      }

      if (errorMessage !== undefined) {
        alert(errorMessage);
      }
    });
  }
}
