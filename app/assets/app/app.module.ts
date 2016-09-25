import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PzAppComponent } from './app.component';
import { PzSearchComponent } from './search/search.component';
import { PzDashboardComponent } from './dashboard/dashboard.component';
import { PzDetailComponent } from './detail/detail.component';
import { PzTweetsComponent } from './tweets/tweets.component';
import { PzRandomComponent } from './dashboard/random/random.component';
import { PzCardComponent } from './card/card.component';

import { PzSearchService } from './search/search.service';
import { PzDetailService } from './detail/detail.service';

import { PzApiService } from './api/api.service';

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
      , PzDetailComponent
      , PzTweetsComponent
      , PzRandomComponent
      , PzCardComponent
    ], bootstrap: [PzAppComponent]
    , providers: [
        PzSearchService
      , PzDetailService
      , PzApiService
    ]
})
export class PzAppModule { }
