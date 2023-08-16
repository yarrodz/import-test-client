import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/enums/action.enum';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
   ) {}

  pause(processId: string) {
    const data = {
      id: processId
    };
    
    this.http.post('http://localhost:3000/transfers/pause/', data, { withCredentials: true }).subscribe(
      response => {
        console.log('Response from transer pause')
        console.log(response);
      },
      error => {
        console.log('Error while transfer pause: ', error);
      }
    );
  }

  reload(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/transfers/reload', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from transer reload');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while transfer reload: ', error);
        }
      );
  }

  retry(processId: string) {
    const data = {
      "id": processId
    };
    
    this.http.post('http://localhost:3000/transfers/retry', data, { withCredentials: true, observe: "response" })
      .subscribe(
        (response) => {
          if (response.status == 201) {
            window.location.href = response.body as string;
          } else {
            console.log('Response from transfer retry');
            console.log(response.body);
          }
        },
        error => {
          console.log('Error while transfer retry: ', error);
        }
      );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const { action, id, errorMessage } = params;

      if (action !== undefined && id !== undefined) {
        switch(action) {
          case Action.RELOAD: {
            this.reload(id)
            break;
          }
          case Action.RETRY: {
            this.retry(id)
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
