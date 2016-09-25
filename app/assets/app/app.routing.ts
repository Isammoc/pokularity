import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PzDashboardComponent } from './dashboard/dashboard.component';
import { PzDetailComponent } from './detail/detail.component';

const appRoutes: Routes = [
  {
      path: 'dashboard'
    , component: PzDashboardComponent
  }, {
    path: 'pokemon/:name',
    component: PzDetailComponent
  }, {
      path: ''
    , redirectTo: '/dashboard'
    , pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
