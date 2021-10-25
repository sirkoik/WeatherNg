import { Action, createReducer, on } from '@ngrx/store';
import { WeatherData } from '../types/WeatherData';
import { fetchWeather, loadWeather } from './weather.actions';

export const initialState: WeatherData = {
  temperature: 0,
  temperatureFeels: 0,
  cloudCover: 0,
  humidity: 0,
  sun: {
    sunrise: 0,
    sunset: 0
  },
  uvi: 0,
  wind: {
    speed: 0,
    direction: 0
  },
  weatherConditions: []
};

const _weatherReducer = createReducer(
  initialState,
  on(fetchWeather, state => {
    console.log('[WeatherReducer] fetchWeather');
    return { ...state };
  }),
  on(loadWeather, (state, action) => {
    console.log('[WeatherReducer] loadWeather', action);
    const cur = action.weatherData.current;
    const updatedWeatherData: WeatherData = {
      temperature: cur.temp,
      temperatureFeels: cur.feels_like,
      cloudCover: cur.clouds,
      humidity: cur.humidity,
      sun: {
        sunrise: cur.sunrise * 1000,
        sunset: cur.sunset * 1000
      },
      uvi: cur.uvi,
      wind: {
        speed: cur.wind_speed,
        direction: cur.wind_deg
      },
      weatherConditions: cur.weather
    };

    // This doesn't overwrite the city name if it exists.
    return { ...state, ...updatedWeatherData };
  })
);

export function weatherReducer(state: any, action: Action) {
  return _weatherReducer(state, action);
}
