import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/enums/action.enum';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
   ) {}

  pause(processId: string) {
    const data = {
      id: processId
    };
    
    this.http.post('http://localhost:3000/import-processes/pause/', data, { withCredentials: true }).subscribe(
      response => {
        console.log('pause')
        console.log(response);
      },
      error => {
        console.log('Error while sending pause: ', error.message);
      }
    );
  }

  reload(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/import-processes/reload', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from reload');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while sending reload: ', error.message);
        }
      );
  }

  retry(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/import-processes/retry', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from retry');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while sending retry: ', error.message);
        }
      );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const { action, id } = params;
      if (action && id) {
        switch(action) {
          case Action.RELOAD: {
            this.reload(id)
            break;
          }
          case Action.START: {
            this.retry(id)
            break;
          }
          default: 
            console.log('Unknown action');
        }
      }
    });
  }
}
