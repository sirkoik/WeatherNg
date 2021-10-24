// This structures the weather data response into a usable format that is type-safe.

import { Sun } from './Sun';
import { Wind } from './Wind';
import { WeatherCondition } from './WeatherCondition';

export type WeatherData = {
  cityName?: string;
  temperature: number;
  temperatureFeels: number;
  cloudCover: number;
  humidity: number;
  sun: Sun;
  uvi: number;
  wind: Wind;
  weatherConditions: WeatherCondition[] | [];
};
