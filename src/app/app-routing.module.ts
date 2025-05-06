import { Routes } from '@angular/router';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

export const routes: Routes = [
  { path: '', component: SummaryViewComponent },
  { path: 'detailed/:id', component: DetailedViewComponent },
  { path: '**', redirectTo: '' }
];
