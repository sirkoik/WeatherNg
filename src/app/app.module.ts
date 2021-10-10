import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { TemperatureConvertPipe } from './pipes/temperature-convert.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { CloudsVerbalPipe } from './pipes/clouds-verbal.pipe';
import { SpeedConvertPipe } from './pipes/speed-convert.pipe';
import { FooterComponent } from './ui/footer/footer.component';
import { CompassComponent } from './components/compass/compass.component';
import { MenuComponent } from './ui/menu/menu.component';
import { UviComponent } from './components/uvi/uvi.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { WindComponent } from './components/wind/wind.component';
import { HumidityComponent } from './components/humidity/humidity.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { SunComponent } from './components/sun/sun.component';
import { TimespanPipe } from './pipes/timespan.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherItemComponent,
    TemperatureConvertPipe,
    RoundNumberPipe,
    CloudsVerbalPipe,
    SpeedConvertPipe,
    FooterComponent,
    CompassComponent,
    MenuComponent,
    UviComponent,
    TemperatureComponent,
    WindComponent,
    HumidityComponent,
    ConditionsComponent,
    CloudsComponent,
    SunComponent,
    TimespanPipe
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
