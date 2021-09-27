import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { TemperatureConvertPipe } from './pipes/temperature-convert.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherItemComponent,
    TemperatureConvertPipe,
    RoundNumberPipe
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
