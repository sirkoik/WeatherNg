import { ModeState } from './ModeState';
import { UnitsState } from './UnitsState';
import { WeatherData } from './WeatherData';
import { WeatherLocation } from './WeatherLocation';

export interface WeatherState {
  unitsReducer: UnitsState;
  modeReducer: ModeState;
  locationReducer: WeatherLocation;
  weatherReducer: WeatherData;
}
