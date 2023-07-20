import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ImportsComponent } from './components/imports/imports.component';
import { ProcessesComponent } from './components/processes/processes.component';
import { NotionComponent } from './components/apis/notion/notion.component';
import { AirtableComponent } from './components/apis/airtable/airtable.component';
import { TrelloComponent } from './components/apis/trello/trello.component';
import { PostgresComponent } from './components/apis/postgres/postgres.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportsComponent,
    ProcessesComponent,
    NotionComponent,
    AirtableComponent,
    TrelloComponent,
    PostgresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
