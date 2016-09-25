import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PzDashboardComponent } from './dashboard/dashboard.component';
import { PzDetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  {
      path: 'dashboard'
    , component: PzDashboardComponent
  }, {
    path: 'pokemon/:name',
    component: PzDetailsComponent
  }, {
      path: ''
    , redirectTo: '/dashboard'
    , pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
