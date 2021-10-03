import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { TemperatureConvertPipe } from './pipes/temperature-convert.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { CloudsVerbalPipe } from './pipes/clouds-verbal.pipe';
import { SpeedConvertPipe } from './pipes/speed-convert.pipe';
import { FooterComponent } from './footer/footer.component';
import { CompassComponent } from './compass/compass.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherItemComponent,
    TemperatureConvertPipe,
    RoundNumberPipe,
    CloudsVerbalPipe,
    SpeedConvertPipe,
    FooterComponent,
    CompassComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
