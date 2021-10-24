import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../types/WeatherData';

export const fetchWeather = createAction('[Weather] Fetch weather');

export const loadWeather = createAction(
  '[Weather] Load weather',
  props<{ weatherData: any }>()
);

export const loadWeatherFailed = createAction(
  '[Weather] Load weather failed',
  props<{ payload: Error }>()
);
