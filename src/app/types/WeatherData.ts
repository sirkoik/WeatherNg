// This structures the weather data response into a usable format that is type-safe.

import { WeatherCondition } from './WeatherCondition';
import { Wind } from './Wind';

export type WeatherData = {
  temperature: number;
  temperatureFeels: number;
  cloudCover: number;
  humidity: number;
  sun: {
    sunrise: number;
    sunset: number;
  };
  uvi: number;
  wind: Wind;
  weatherConditions: WeatherCondition[] | [];
};
