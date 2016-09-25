import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PzAppComponent } from './app.component';
import { PzSearchComponent } from './search/search.component';
import { PzDashboardComponent } from './dashboard/dashboard.component';
import { PzDetailsComponent } from './details/pokemon-details.component';
import { PzTweetsComponent } from './tweets/tweets.component';
import { PzRandomComponent } from './dashboard/random/random.component';
import { PzCardComponent } from './cards/pokemon-card.component';

import { PzSearchService } from './search/search.service';
import { PzDetailsService } from './details/pokemon-details.service';
import { PzTypesService } from './types/pokemon-types.service';

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
      , PzDetailsComponent
      , PzTweetsComponent
      , PzRandomComponent
      , PzCardComponent
    ], bootstrap: [PzAppComponent]
    , providers: [
        PzSearchService
      , PzDetailsService
      , PzTypesService
      , PzApiService
    ]
})
export class PzAppModule { }
