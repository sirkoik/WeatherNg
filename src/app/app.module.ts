import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { TemperatureConvertPipe } from './pipes/temperature-convert.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { CloudsVerbalPipe } from './pipes/clouds-verbal.pipe';
import { SpeedConvertPipe } from './pipes/speed-convert.pipe';
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
import { MoonComponent } from './components/moon/moon.component';
import { RefreshIndicatorComponent } from './ui/refresh-indicator/refresh-indicator.component';
import { StoreModule } from '@ngrx/store';
import { unitsReducer } from './store/units.reducer';
import { modeReducer } from './store/mode.reducer';
import { OverlayComponent } from './ui/overlay/overlay.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AboutComponent } from './ui/about/about.component';
import { SimpleLinkComponent } from './components/shared/simple-link/simple-link.component';
import { locationReducer } from './store/location.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from './store/location.effects';
import { weatherReducer } from './store/weather.reducer';
import { WeatherEffects } from './store/weather.effects';

@NgModule({
  declarations: [
    AppComponent,
    WeatherItemComponent,
    TemperatureConvertPipe,
    RoundNumberPipe,
    CloudsVerbalPipe,
    SpeedConvertPipe,
    CompassComponent,
    MenuComponent,
    UviComponent,
    TemperatureComponent,
    WindComponent,
    HumidityComponent,
    ConditionsComponent,
    CloudsComponent,
    SunComponent,
    TimespanPipe,
    MoonComponent,
    RefreshIndicatorComponent,
    OverlayComponent,
    LoadingSpinnerComponent,
    AboutComponent,
    SimpleLinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        unitsReducer: unitsReducer,
        modeReducer: modeReducer,
        locationReducer: locationReducer,
        weatherReducer: weatherReducer
      },
      {}
    ),
    EffectsModule.forRoot([LocationEffects, WeatherEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

export { WeatherState } from './types/WeatherState';
