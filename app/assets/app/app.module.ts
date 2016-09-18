import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PzAppComponent } from './app.component';
import { PzSearchComponent } from './search/search.component';

import { PzSearchService } from './search/search.service';

@NgModule({
    imports: [
      BrowserModule
      , FormsModule
      , HttpModule
    ], declarations: [
      PzAppComponent
      , PzSearchComponent
    ], bootstrap: [PzAppComponent]
    , providers: [
      PzSearchService
    ]
})
export class PzAppModule { }
