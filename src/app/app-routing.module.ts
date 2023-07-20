import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportsComponent } from './components/imports/imports.component';
import { ProcessesComponent } from './components/processes/processes.component';

const routes: Routes = [
  { path: '', redirectTo: 'imports', pathMatch: 'full' },
  { path: 'imports', component: ImportsComponent },
  { path: 'imports/:action/:id', component: ImportsComponent },
  { path: 'processes', component: ProcessesComponent },
  { path: 'processes/:action/:id', component: ProcessesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
