import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PzAppComponent } from './app.component';
import { PzSearchComponent } from './search/search.component';
import { PzDashboardComponent } from './dashboard/dashboard.component';

import { PzSearchService } from './search/search.service';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule
      , FormsModule
      , HttpModule
      , routing
    ], declarations: [
        PzAppComponent
      , PzSearchComponent
      , PzDashboardComponent
    ], bootstrap: [PzAppComponent]
    , providers: [
      PzSearchService
    ]
})
export class PzAppModule { }
