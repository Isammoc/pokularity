import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { PzAppComponent } from './app.component';

@NgModule({
    imports: [
      BrowserModule
      , FormsModule
    ],
    declarations: [PzAppComponent],
    bootstrap: [PzAppComponent],
    providers: []
})
export class PzAppModule { }
