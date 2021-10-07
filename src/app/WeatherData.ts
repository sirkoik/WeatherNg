// This structures the weather data response into a usable format that is type-safe.

import { WeatherCondition } from './WeatherCondition';

export type WeatherData = {
  temperature: number;
  temperatureFeels: number;
  cloudCover: number;
  uvi: number;
  wind: {
    speed: number;
    direction: number;
    gust?: number;
  };
  weatherConditions: WeatherCondition[] | [];
};
