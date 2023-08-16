import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportsComponent } from './components/imports/imports.component';
import { TransfersComponent } from './components/transfers/transfers.component';

const routes: Routes = [
  { path: '', redirectTo: 'imports', pathMatch: 'full' },
  { path: 'imports', component: ImportsComponent },
  { path: 'imports/:action/:id', component: ImportsComponent },
  { path: 'imports/:errorMessage', component: ImportsComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'transfers/:action/:id', component: TransfersComponent },
  { path: 'transfers/:errorMessage', component: TransfersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
