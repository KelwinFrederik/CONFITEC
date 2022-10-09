import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { AppComponentService } from './app.component.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule, AppComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
