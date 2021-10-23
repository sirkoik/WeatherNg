import { Action, createReducer, on } from '@ngrx/store';
import { WeatherLocation } from '../types/WeatherLocation';
import {
  getUserLocation,
  locationRetrievalFailure,
  locationRetrievalSuccess
} from './location.actions';

export const initialState: WeatherLocation = {
  locationSuccess: false,
  coords: {
    latitude: 0,
    longitude: 0
  },
  error: null
};

const _locationReducer = createReducer(
  initialState,
  on(getUserLocation, (state, action) => {
    return { ...state };
  }),
  on(locationRetrievalSuccess, (state, action) => {
    console.log(
      '[LocationReducer] location retrieval success.',
      action.payload
    );
    return { ...state, locationSuccess: true, coords: action.payload.coords };
  }),
  on(locationRetrievalFailure, (state, action) => {
    console.log(
      '[LocationReducer] location retrieval failure.',
      action.payload
    );
    return { ...state, locationSuccess: false, error: action.payload };
  })
);

export function locationReducer(state: any, action: Action) {
  return _locationReducer(state, action);
}
